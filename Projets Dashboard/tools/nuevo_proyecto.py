#!/usr/bin/env python3
"""Crea un proyecto nuevo a partir de la plantilla, con todas las tareas del
modelo canonico ya generadas (una por requisito) para no olvidar nada.

Uso:
  python3 tools/nuevo_proyecto.py "Terra Nodo" --ticker TRR --inicio 2026-09-10 \
      --objetivo 2026-12-20 --responsable "E. Palomares" [--vacio]

  --vacio  crea el proyecto sin generar las tareas del modelo.
"""
import argparse
import json
import os
import re
import sys
import unicodedata
from datetime import date

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(RAIZ, "data")


def id_desde(nombre):
    s = unicodedata.normalize("NFKD", nombre).encode("ascii", "ignore").decode()
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s or "proyecto"


def main():
    ap = argparse.ArgumentParser(description="Crea un proyecto nuevo en data/proyectos/")
    ap.add_argument("nombre")
    ap.add_argument("--id", default=None)
    ap.add_argument("--ticker", default="")
    ap.add_argument("--descripcion", default="")
    ap.add_argument("--responsable", default="")
    ap.add_argument("--inicio", default=date.today().isoformat())
    ap.add_argument("--objetivo", default="")
    ap.add_argument("--estimacion", type=int, default=45, help="dias de trabajo estimados")
    ap.add_argument("--vacio", action="store_true", help="no generar las tareas del modelo")
    args = ap.parse_args()

    with open(os.path.join(DATA, "pipeline.json"), encoding="utf-8") as fh:
        pipeline = json.load(fh)

    pid = args.id or id_desde(args.nombre)
    destino = os.path.join(DATA, "proyectos", f"{pid}.json")
    if os.path.exists(destino):
        print(f"Ya existe {destino}. Elige otro --id.")
        return 1

    tareas = []
    if not args.vacio:
        n = 0
        for fase in pipeline["fases"]:
            for req in fase.get("requisitos", []):
                n += 1
                tareas.append({
                    "id": f"t-{n:03d}",
                    "titulo": req["nombre"],
                    "fase": fase["id"],
                    "requisito": req["id"],
                    "estado": "pendiente",
                    "prioridad": "media",
                    "responsable": args.responsable,
                    "estimacion_dias": 1,
                    "vence": "",
                    "notas": req["detalle"],
                })

    proyecto = {
        "id": pid,
        "nombre": args.nombre,
        "ticker": args.ticker,
        "descripcion": args.descripcion,
        "estado": "planificado",
        "responsable": args.responsable,
        "equipo": [args.responsable] if args.responsable else [],
        "repositorio": "",
        "fecha_inicio": args.inicio,
        "fecha_objetivo": args.objetivo or None,
        "fecha_fin": None,
        "estimacion_inicial_dias": args.estimacion,
        "estimaciones": [
            {"fecha": args.inicio, "dias_restantes": args.estimacion, "nota": "Estimacion inicial."}
        ],
        "parametros_moneda": {
            "emision_total": "", "block_target_segundos": 0, "block_reward": "",
            "prefijo_direcciones": "", "puerto_p2p": 0, "puerto_rpc": 0,
        },
        "tareas": tareas,
        "corridas_frio": [],
        "reportes_frio": [],
        "bitacora": [],
        "riesgos": [],
        "resultado_final": {
            "landing_page": {"estado": "pendiente", "url": "", "fecha": None, "notas": ""},
            "genoma_marketing": {"estado": "pendiente", "url": "", "fecha": None, "notas": ""},
            "publicacion": {"estado": "pendiente", "url": "", "fecha": None, "notas": ""},
            "venta": {"estado": "pendiente", "fecha_primera_venta": None, "unidades_vendidas": 0,
                      "ingresos": 0, "moneda": "USD", "notas": ""},
        },
    }

    with open(destino, "w", encoding="utf-8") as fh:
        json.dump(proyecto, fh, ensure_ascii=False, indent=2)
        fh.write("\n")

    print(f"Creado {destino} con {len(tareas)} tarea(s).")
    print("Ahora ejecuta: python3 tools/build.py")
    return 0


if __name__ == "__main__":
    sys.exit(main())
