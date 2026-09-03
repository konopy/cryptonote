# Projets Dashboard

Panel de control de **todos los proyectos** de la plataforma: eliges un proyecto y te dice
qué está pendiente, qué le falta para estar completo, qué necesita atención (corridas y
reportes de frío), cuántos días se ha trabajado, cuántos faltan, cuánto ha durado la
elaboración y en qué punto está el resultado final (landing page, genoma de marketing,
publicación y venta).

No tiene dependencias: es HTML + CSS + JavaScript plano, con los datos en archivos JSON.
No necesita npm, ni base de datos, ni servidor externo.

---

## Arrancar

```bash
# 1. validar los datos y regenerar el índice y el bundle
python3 "Projets Dashboard/tools/build.py"

# 2. abrir el panel
python3 "Projets Dashboard/tools/servir.py"     # http://localhost:8000
```

También puedes abrir `index.html` con doble clic: en ese caso el panel lee
`data/bundle.js` (que genera `build.py`) porque el navegador bloquea `fetch()` sobre
`file://`. Si cambias un JSON, vuelve a ejecutar `build.py`.

Informe en la terminal (mismos cálculos que la web, requiere Node):

```bash
node "Projets Dashboard/tools/reporte.js"              # resumen de la cartera
node "Projets Dashboard/tools/reporte.js" konopy-coin  # informe completo de un proyecto
```

---

## Qué muestra cada proyecto

| # | Sección | Qué responde |
|---|---------|--------------|
| 1 | **Todo lo que está pendiente** | Tareas abiertas ordenadas por urgencia: primero vencidas y bloqueadas, luego por prioridad y fecha. Filtrable por fase y prioridad. |
| 2 | **Todo lo que falta para estar completo** | Compara el proyecto contra el modelo canónico de 9 fases y 39 requisitos. Marca cada requisito como *hecho*, *en curso* o **sin planificar** (no existe ninguna tarea que lo cubra). |
| 3 | **Lo que necesita atención** | Corridas en frío con sus métricas e incidencias, reportes de frío, hallazgos abiertos con la **mejora propuesta para la plataforma**, corridas sin reporte, tareas bloqueadas o vencidas y riesgos abiertos. |
| 4 | **Seguimiento interno** | Días trabajados frente a días de calendario, cadencia, días perdidos al arrancar, pausas de una semana o más durante la elaboración, estimación inicial, estimación vigente y **días que faltan según el ritmo real**, con la fecha de fin proyectada y el desvío frente al objetivo. |
| 5 | **Días y lo elaborado** | Bitácora día a día: fecha, horas, personas, fase y qué se produjo. Las pausas aparecen marcadas en la línea de tiempo. |
| 6 | **Cuánto ha durado** | Duración en calendario, días efectivos, horas y horas-persona, con desglose por fase. |
| 7 | **Resultado final** | Los cuatro hitos de cierre: landing page de producto, genoma de marketing, publicación y venta, con lo que falta en cada uno y las ventas registradas. |

La vista inicial (**Resumen de cartera**) compara todos los proyectos en una tabla y lista
lo más urgente de toda la cartera.

---

## El modelo de "proyecto completo"

Está en `data/pipeline.json` y es la definición compartida de qué significa terminar un
proyecto. Nueve fases, con peso y requisitos:

1. **Definición y alcance** — ficha, parámetros de la moneda, alcance, calendario.
2. **Desarrollo y parametrización** — fork, `CryptoNoteConfig.h`, génesis, compilación, semillas.
3. **Corridas en frío** — plan, arranque, minado, transacciones, carga.
4. **Reportes de frío y estabilización** — un reporte por corrida, hallazgos cerrados, mejoras aplicadas, versión congelada.
5. **Infraestructura pública** — seed nodes, explorador, pool, binarios.
6. **Landing page de producto** — identidad, copy, publicación, analítica.
7. **Genoma de marketing** — posicionamiento, audiencias, mensajes, canales, métricas.
8. **Publicación y lanzamiento** — anuncio, listados, red viva, soporte.
9. **Comercialización y venta** — oferta, cobro, primera venta, seguimiento.

Edita este archivo si tu proceso cambia: el panel se recalcula solo y todos los proyectos
se miden contra el mismo criterio.

---

## Añadir un proyecto

```bash
cd "Projets Dashboard"
python3 tools/nuevo_proyecto.py "Terra Nodo" --ticker TRR \
    --inicio 2026-09-10 --objetivo 2026-12-20 --responsable "E. Palomares"
python3 tools/build.py
```

Crea `data/proyectos/terra-nodo.json` con **una tarea por cada requisito** del modelo, para
que nada se quede sin planificar. Con `--vacio` lo crea sin tareas.

Después se edita el JSON a mano: es la fuente de la verdad. La plantilla comentada está en
`plantillas/proyecto.plantilla.json` y el esquema en `schema/proyecto.schema.json`.

### Rellenar la bitácora desde git

Si el trabajo del proyecto está en un repositorio, los días trabajados se pueden sacar del
historial en lugar de escribirlos a mano:

```bash
python3 tools/bitacora_git.py --repo /ruta/al/repo --desde 2026-06-01   # vista previa
python3 tools/bitacora_git.py --repo /ruta/al/repo --desde 2026-06-01 \
    --proyecto konopy-coin --fase desarrollo --aplicar
```

No duplica días ya registrados y estima las horas por número de commits (o usa `--horas N`).

---

## Estructura de datos

Cada proyecto es un JSON en `data/proyectos/`:

