# Cómo se opera este dashboard

Acuerdo de trabajo: **tú me cuentas lo que pasa en los proyectos y yo mantengo el dashboard.**
Tú no editas JSON a mano si no quieres; sólo hablas.

---

## Qué me tienes que decir

Cualquiera de estas frases basta. No hace falta formato:

| Lo que dices | Lo que hago |
|---|---|
| «Se abrió X» — una tarea, un frente, un pendiente nuevo | Creo la tarea en la fase que le toca, con prioridad y responsable |
| «Se movió X» / «ya quedó X» | Cambio el estado de la tarea y lo apunto en la bitácora del día |
| «X está atorado / no se cierra» | Lo marco **bloqueado**, con el motivo, y sale en «Necesita atención» |
| «Hoy trabajamos en X» | Añado el día a la bitácora con lo que se elaboró |
| «Corrimos la prueba de X» | Registro la corrida en frío con su resultado, métricas e incidencias |
| «Salió este problema» | Lo registro como hallazgo, con severidad y mejora propuesta |
| «Ya publicamos la landing / cerramos la primera venta» | Actualizo el resultado final del proyecto |
| «Coloca este proyecto en el dashboard» | Leo el repositorio (código, historial y documentos), lo monto entero y te digo qué falta |

Si el proyecto tiene repositorio, no hace falta que me dictes los días trabajados: los saco
del historial de git.

## Qué hago yo en cada cambio

1. Edito el JSON del proyecto en `data/proyectos/`.
2. Corro `python3 tools/build.py` (valida y detecta incoherencias).
3. Republico el enlace privado, que es el mismo siempre.
4. Hago commit y push a la rama del repositorio.
5. Te digo en una línea qué cambió y qué quedó pendiente de tu parte.

## Reglas que sigo con los datos

- **No invento.** Si algo no está escrito en el repositorio, en un documento o en lo que me
  dices, el requisito se queda como **sin planificar** (en ámbar) en lugar de darse por hecho.
- Lo que deduzco del código o de los documentos lo dejo anotado en el campo `notas` de la
  tarea, para que se pueda contrastar.
- Las horas sacadas de git son una **estimación** por número de commits, y así lo dice cada
  entrada de la bitácora. Si me das las horas reales, las sustituyo.
- Un proyecto no está terminado hasta que la landing está publicada, el genoma de marketing
  está hecho, el producto está publicado y hay una primera venta cobrada.

---

## Cómo lo veo

### En el teléfono

Con el **enlace privado** del panel: se abre en el navegador del teléfono, no hay que instalar
nada y sólo lo ve quien tiene el enlace. Yo lo republico en la misma dirección cada vez que
cambia algo; tú refrescas.

### En tu máquina

```bash
cd "Projets Dashboard"
python3 tools/build.py      # valida los datos y regenera el índice
python3 tools/servir.py     # abre http://localhost:8000
```

Y si quieres verlo en el teléfono **sin internet**, con el teléfono en el mismo wifi que la
máquina: `python3 tools/servir.py` y desde el teléfono entra a `http://IP-DE-TU-MAQUINA:8000`
(la IP la ves con `ip addr` en Linux o `ipconfig` en Windows).

También puedes abrir `index.html` con doble clic: usa `data/bundle.js`, que regenera `build.py`.

### Un solo archivo para mandar por correo

```bash
python3 tools/preview_html.py panel.html
```

Genera un HTML autocontenido con todo dentro: estilos, código y datos.

---

## Qué necesito de ti para que los números salgan bien

- **Fechas objetivo.** Sin fecha objetivo no puedo calcular desvío ni decir si vas tarde.
- **Estimación de días** al empezar cada proyecto, y sus revisiones cuando cambien.
- **Aviso de los días que se trabajó fuera de git** (reuniones, obra, diseño, comercial):
  esos días no aparecen en el historial y sin ellos la cadencia sale más baja de lo real.
