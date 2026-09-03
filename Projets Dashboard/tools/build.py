#!/usr/bin/env python3
"""Valida los proyectos, regenera data/index.json y escribe data/bundle.js.

El bundle permite abrir index.html con doble clic (file://), donde el navegador
bloquea fetch(). Con servidor (tools/servir.py) no hace falta, pero regenerarlo
mantiene las dos vias sincronizadas.

Uso:  python3 tools/build.py
"""
import json
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(RAIZ, "data")
DIR_PROYECTOS = os.path.join(DATA, "proyectos")
RE_FECHA = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def cargar(ruta):
    with open(ruta, encoding="utf-8") as fh:
        return json.load(fh)


def es_fecha(v):
    return isinstance(v, str) and bool(RE_FECHA.match(v))


def validar(proyecto, pipeline, archivo):
    errores, avisos = [], []
    fases = {f["id"]: f for f in pipeline["fases"]}
    requisitos = {r["id"]: f["id"] for f in pipeline["fases"] for r in f.get("requisitos", [])}

    for campo in ("id", "nombre", "estado", "fecha_inicio"):
        if not proyecto.get(campo):
            errores.append(f"falta el campo obligatorio '{campo}'")

    esperado = os.path.splitext(os.path.basename(archivo))[0]
    if proyecto.get("id") and proyecto["id"] != esperado:
        avisos.append(f"el id '{proyecto['id']}' no coincide con el nombre del archivo '{esperado}.json'")

    if proyecto.get("estado") and proyecto["estado"] not in pipeline["estados_proyecto"]:
        errores.append(f"estado de proyecto desconocido: '{proyecto['estado']}'")

    for campo in ("fecha_inicio", "fecha_objetivo", "fecha_fin"):
        v = proyecto.get(campo)
        if v and not es_fecha(v):
            errores.append(f"{campo} no tiene formato AAAA-MM-DD: '{v}'")

    vistos = set()
    for t in proyecto.get("tareas", []):
        tid = t.get("id", "?")
        if tid in vistos:
            errores.append(f"tarea con id repetido: '{tid}'")
        vistos.add(tid)
        if not t.get("titulo"):
            errores.append(f"tarea '{tid}' sin titulo")
        if t.get("fase") not in fases:
            errores.append(f"tarea '{tid}' con fase desconocida: '{t.get('fase')}'")
        if t.get("estado") not in pipeline["estados_tarea"]:
            errores.append(f"tarea '{tid}' con estado desconocido: '{t.get('estado')}'")
        req = t.get("requisito")
        if req:
            if req not in requisitos:
                errores.append(f"tarea '{tid}' apunta a un requisito inexistente: '{req}'")
            elif requisitos[req] != t.get("fase"):
                errores.append(
                    f"tarea '{tid}' esta en la fase '{t.get('fase')}' pero su requisito "
                    f"'{req}' pertenece a '{requisitos[req]}'"
                )
        if t.get("vence") and not es_fecha(t["vence"]):
            errores.append(f"tarea '{tid}' con fecha de vencimiento invalida: '{t['vence']}'")
        if t.get("estado") != "hecha" and not t.get("responsable"):
            avisos.append(f"tarea pendiente '{tid}' sin responsable asignado")

    corridas = {c.get("id") for c in proyecto.get("corridas_frio", [])}
    for c in proyecto.get("corridas_frio", []):
        if not es_fecha(c.get("fecha", "")):
            errores.append(f"corrida '{c.get('id')}' con fecha invalida")
        if c.get("resultado") not in ("ok", "con_incidencias", "fallida"):
            errores.append(f"corrida '{c.get('id')}' con resultado desconocido: '{c.get('resultado')}'")

    for r in proyecto.get("reportes_frio", []):
        if r.get("corrida") and r["corrida"] not in corridas:
            errores.append(f"reporte '{r.get('id')}' referencia una corrida inexistente: '{r['corrida']}'")
        for h in r.get("hallazgos", []):
            if h.get("severidad") not in pipeline["severidades"]:
                errores.append(f"hallazgo '{h.get('id')}' con severidad desconocida: '{h.get('severidad')}'")
            if h.get("estado") != "cerrado" and not h.get("mejora_propuesta"):
                avisos.append(f"hallazgo abierto '{h.get('id')}' sin mejora propuesta")
            if h.get("tarea") and h["tarea"] not in vistos:
                errores.append(f"hallazgo '{h.get('id')}' apunta a una tarea inexistente: '{h['tarea']}'")

    for c in corridas:
        if not any(r.get("corrida") == c for r in proyecto.get("reportes_frio", [])):
            avisos.append(f"la corrida en frio '{c}' todavia no tiene reporte")

    for b in proyecto.get("bitacora", []):
        if not es_fecha(b.get("fecha", "")):
            errores.append(f"entrada de bitacora con fecha invalida: '{b.get('fecha')}'")
        if b.get("fase") and b["fase"] not in fases:
            errores.append(f"entrada de bitacora {b.get('fecha')} con fase desconocida: '{b['fase']}'")
        if not b.get("elaborado"):
            avisos.append(f"entrada de bitacora {b.get('fecha')} sin nada en 'elaborado'")

    return errores, avisos


def main():
    pipeline = cargar(os.path.join(DATA, "pipeline.json"))

    archivos = sorted(
        os.path.join(DIR_PROYECTOS, n)
        for n in os.listdir(DIR_PROYECTOS)
        if n.endswith(".json")
    )
    if not archivos:
        print("No hay proyectos en data/proyectos/.")
        return 1

    proyectos, fallos = [], 0
    for ruta in archivos:
        nombre = os.path.basename(ruta)
        try:
            p = cargar(ruta)
        except json.JSONDecodeError as e:
            print(f"[ERROR] {nombre}: JSON invalido ({e})")
            fallos += 1
            continue
        errores, avisos = validar(p, pipeline, ruta)
        for e in errores:
            print(f"[ERROR] {nombre}: {e}")
        for a in avisos:
            print(f"[aviso] {nombre}: {a}")
        if errores:
            fallos += 1
        else:
            proyectos.append((nombre, p))

    if fallos:
        print(f"\n{fallos} proyecto(s) con errores. No se ha regenerado el bundle.")
        return 1

    ruta_indice = os.path.join(DATA, "index.json")
    indice = cargar(ruta_indice) if os.path.exists(ruta_indice) else {}
    indice.setdefault("nombre", "Projets Dashboard")
    indice.setdefault("descripcion", "Panel de control de todos los proyectos.")
    indice["proyectos"] = [f"proyectos/{n}" for n, _ in proyectos]
    with open(ruta_indice, "w", encoding="utf-8") as fh:
        json.dump(indice, fh, ensure_ascii=False, indent=2)
        fh.write("\n")

    bundle = {
        "indice": indice,
        "pipeline": pipeline,
        "proyectos": [p for _, p in proyectos],
    }
    with open(os.path.join(DATA, "bundle.js"), "w", encoding="utf-8") as fh:
        fh.write("/* Generado por tools/build.py. No editar a mano. */\n")
        fh.write("window.PD_DATA = ")
        json.dump(bundle, fh, ensure_ascii=False, indent=1)
        fh.write(";\n")

    print(f"\nOK: {len(proyectos)} proyecto(s) validados. index.json y bundle.js regenerados.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
