#!/usr/bin/env python3
"""Empaqueta todo el panel (estilos, codigo y datos) en un unico archivo HTML
que se puede enviar por correo o subir a cualquier sitio.

Uso:
  python3 tools/preview_html.py                      -> panel.html
  python3 tools/preview_html.py salida.html
  python3 tools/preview_html.py salida.html --fragmento   (sin <html>/<head>/<body>)
"""
import json
import os
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FUENTES = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
    'family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap">'
)

CUERPO = """<div class="app">
  <aside class="lateral">
    <div class="marca">
      <strong id="marca-nombre">Projets Dashboard</strong>
      <span id="marca-desc">Panel de control de proyectos</span>
    </div>
    <div class="lista-proyectos" id="lista-proyectos"></div>
    <div class="pie-lateral">
      <button id="btn-imprimir">Imprimir / PDF</button>
      Los datos viven en <code>data/proyectos/*.json</code>.
    </div>
  </aside>
  <main class="contenido" id="contenido"><p class="vacio">Cargando…</p></main>
</div>"""


def leer(*partes):
    with open(os.path.join(RAIZ, *partes), encoding="utf-8") as fh:
        return fh.read()


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    fragmento = "--fragmento" in sys.argv
    destino = args[0] if args else os.path.join(RAIZ, "panel.html")

    with open(os.path.join(RAIZ, "data", "index.json"), encoding="utf-8") as fh:
        indice = json.load(fh)
    with open(os.path.join(RAIZ, "data", "pipeline.json"), encoding="utf-8") as fh:
        pipeline = json.load(fh)
    proyectos = []
    dirp = os.path.join(RAIZ, "data", "proyectos")
    for nombre in sorted(os.listdir(dirp)):
        if nombre.endswith(".json"):
            with open(os.path.join(dirp, nombre), encoding="utf-8") as fh:
                proyectos.append(json.load(fh))

    datos = json.dumps(
        {"indice": indice, "pipeline": pipeline, "proyectos": proyectos},
        ensure_ascii=False,
    ).replace("</", "<\\/")

    partes = [
        "<title>Projets Dashboard</title>",
        FUENTES,
        "<style>\n" + leer("assets", "styles.css") + "\n</style>",
        CUERPO,
        "<script>\n" + leer("assets", "metricas.js") + "\n</script>",
        "<script>window.PD_DATA = " + datos + ";</script>",
        # el panel empaquetado siempre lee de PD_DATA, nunca por fetch
        "<script>\n" + leer("assets", "app.js").replace(
            "if (window.location.protocol === 'file:' && window.PD_DATA) {",
            "if (window.PD_DATA) {",
        ) + "\n</script>",
    ]
    cuerpo = "\n\n".join(partes)

    if fragmento:
        salida = cuerpo + "\n"
    else:
        salida = ('<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n'
                  '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
                  + cuerpo + "\n</head>\n<body>\n</body>\n</html>\n")
        # el navegador mueve el contenido al body igualmente; mas limpio partirlo:
        cabecera, resto = cuerpo.split(CUERPO, 1)
        salida = ('<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n'
                  '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
                  + cabecera + "</head>\n<body>\n" + CUERPO + resto + "\n</body>\n</html>\n")

    with open(destino, "w", encoding="utf-8") as fh:
        fh.write(salida)
    print(f"Escrito {destino} ({os.path.getsize(destino) // 1024} KB, "
          f"{len(proyectos)} proyecto(s)) — un solo archivo, se abre con doble clic.")


if __name__ == "__main__":
    main()