```jsonc
{
  "id": "konopy-coin",
  "nombre": "Konopy Coin", "ticker": "KNP",
  "estado": "en_pruebas",              // planificado | en_desarrollo | en_pruebas |
                                       // en_lanzamiento | en_venta | terminado | pausado
  "fecha_inicio": "2026-06-01",
  "fecha_objetivo": "2026-10-15",
  "fecha_fin": null,                   // se rellena al cerrar el proyecto
  "estimacion_inicial_dias": 55,
  "estimaciones": [                    // revisiones de "cuántos días faltan"
    { "fecha": "2026-07-06", "dias_restantes": 40, "nota": "..." }
  ],
  "tareas": [
    { "id": "t-011", "titulo": "...", "fase": "desarrollo",
      "requisito": "desarrollo.config",          // enlaza con data/pipeline.json
      "estado": "hecha",                          // pendiente | en_progreso | bloqueada | hecha
      "prioridad": "alta", "responsable": "Dev 2",
      "estimacion_dias": 3, "vence": "2026-06-18", "notas": "" }
  ],
  "corridas_frio": [
    { "id": "cf-02", "fecha": "2026-08-03", "tipo": "minado",
      "objetivo": "...", "duracion_horas": 12,
      "resultado": "con_incidencias",             // ok | con_incidencias | fallida
      "nodos": 4, "bloques": 361,
      "metricas": { "tiempo_bloque_promedio_s": 143, "reorgs": 2 },
      "incidencias": ["..."], "notas": "" }
  ],
  "reportes_frio": [
    { "id": "rf-02", "fecha": "2026-08-04", "corrida": "cf-02", "autor": "Dev 2",
      "conclusion": "...",
      "hallazgos": [
        { "id": "h-02", "titulo": "...",
          "severidad": "alta",                    // critica | alta | media | baja
          "impacto": "...",
          "mejora_propuesta": "qué cambio mejora la plataforma",
          "estado": "en_progreso",                // abierto | en_progreso | cerrado
          "tarea": "t-031" }
      ] }
  ],
  "bitacora": [
    { "fecha": "2026-08-03", "horas": 10, "personas": 2, "fase": "corridas_frio",
      "elaborado": ["Corrida cf-02 de minado de 12 horas"], "notas": "" }
  ],
  "riesgos": [ { "id": "r-01", "titulo": "...", "probabilidad": "media",
                 "impacto": "alto", "mitigacion": "...", "estado": "abierto" } ],
  "resultado_final": {
    "landing_page":     { "estado": "en_progreso", "url": "", "fecha": null, "notas": "" },
    "genoma_marketing": { "estado": "pendiente",   "url": "", "fecha": null, "notas": "" },
    "publicacion":      { "estado": "pendiente",   "url": "", "fecha": null, "notas": "" },
    "venta": { "estado": "pendiente", "fecha_primera_venta": null,
               "unidades_vendidas": 0, "ingresos": 0, "moneda": "USD", "notas": "" }
  }
}
```

`build.py` avisa de errores (fase inexistente, requisito de otra fase, reporte que
referencia una corrida que no existe, fechas mal escritas, ids repetidos) y de descuidos
(tarea pendiente sin responsable, corrida sin reporte, hallazgo abierto sin mejora
propuesta).

---

## Cómo se calculan los números

Todo el cálculo está en `assets/metricas.js`, y tanto la web como el informe de terminal
usan el mismo código.

- **Unidad de avance**: cada requisito del modelo, más cada tarea que no esté enlazada a un
  requisito. Un requisito está *hecho* cuando tiene al menos una tarea y todas están hechas;
  *sin planificar* cuando no tiene ninguna tarea.
- **Avance de una fase**: unidades hechas / unidades totales de esa fase.
- **Avance global**: media de las fases ponderada por el `peso` de cada una.
- **Días trabajados**: días distintos con entrada en la bitácora.
- **Cadencia**: días trabajados / días de calendario transcurridos.
- **Arranque en blanco**: días entre la fecha de inicio y el primer día real de trabajo.
- **Pausas**: huecos de 7 días o más entre días trabajados consecutivos.
- **Ritmo**: requisitos cerrados por día trabajado.
- **Días que faltan**: unidades pendientes / ritmo → días de trabajo; dividido por la
  cadencia → días de calendario; sumados a hoy → **fecha de fin proyectada**, que se compara
  con la fecha objetivo para dar el desvío.

La proyección es aritmética sobre el ritmo observado: si un proyecto lleva pocos días
registrados, sale muy pesimista. Es la señal, no una promesa; la estimación del equipo se
muestra al lado para contrastar.

---

## Datos de ejemplo

Los tres proyectos que vienen (`konopy-coin`, `auros-pay`, `terra-nodo`) son datos de
muestra para que el panel se vea lleno y se entienda cada sección: uno a mitad de camino
con un hallazgo crítico abierto, uno casi cerrado bloqueado en la venta y uno recién
arrancado. **Sustitúyelos por los proyectos reales** (o bórralos y crea los tuyos con
`nuevo_proyecto.py`) antes de usar el panel en serio.

---

## Estructura del directorio

```
Projets Dashboard/
├── index.html                      panel
├── assets/
│   ├── metricas.js                 motor de cálculo (web y terminal)
│   ├── app.js                      interfaz
│   └── styles.css                  estilos (tema claro y oscuro)
├── data/
│   ├── pipeline.json               modelo canónico de proyecto completo
│   ├── index.json                  lista de proyectos (la regenera build.py)
│   ├── bundle.js                   datos empaquetados para abrir sin servidor
│   └── proyectos/*.json            un archivo por proyecto
├── plantillas/proyecto.plantilla.json
├── schema/proyecto.schema.json
└── tools/
    ├── build.py                    valida + regenera index.json y bundle.js
    ├── nuevo_proyecto.py           crea un proyecto con todas sus tareas
    ├── bitacora_git.py             bitácora desde el historial de git
    ├── reporte.js                  informe en terminal (Node)
    └── servir.py                   servidor local
```
