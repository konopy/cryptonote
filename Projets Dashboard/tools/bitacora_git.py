#!/usr/bin/env python3
"""Genera entradas de bitacora a partir del historial de git: que dias se
trabajo de verdad y que se elaboro cada dia (los mensajes de commit).

Ejemplos:
  # ver que saldria, sin tocar nada
  python3 tools/bitacora_git.py --repo .. --desde 2026-06-01

  # anadirlo al proyecto konopy-coin (no duplica dias ya registrados)
  python3 tools/bitacora_git.py --repo .. --desde 2026-06-01 \
      --proyecto konopy-coin --fase desarrollo --aplicar
"""
import argparse
import json
import os
import subprocess
import sys
from collections import OrderedDict

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(RAIZ, "data")


def log_git(repo, desde, hasta, autor):
    cmd = ["git", "-C", repo, "log", "--date=short", "--pretty=format:%ad\x1f%an\x1f%s"]
    if desde:
        cmd.append(f"--since={desde}")
    if hasta:
        cmd.append(f"--until={hasta}")
    if autor:
        cmd.append(f"--author={autor}")
    salida = subprocess.run(cmd, capture_output=True, text=True, check=True).stdout
    return [l.split("\x1f") for l in salida.splitlines() if l.strip()]


def main():
    ap = argparse.ArgumentParser(description="Bitacora a partir del historial de git")
    ap.add_argument("--repo", default=os.path.dirname(RAIZ), help="ruta del repositorio git")
    ap.add_argument("--desde", default="")
    ap.add_argument("--hasta", default="")
    ap.add_argument("--autor", default="")
    ap.add_argument("--fase", default="desarrollo", help="fase a la que se imputan los dias")
    ap.add_argument("--horas", type=float, default=0, help="horas fijas por dia (0 = estimar por numero de commits)")
    ap.add_argument("--proyecto", default="", help="id del proyecto al que anadir la bitacora")
    ap.add_argument("--aplicar", action="store_true", help="escribir en el JSON del proyecto")
    args = ap.parse_args()

    filas = log_git(args.repo, args.desde, args.hasta, args.autor)
    if not filas:
        print("El historial de git no devolvio commits con esos filtros.")
        return 1

    dias = OrderedDict()
    for fecha, autor, asunto in filas:
        d = dias.setdefault(fecha, {"autores": set(), "asuntos": []})
        d["autores"].add(autor)
        d["asuntos"].append(asunto)

    entradas = []
    for fecha in sorted(dias):
        d = dias[fecha]
        horas = args.horas if args.horas else round(min(8.0, 1.5 * len(d["asuntos"])), 1)
        entradas.append({
            "fecha": fecha,
            "horas": horas,
            "personas": len(d["autores"]),
            "fase": args.fase,
            "elaborado": d["asuntos"][:12],
            "notas": "Generado desde el historial de git" + ("" if args.horas else "; horas estimadas."),
        })

    if not args.proyecto:
        print(json.dumps(entradas, ensure_ascii=False, indent=2))
        print(f"\n{len(entradas)} dia(s) de trabajo detectados. "
              f"Usa --proyecto <id> --aplicar para anadirlos.", file=sys.stderr)
        return 0

    ruta = os.path.join(DATA, "proyectos", f"{args.proyecto}.json")
    if not os.path.exists(ruta):
        print(f"No existe {ruta}")
        return 1
    with open(ruta, encoding="utf-8") as fh:
        proyecto = json.load(fh)

    existentes = {b.get("fecha") for b in proyecto.get("bitacora", [])}
    nuevas = [e for e in entradas if e["fecha"] not in existentes]

    if not args.aplicar:
        print(json.dumps(nuevas, ensure_ascii=False, indent=2))
        print(f"\n{len(nuevas)} dia(s) nuevos para '{args.proyecto}' "
              f"({len(entradas) - len(nuevas)} ya registrados). Anade --aplicar para escribirlos.",
              file=sys.stderr)
        return 0

    proyecto.setdefault("bitacora", []).extend(nuevas)
    proyecto["bitacora"].sort(key=lambda b: b.get("fecha", ""))
    with open(ruta, "w", encoding="utf-8") as fh:
        json.dump(proyecto, fh, ensure_ascii=False, indent=2)
        fh.write("\n")
    print(f"Anadidos {len(nuevas)} dia(s) a {ruta}. Ejecuta ahora: python3 tools/build.py")
    return 0


if __name__ == "__main__":
    sys.exit(main())
