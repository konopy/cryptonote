/* Generado por tools/build.py. No editar a mano. */
window.PD_DATA = {
 "indice": {
  "nombre": "Projets Dashboard",
  "descripcion": "Panel de control de todos los proyectos de la plataforma CryptoNote.",
  "proyectos": [
   "proyectos/auros-pay.json",
   "proyectos/konopy-coin.json",
   "proyectos/terra-nodo.json"
  ]
 },
 "pipeline": {
  "version": 1,
  "descripcion": "Modelo canónico de un proyecto completo: desde la definición hasta la venta. Cada fase tiene requisitos obligatorios; el dashboard compara cada proyecto contra este modelo para decir exactamente qué falta.",
  "fases": [
   {
    "id": "definicion",
    "nombre": "Definición y alcance",
    "peso": 1,
    "descripcion": "Qué moneda/producto se va a construir, con qué parámetros y para quién.",
    "requisitos": [
     {
      "id": "definicion.ficha",
      "nombre": "Ficha del proyecto",
      "detalle": "Nombre, ticker, símbolo, propósito y público objetivo definidos por escrito."
     },
     {
      "id": "definicion.parametros",
      "nombre": "Parámetros de la moneda",
      "detalle": "Emisión total, block reward, block target, dificultad, prefijo de direcciones, puertos P2P/RPC."
     },
     {
      "id": "definicion.alcance",
      "nombre": "Alcance y entregables",
      "detalle": "Lista cerrada de entregables y de lo que queda fuera del alcance."
     },
     {
      "id": "definicion.calendario",
      "nombre": "Calendario y estimación inicial",
      "detalle": "Fecha de inicio, fecha objetivo y estimación de días de trabajo."
     }
    ]
   },
   {
    "id": "desarrollo",
    "nombre": "Desarrollo y parametrización",
    "peso": 3,
    "descripcion": "Fork del core, configuración de CryptoNoteConfig, génesis y compilación reproducible.",
    "requisitos": [
     {
      "id": "desarrollo.fork",
      "nombre": "Fork del core creado",
      "detalle": "Repositorio propio del proyecto, con historial y remoto configurado."
     },
     {
      "id": "desarrollo.config",
      "nombre": "CryptoNoteConfig ajustado",
      "detalle": "src/CryptoNoteConfig.h con los parámetros de la ficha aplicados."
     },
     {
      "id": "desarrollo.genesis",
      "nombre": "Bloque génesis generado",
      "detalle": "Génesis tx hex generado, fijado en el config y verificado."
     },
     {
      "id": "desarrollo.compilacion",
      "nombre": "Compilación en las plataformas objetivo",
      "detalle": "Daemon, simplewallet y walletd compilan sin errores en las plataformas objetivo."
     },
     {
      "id": "desarrollo.checkpoints",
      "nombre": "Semillas y checkpoints",
      "detalle": "Seed nodes y checkpoints iniciales definidos en el código."
     }
    ]
   },
   {
    "id": "corridas_frio",
    "nombre": "Corridas en frío",
    "peso": 2,
    "descripcion": "Arranques de red controlados en entorno aislado, antes de exponer nada al público.",
    "requisitos": [
     {
      "id": "corridas_frio.plan",
      "nombre": "Plan de corridas en frío",
      "detalle": "Escenarios a probar, criterios de éxito y datos a medir en cada corrida."
     },
     {
      "id": "corridas_frio.arranque",
      "nombre": "Corrida de arranque de red",
      "detalle": "Red levantada desde el bloque 0 con varios nodos y sincronización correcta."
     },
     {
      "id": "corridas_frio.minado",
      "nombre": "Corrida de minado y dificultad",
      "detalle": "Minado sostenido, ajuste de dificultad y emisión verificados contra lo definido."
     },
     {
      "id": "corridas_frio.transacciones",
      "nombre": "Corrida de transacciones y wallets",
      "detalle": "Envíos, recepciones, mixin, reorgs y recuperación de wallets probados."
     },
     {
      "id": "corridas_frio.carga",
      "nombre": "Corrida de carga y resistencia",
      "detalle": "Comportamiento bajo volumen alto de transacciones y con nodos cayendo."
     }
    ]
   },
   {
    "id": "estabilizacion",
    "nombre": "Reportes de frío y estabilización",
    "peso": 2,
    "descripcion": "Cada corrida deja un reporte con hallazgos; los hallazgos se cierran y la plataforma mejora.",
    "requisitos": [
     {
      "id": "estabilizacion.reportes",
      "nombre": "Reporte por cada corrida",
      "detalle": "Un reporte de frío escrito por corrida, con hallazgos, severidad y mejora propuesta."
     },
     {
      "id": "estabilizacion.hallazgos",
      "nombre": "Hallazgos críticos cerrados",
      "detalle": "Ningún hallazgo de severidad crítica o alta queda abierto."
     },
     {
      "id": "estabilizacion.mejoras",
      "nombre": "Mejoras aplicadas a la plataforma",
      "detalle": "Las mejoras aceptadas están implementadas y re-probadas en una corrida posterior."
     },
     {
      "id": "estabilizacion.congelado",
      "nombre": "Versión congelada para lanzamiento",
      "detalle": "Tag/release candidato con binarios reproducibles y notas de versión."
     }
    ]
   },
   {
    "id": "infraestructura",
    "nombre": "Infraestructura pública",
    "peso": 2,
    "descripcion": "Lo que tiene que estar en línea para que la moneda exista de cara al público.",
    "requisitos": [
     {
      "id": "infraestructura.nodos",
      "nombre": "Nodos semilla en producción",
      "detalle": "Al menos dos seed nodes estables, monitorizados y con respaldo."
     },
     {
      "id": "infraestructura.explorador",
      "nombre": "Explorador de bloques",
      "detalle": "Block explorer público funcionando contra la red real."
     },
     {
      "id": "infraestructura.pool",
      "nombre": "Pool de minado",
      "detalle": "Pool operativo y documentado para mineros externos."
     },
     {
      "id": "infraestructura.binarios",
      "nombre": "Binarios y guías de instalación",
      "detalle": "Releases descargables y guía de instalación/uso publicada."
     }
    ]
   },
   {
    "id": "landing",
    "nombre": "Landing page de producto",
    "peso": 1,
    "descripcion": "La página de producto que convierte visitantes en usuarios y compradores.",
    "requisitos": [
     {
      "id": "landing.identidad",
      "nombre": "Identidad visual",
      "detalle": "Logo, paleta, tipografía y assets del proyecto."
     },
     {
      "id": "landing.copy",
      "nombre": "Copy y propuesta de valor",
      "detalle": "Titular, propuesta de valor, beneficios, prueba social y llamada a la acción."
     },
     {
      "id": "landing.publicada",
      "nombre": "Landing publicada",
      "detalle": "Dominio, hosting, HTTPS y página en línea."
     },
     {
      "id": "landing.analitica",
      "nombre": "Analítica y captación",
      "detalle": "Medición de visitas/conversión y captura de correos operativas."
     }
    ]
   },
   {
    "id": "genoma_marketing",
    "nombre": "Genoma de marketing",
    "peso": 2,
    "descripcion": "El ADN comercial del producto: quién es, a quién le habla, con qué mensajes y por qué canales.",
    "requisitos": [
     {
      "id": "genoma.posicionamiento",
      "nombre": "Posicionamiento y diferenciador",
      "detalle": "Categoría, competidores y por qué este proyecto es distinto."
     },
     {
      "id": "genoma.audiencia",
      "nombre": "Audiencias y buyer persona",
      "detalle": "Segmentos, dolores, objeciones y disparadores de compra."
     },
     {
      "id": "genoma.mensajes",
      "nombre": "Matriz de mensajes",
      "detalle": "Mensaje maestro y variantes por segmento y por canal."
     },
     {
      "id": "genoma.canales",
      "nombre": "Canales y calendario",
      "detalle": "Canales priorizados, calendario de contenidos y presupuesto."
     },
     {
      "id": "genoma.metricas",
      "nombre": "Métricas y objetivos",
      "detalle": "KPIs, meta por canal y forma de medirlos."
     }
    ]
   },
   {
    "id": "publicacion",
    "nombre": "Publicación y lanzamiento",
    "peso": 2,
    "descripcion": "Salida pública de la moneda y del producto.",
    "requisitos": [
     {
      "id": "publicacion.anuncio",
      "nombre": "Anuncio de lanzamiento",
      "detalle": "Hilo de anuncio, nota de prensa y publicaciones en redes y foros."
     },
     {
      "id": "publicacion.listados",
      "nombre": "Listados y directorios",
      "detalle": "Alta en directorios de monedas, agregadores y comunidades."
     },
     {
      "id": "publicacion.red_viva",
      "nombre": "Red en producción abierta",
      "detalle": "Red pública minando de forma estable con mineros externos."
     },
     {
      "id": "publicacion.soporte",
      "nombre": "Canales de soporte",
      "detalle": "Comunidad, soporte y documentación pública atendidos."
     }
    ]
   },
   {
    "id": "venta",
    "nombre": "Comercialización y venta",
    "peso": 2,
    "descripcion": "El proyecto no está terminado hasta que vende.",
    "requisitos": [
     {
      "id": "venta.oferta",
      "nombre": "Oferta y precios definidos",
      "detalle": "Qué se vende exactamente, a qué precio y con qué condiciones."
     },
     {
      "id": "venta.cobro",
      "nombre": "Medio de cobro operativo",
      "detalle": "Pasarela, exchange u OTC probado con una transacción real."
     },
     {
      "id": "venta.primera_venta",
      "nombre": "Primera venta cerrada",
      "detalle": "Al menos una venta real cobrada y registrada."
     },
     {
      "id": "venta.seguimiento",
      "nombre": "Seguimiento comercial",
      "detalle": "Registro de ventas, ingresos y siguientes pasos comerciales."
     }
    ]
   }
  ],
  "severidades": [
   "critica",
   "alta",
   "media",
   "baja"
  ],
  "estados_tarea": [
   "pendiente",
   "en_progreso",
   "bloqueada",
   "hecha"
  ],
  "estados_proyecto": [
   "planificado",
   "en_desarrollo",
   "en_pruebas",
   "en_lanzamiento",
   "en_venta",
   "terminado",
   "pausado"
  ]
 },
 "proyectos": [
  {
   "id": "auros-pay",
   "nombre": "Auros Pay",
   "ticker": "AUR",
   "descripcion": "Moneda de pagos rápidos con block target corto, ya publicada y en fase de comercialización.",
   "estado": "en_venta",
   "responsable": "E. Palomares",
   "equipo": [
    "E. Palomares",
    "Dev 2",
    "Marketing"
   ],
   "repositorio": "https://github.com/konopy/auros-pay",
   "fecha_inicio": "2026-02-09",
   "fecha_objetivo": "2026-08-31",
   "fecha_fin": null,
   "estimacion_inicial_dias": 60,
   "estimaciones": [
    {
     "fecha": "2026-02-09",
     "dias_restantes": 60,
     "nota": "Estimación inicial."
    },
    {
     "fecha": "2026-05-04",
     "dias_restantes": 35,
     "nota": "Retraso por la corrida de carga fallida de abril."
    },
    {
     "fecha": "2026-08-10",
     "dias_restantes": 8,
     "nota": "Sólo queda cerrar la parte comercial."
    }
   ],
   "parametros_moneda": {
    "emision_total": "184467440737095516 unidades atómicas",
    "block_target_segundos": 60,
    "block_reward": "emisión decreciente estilo CryptoNote",
    "prefijo_direcciones": "AUR",
    "puerto_p2p": 18800,
    "puerto_rpc": 18801
   },
   "tareas": [
    {
     "id": "t-001",
     "titulo": "Ficha de producto",
     "fase": "definicion",
     "requisito": "definicion.ficha",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "E. Palomares",
     "estimacion_dias": 1,
     "vence": "2026-02-11",
     "notas": ""
    },
    {
     "id": "t-002",
     "titulo": "Parámetros de la moneda",
     "fase": "definicion",
     "requisito": "definicion.parametros",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "E. Palomares",
     "estimacion_dias": 2,
     "vence": "2026-02-13",
     "notas": ""
    },
    {
     "id": "t-003",
     "titulo": "Alcance y entregables",
     "fase": "definicion",
     "requisito": "definicion.alcance",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "E. Palomares",
     "estimacion_dias": 1,
     "vence": "2026-02-13",
     "notas": ""
    },
    {
     "id": "t-004",
     "titulo": "Calendario y estimación",
     "fase": "definicion",
     "requisito": "definicion.calendario",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "E. Palomares",
     "estimacion_dias": 1,
     "vence": "2026-02-14",
     "notas": ""
    },
    {
     "id": "t-010",
     "titulo": "Fork del core",
     "fase": "desarrollo",
     "requisito": "desarrollo.fork",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 1,
     "vence": "2026-02-17",
     "notas": ""
    },
    {
     "id": "t-011",
     "titulo": "CryptoNoteConfig ajustado",
     "fase": "desarrollo",
     "requisito": "desarrollo.config",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 3,
     "vence": "2026-02-25",
     "notas": ""
    },
    {
     "id": "t-012",
     "titulo": "Bloque génesis",
     "fase": "desarrollo",
     "requisito": "desarrollo.genesis",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 2,
     "vence": "2026-03-02",
     "notas": ""
    },
    {
     "id": "t-013",
     "titulo": "Compilación multiplataforma",
     "fase": "desarrollo",
     "requisito": "desarrollo.compilacion",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 4,
     "vence": "2026-03-12",
     "notas": ""
    },
    {
     "id": "t-014",
     "titulo": "Semillas y checkpoints",
     "fase": "desarrollo",
     "requisito": "desarrollo.checkpoints",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 2,
     "vence": "2026-03-16",
     "notas": ""
    },
    {
     "id": "t-020",
     "titulo": "Plan de corridas en frío",
     "fase": "corridas_frio",
     "requisito": "corridas_frio.plan",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "E. Palomares",
     "estimacion_dias": 1,
     "vence": "2026-03-18",
     "notas": ""
    },
    {
     "id": "t-021",
     "titulo": "Corrida de arranque",
     "fase": "corridas_frio",
     "requisito": "corridas_frio.arranque",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 1,
     "vence": "2026-03-23",
     "notas": ""
    },
    {
     "id": "t-022",
     "titulo": "Corrida de minado y dificultad",
     "fase": "corridas_frio",
     "requisito": "corridas_frio.minado",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 2,
     "vence": "2026-04-02",
     "notas": ""
    },
    {
     "id": "t-023",
     "titulo": "Corrida de transacciones y wallets",
     "fase": "corridas_frio",
     "requisito": "corridas_frio.transacciones",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 3,
     "vence": "2026-04-14",
     "notas": ""
    },
    {
     "id": "t-024",
     "titulo": "Corrida de carga",
     "fase": "corridas_frio",
     "requisito": "corridas_frio.carga",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Dev 2",
     "estimacion_dias": 3,
     "vence": "2026-05-06",
     "notas": "Repetida tras el fallo de abril."
    },
    {
     "id": "t-030",
     "titulo": "Reportes de frío de las 4 corridas",
     "fase": "estabilizacion",
     "requisito": "estabilizacion.reportes",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "E. Palomares",
     "estimacion_dias": 3,
     "vence": "2026-05-08",
     "notas": ""
    },
    {
     "id": "t-031",
     "titulo": "Cerrar hallazgos críticos y altos",
     "fase": "estabilizacion",
     "requisito": "estabilizacion.hallazgos",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 6,
     "vence": "2026-05-22",
     "notas": ""
    },
    {
     "id": "t-032",
     "titulo": "Aplicar y re-probar mejoras",
     "fase": "estabilizacion",
     "requisito": "estabilizacion.mejoras",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 4,
     "vence": "2026-05-29",
     "notas": ""
    },
    {
     "id": "t-033",
     "titulo": "Congelar versión 1.0.0",
     "fase": "estabilizacion",
     "requisito": "estabilizacion.congelado",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Dev 2",
     "estimacion_dias": 1,
     "vence": "2026-06-02",
     "notas": ""
    },
    {
     "id": "t-040",
     "titulo": "Seed nodes en producción",
     "fase": "infraestructura",
     "requisito": "infraestructura.nodos",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 2,
     "vence": "2026-06-05",
     "notas": ""
    },
    {
     "id": "t-041",
     "titulo": "Explorador de bloques",
     "fase": "infraestructura",
     "requisito": "infraestructura.explorador",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Dev 2",
     "estimacion_dias": 3,
     "vence": "2026-06-12",
     "notas": ""
    },
    {
     "id": "t-042",
     "titulo": "Pool de minado público",
     "fase": "infraestructura",
     "requisito": "infraestructura.pool",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Dev 2",
     "estimacion_dias": 3,
     "vence": "2026-06-19",
     "notas": ""
    },
    {
     "id": "t-043",
     "titulo": "Binarios y guía de instalación",
     "fase": "infraestructura",
     "requisito": "infraestructura.binarios",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Dev 2",
     "estimacion_dias": 2,
     "vence": "2026-06-23",
     "notas": ""
    },
    {
     "id": "t-050",
     "titulo": "Identidad visual",
     "fase": "landing",
     "requisito": "landing.identidad",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Marketing",
     "estimacion_dias": 3,
     "vence": "2026-06-26",
     "notas": ""
    },
    {
     "id": "t-051",
     "titulo": "Copy de la landing",
     "fase": "landing",
     "requisito": "landing.copy",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Marketing",
     "estimacion_dias": 2,
     "vence": "2026-06-30",
     "notas": ""
    },
    {
     "id": "t-052",
     "titulo": "Publicar landing en auros.pay",
     "fase": "landing",
     "requisito": "landing.publicada",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Marketing",
     "estimacion_dias": 2,
     "vence": "2026-07-06",
     "notas": ""
    },
    {
     "id": "t-053",
     "titulo": "Analítica y captura de correos",
     "fase": "landing",
     "requisito": "landing.analitica",
     "estado": "en_progreso",
     "prioridad": "media",
     "responsable": "Marketing",
     "estimacion_dias": 1,
     "vence": "2026-08-20",
     "notas": "Falta conectar el formulario al CRM."
    },
    {
     "id": "t-060",
     "titulo": "Posicionamiento y diferenciador",
     "fase": "genoma_marketing",
     "requisito": "genoma.posicionamiento",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Marketing",
     "estimacion_dias": 2,
     "vence": "2026-07-10",
     "notas": ""
    },
    {
     "id": "t-061",
     "titulo": "Audiencias y buyer persona",
     "fase": "genoma_marketing",
     "requisito": "genoma.audiencia",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Marketing",
     "estimacion_dias": 2,
     "vence": "2026-07-14",
     "notas": ""
    },
    {
     "id": "t-062",
     "titulo": "Matriz de mensajes por canal",
     "fase": "genoma_marketing",
     "requisito": "genoma.mensajes",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Marketing",
     "estimacion_dias": 2,
     "vence": "2026-07-20",
     "notas": ""
    },
    {
     "id": "t-063",
     "titulo": "Canales, calendario y presupuesto",
     "fase": "genoma_marketing",
     "requisito": "genoma.canales",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Marketing",
     "estimacion_dias": 2,
     "vence": "2026-07-24",
     "notas": ""
    },
    {
     "id": "t-064",
     "titulo": "KPIs y metas por canal",
     "fase": "genoma_marketing",
     "requisito": "genoma.metricas",
     "estado": "en_progreso",
     "prioridad": "media",
     "responsable": "Marketing",
     "estimacion_dias": 1,
     "vence": "2026-08-14",
     "notas": "Faltan las metas de referidos."
    },
    {
     "id": "t-070",
     "titulo": "Anuncio de lanzamiento",
     "fase": "publicacion",
     "requisito": "publicacion.anuncio",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Marketing",
     "estimacion_dias": 1,
     "vence": "2026-07-28",
     "notas": ""
    },
    {
     "id": "t-071",
     "titulo": "Alta en directorios y agregadores",
     "fase": "publicacion",
     "requisito": "publicacion.listados",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Marketing",
     "estimacion_dias": 2,
     "vence": "2026-08-03",
     "notas": ""
    },
    {
     "id": "t-072",
     "titulo": "Red pública estable con mineros externos",
     "fase": "publicacion",
     "requisito": "publicacion.red_viva",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 2,
     "vence": "2026-08-05",
     "notas": ""
    },
    {
     "id": "t-073",
     "titulo": "Canales de soporte y documentación",
     "fase": "publicacion",
     "requisito": "publicacion.soporte",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Marketing",
     "estimacion_dias": 2,
     "vence": "2026-08-07",
     "notas": ""
    },
    {
     "id": "t-080",
     "titulo": "Definir oferta y precios",
     "fase": "venta",
     "requisito": "venta.oferta",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "E. Palomares",
     "estimacion_dias": 2,
     "vence": "2026-08-12",
     "notas": ""
    },
    {
     "id": "t-081",
     "titulo": "Medio de cobro probado con transacción real",
     "fase": "venta",
     "requisito": "venta.cobro",
     "estado": "en_progreso",
     "prioridad": "alta",
     "responsable": "E. Palomares",
     "estimacion_dias": 3,
     "vence": "2026-08-28",
     "notas": "Verificación KYC del OTC pendiente desde hace 10 días."
    },
    {
     "id": "t-082",
     "titulo": "Cerrar la primera venta",
     "fase": "venta",
     "requisito": "venta.primera_venta",
     "estado": "bloqueada",
     "prioridad": "alta",
     "responsable": "E. Palomares",
     "estimacion_dias": 2,
     "vence": "2026-09-05",
     "notas": "Bloqueada hasta que el medio de cobro esté operativo."
    },
    {
     "id": "t-083",
     "titulo": "Registro de ventas e ingresos",
     "fase": "venta",
     "requisito": "venta.seguimiento",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "E. Palomares",
     "estimacion_dias": 1,
     "vence": "2026-09-12",
     "notas": ""
    }
   ],
   "corridas_frio": [
    {
     "id": "cf-01",
     "fecha": "2026-03-22",
     "tipo": "arranque",
     "objetivo": "Arranque desde bloque 0 con 3 nodos.",
     "duracion_horas": 4,
     "resultado": "ok",
     "nodos": 3,
     "bloques": 190,
     "metricas": {
      "tiempo_bloque_promedio_s": 61,
      "reorgs": 0
     },
     "incidencias": [],
     "notas": ""
    },
    {
     "id": "cf-02",
     "fecha": "2026-04-01",
     "tipo": "minado",
     "objetivo": "Minado sostenido 10 horas.",
     "duracion_horas": 10,
     "resultado": "ok",
     "nodos": 4,
     "bloques": 580,
     "metricas": {
      "tiempo_bloque_promedio_s": 63,
      "reorgs": 1
     },
     "incidencias": [],
     "notas": ""
    },
    {
     "id": "cf-03",
     "fecha": "2026-04-13",
     "tipo": "transacciones",
     "objetivo": "Transacciones con mixin y recuperación de wallets.",
     "duracion_horas": 8,
     "resultado": "con_incidencias",
     "nodos": 4,
     "bloques": 430,
     "metricas": {
      "tiempo_bloque_promedio_s": 64,
      "reorgs": 2,
      "transacciones": 740
     },
     "incidencias": [
      "Wallet lento al recuperar desde semilla con más de 400 transacciones."
     ],
     "notas": ""
    },
    {
     "id": "cf-04",
     "fecha": "2026-04-27",
     "tipo": "carga",
     "objetivo": "8 nodos, caídas provocadas y pico de transacciones.",
     "duracion_horas": 14,
     "resultado": "fallida",
     "nodos": 8,
     "bloques": 700,
     "metricas": {
      "tiempo_bloque_promedio_s": 71,
      "reorgs": 6,
      "transacciones": 3100
     },
     "incidencias": [
      "El daemon consumió 6 GB de RAM y fue terminado por el sistema."
     ],
     "notas": "Repetida el 5 de mayo con resultado correcto."
    },
    {
     "id": "cf-05",
     "fecha": "2026-05-05",
     "tipo": "carga",
     "objetivo": "Repetición de la corrida de carga tras optimizar memoria.",
     "duracion_horas": 14,
     "resultado": "ok",
     "nodos": 8,
     "bloques": 715,
     "metricas": {
      "tiempo_bloque_promedio_s": 62,
      "reorgs": 2,
      "transacciones": 3200,
      "ram_pico_mb": 1450
     },
     "incidencias": [],
     "notas": ""
    }
   ],
   "reportes_frio": [
    {
     "id": "rf-01",
     "fecha": "2026-03-23",
     "corrida": "cf-01",
     "autor": "Dev 2",
     "conclusion": "Arranque correcto.",
     "hallazgos": []
    },
    {
     "id": "rf-02",
     "fecha": "2026-04-02",
     "corrida": "cf-02",
     "autor": "Dev 2",
     "conclusion": "Dificultad estable para 60 s.",
     "hallazgos": [
      {
       "id": "h-01",
       "titulo": "Picos de dificultad al entrar hashrate nuevo",
       "severidad": "baja",
       "impacto": "Variación temporal del tiempo de bloque.",
       "mejora_propuesta": "Suavizar la ventana de dificultad.",
       "estado": "cerrado",
       "tarea": "t-032"
      }
     ]
    },
    {
     "id": "rf-03",
     "fecha": "2026-04-14",
     "corrida": "cf-03",
     "autor": "E. Palomares",
     "conclusion": "Aceptable con una mejora de rendimiento pendiente.",
     "hallazgos": [
      {
       "id": "h-02",
       "titulo": "Recuperación de wallet lenta con historial grande",
       "severidad": "media",
       "impacto": "Mala primera experiencia del usuario.",
       "mejora_propuesta": "Escaneo por lotes y barra de progreso en simplewallet.",
       "estado": "cerrado",
       "tarea": "t-032"
      }
     ]
    },
    {
     "id": "rf-04",
     "fecha": "2026-04-28",
     "corrida": "cf-04",
     "autor": "Dev 2",
     "conclusion": "Corrida fallida por consumo de memoria: bloquea el lanzamiento hasta corregirlo.",
     "hallazgos": [
      {
       "id": "h-03",
       "titulo": "Fuga de memoria en el pool bajo carga alta",
       "severidad": "critica",
       "impacto": "El daemon muere con 3000+ transacciones en cola.",
       "mejora_propuesta": "Limitar el tamaño del pool y liberar transacciones expiradas.",
       "estado": "cerrado",
       "tarea": "t-031"
      },
      {
       "id": "h-04",
       "titulo": "Sin métricas de memoria en el RPC",
       "severidad": "media",
       "impacto": "No se detecta el problema hasta que el proceso muere.",
       "mejora_propuesta": "Exponer uso de memoria y tamaño de pool en el RPC de estado.",
       "estado": "cerrado",
       "tarea": "t-032"
      }
     ]
    },
    {
     "id": "rf-05",
     "fecha": "2026-05-06",
     "corrida": "cf-05",
     "autor": "Dev 2",
     "conclusion": "Carga superada con 1.45 GB de RAM pico. Listo para congelar versión.",
     "hallazgos": []
    }
   ],
   "bitacora": [
    {
     "fecha": "2026-02-09",
     "horas": 5,
     "personas": 1,
     "fase": "definicion",
     "elaborado": [
      "Ficha de producto y parámetros iniciales"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-02-12",
     "horas": 6,
     "personas": 1,
     "fase": "definicion",
     "elaborado": [
      "Alcance, entregables y calendario"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-02-17",
     "horas": 7,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "Fork del core y entorno de compilación"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-02-24",
     "horas": 8,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "CryptoNoteConfig completo"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-03-02",
     "horas": 8,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "Bloque génesis generado y verificado"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-03-11",
     "horas": 8,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "Compilación en Linux, Windows y macOS"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-03-16",
     "horas": 6,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "Seed nodes y checkpoints"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-03-22",
     "horas": 6,
     "personas": 2,
     "fase": "corridas_frio",
     "elaborado": [
      "Corrida cf-01 y reporte rf-01"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-04-01",
     "horas": 10,
     "personas": 2,
     "fase": "corridas_frio",
     "elaborado": [
      "Corrida cf-02 de minado"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-04-13",
     "horas": 9,
     "personas": 2,
     "fase": "corridas_frio",
     "elaborado": [
      "Corrida cf-03 de transacciones"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-04-27",
     "horas": 12,
     "personas": 2,
     "fase": "corridas_frio",
     "elaborado": [
      "Corrida cf-04 de carga (fallida)"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-05-04",
     "horas": 8,
     "personas": 2,
     "fase": "estabilizacion",
     "elaborado": [
      "Corrección de la fuga de memoria del pool"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-05-05",
     "horas": 12,
     "personas": 2,
     "fase": "corridas_frio",
     "elaborado": [
      "Corrida cf-05 de carga superada"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-05-20",
     "horas": 8,
     "personas": 2,
     "fase": "estabilizacion",
     "elaborado": [
      "Cierre de hallazgos y mejoras aplicadas"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-02",
     "horas": 5,
     "personas": 1,
     "fase": "estabilizacion",
     "elaborado": [
      "Versión 1.0.0 congelada y notas de versión"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-10",
     "horas": 8,
     "personas": 2,
     "fase": "infraestructura",
     "elaborado": [
      "Seed nodes en producción y explorador de bloques"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-22",
     "horas": 8,
     "personas": 2,
     "fase": "infraestructura",
     "elaborado": [
      "Pool de minado y binarios publicados"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-29",
     "horas": 6,
     "personas": 1,
     "fase": "landing",
     "elaborado": [
      "Identidad visual y copy de la landing"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-07-06",
     "horas": 7,
     "personas": 1,
     "fase": "landing",
     "elaborado": [
      "Landing publicada en auros.pay"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-07-20",
     "horas": 8,
     "personas": 1,
     "fase": "genoma_marketing",
     "elaborado": [
      "Posicionamiento, audiencias y matriz de mensajes"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-07-27",
     "horas": 6,
     "personas": 1,
     "fase": "publicacion",
     "elaborado": [
      "Anuncio de lanzamiento y notas de prensa"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-08-05",
     "horas": 7,
     "personas": 2,
     "fase": "publicacion",
     "elaborado": [
      "Red pública abierta a mineros externos",
      "Alta en directorios"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-08-12",
     "horas": 5,
     "personas": 1,
     "fase": "venta",
     "elaborado": [
      "Oferta y precios definidos"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-08-25",
     "horas": 3,
     "personas": 1,
     "fase": "venta",
     "elaborado": [
      "Alta en el OTC y envío de documentación KYC"
     ],
     "notas": "A la espera del proveedor."
    }
   ],
   "riesgos": [
    {
     "id": "r-01",
     "titulo": "La verificación KYC del OTC lleva 10 días parada",
     "probabilidad": "alta",
     "impacto": "alto",
     "mitigacion": "Abrir alta en un segundo proveedor en paralelo.",
     "estado": "abierto"
    }
   ],
   "resultado_final": {
    "landing_page": {
     "estado": "hecho",
     "url": "https://auros.pay",
     "fecha": "2026-07-06",
     "notas": "Publicada; falta conectar el formulario al CRM."
    },
    "genoma_marketing": {
     "estado": "en_progreso",
     "url": "docs/genoma-auros.md",
     "fecha": null,
     "notas": "Falta cerrar KPIs de referidos."
    },
    "publicacion": {
     "estado": "hecho",
     "url": "https://auros.pay/anuncio",
     "fecha": "2026-08-05",
     "notas": "Red pública estable con mineros externos."
    },
    "venta": {
     "estado": "en_progreso",
     "fecha_primera_venta": null,
     "unidades_vendidas": 0,
     "ingresos": 0,
     "moneda": "USD",
     "notas": "Bloqueada por el medio de cobro."
    }
   }
  },
  {
   "id": "konopy-coin",
   "nombre": "Konopy Coin",
   "ticker": "KNP",
   "descripcion": "Moneda CryptoNote propia derivada del core de este repositorio, pensada como producto insignia de la plataforma.",
   "estado": "en_pruebas",
   "responsable": "E. Palomares",
   "equipo": [
    "E. Palomares",
    "Dev 2",
    "Marketing"
   ],
   "repositorio": "https://github.com/konopy/cryptonote",
   "fecha_inicio": "2026-06-01",
   "fecha_objetivo": "2026-10-15",
   "fecha_fin": null,
   "estimacion_inicial_dias": 55,
   "estimaciones": [
    {
     "fecha": "2026-06-01",
     "dias_restantes": 55,
     "nota": "Estimación inicial: 55 días de trabajo efectivo."
    },
    {
     "fecha": "2026-07-06",
     "dias_restantes": 40,
     "nota": "Revisión tras terminar el core: el génesis costó más de lo previsto."
    },
    {
     "fecha": "2026-08-24",
     "dias_restantes": 26,
     "nota": "Revisión tras la tercera corrida en frío: quedan hallazgos altos abiertos y toda la parte comercial."
    }
   ],
   "parametros_moneda": {
    "emision_total": "18446744073709551615 unidades atómicas",
    "block_target_segundos": 120,
    "block_reward": "emisión decreciente estilo CryptoNote",
    "prefijo_direcciones": "KNP",
    "puerto_p2p": 19800,
    "puerto_rpc": 19801
   },
   "tareas": [
    {
     "id": "t-001",
     "titulo": "Ficha de producto de Konopy Coin",
     "fase": "definicion",
     "requisito": "definicion.ficha",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "E. Palomares",
     "estimacion_dias": 1,
     "vence": "2026-06-03",
     "notas": ""
    },
    {
     "id": "t-002",
     "titulo": "Definir parámetros de emisión, dificultad y puertos",
     "fase": "definicion",
     "requisito": "definicion.parametros",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "E. Palomares",
     "estimacion_dias": 2,
     "vence": "2026-06-05",
     "notas": ""
    },
    {
     "id": "t-003",
     "titulo": "Cerrar alcance y lista de entregables",
     "fase": "definicion",
     "requisito": "definicion.alcance",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "E. Palomares",
     "estimacion_dias": 1,
     "vence": "2026-06-05",
     "notas": ""
    },
    {
     "id": "t-004",
     "titulo": "Calendario y estimación inicial",
     "fase": "definicion",
     "requisito": "definicion.calendario",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "E. Palomares",
     "estimacion_dias": 1,
     "vence": "2026-06-06",
     "notas": ""
    },
    {
     "id": "t-010",
     "titulo": "Fork del core y repositorio propio",
     "fase": "desarrollo",
     "requisito": "desarrollo.fork",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 1,
     "vence": "2026-06-09",
     "notas": ""
    },
    {
     "id": "t-011",
     "titulo": "Ajustar src/CryptoNoteConfig.h con los parámetros de la ficha",
     "fase": "desarrollo",
     "requisito": "desarrollo.config",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 3,
     "vence": "2026-06-18",
     "notas": ""
    },
    {
     "id": "t-012",
     "titulo": "Generar y fijar el bloque génesis",
     "fase": "desarrollo",
     "requisito": "desarrollo.genesis",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 2,
     "vence": "2026-06-25",
     "notas": "Costó 6 días reales por el hex del génesis."
    },
    {
     "id": "t-013",
     "titulo": "Compilación limpia en Linux y Windows",
     "fase": "desarrollo",
     "requisito": "desarrollo.compilacion",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 4,
     "vence": "2026-07-03",
     "notas": "Windows pendiente de firmar binarios."
    },
    {
     "id": "t-014",
     "titulo": "Definir seed nodes y checkpoints iniciales",
     "fase": "desarrollo",
     "requisito": "desarrollo.checkpoints",
     "estado": "en_progreso",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 2,
     "vence": "2026-09-05",
     "notas": "Falta el segundo seed node; sólo está 192.168.1.81 del laboratorio."
    },
    {
     "id": "t-020",
     "titulo": "Escribir el plan de corridas en frío",
     "fase": "corridas_frio",
     "requisito": "corridas_frio.plan",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "E. Palomares",
     "estimacion_dias": 1,
     "vence": "2026-07-10",
     "notas": ""
    },
    {
     "id": "t-021",
     "titulo": "Corrida de arranque de red desde bloque 0",
     "fase": "corridas_frio",
     "requisito": "corridas_frio.arranque",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 1,
     "vence": "2026-07-14",
     "notas": ""
    },
    {
     "id": "t-022",
     "titulo": "Corrida de minado sostenido y ajuste de dificultad",
     "fase": "corridas_frio",
     "requisito": "corridas_frio.minado",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 2,
     "vence": "2026-08-05",
     "notas": ""
    },
    {
     "id": "t-023",
     "titulo": "Corrida de transacciones, mixin y recuperación de wallets",
     "fase": "corridas_frio",
     "requisito": "corridas_frio.transacciones",
     "estado": "en_progreso",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 3,
     "vence": "2026-09-08",
     "notas": "Repetir tras corregir el hallazgo h-03."
    },
    {
     "id": "t-024",
     "titulo": "Corrida de carga con 8 nodos y caídas provocadas",
     "fase": "corridas_frio",
     "requisito": "corridas_frio.carga",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "Dev 2",
     "estimacion_dias": 2,
     "vence": "2026-09-18",
     "notas": ""
    },
    {
     "id": "t-030",
     "titulo": "Reporte de frío de la corrida cf-03",
     "fase": "estabilizacion",
     "requisito": "estabilizacion.reportes",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "E. Palomares",
     "estimacion_dias": 1,
     "vence": "2026-08-25",
     "notas": ""
    },
    {
     "id": "t-031",
     "titulo": "Cerrar hallazgos críticos y altos abiertos",
     "fase": "estabilizacion",
     "requisito": "estabilizacion.hallazgos",
     "estado": "bloqueada",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 4,
     "vence": "2026-09-10",
     "notas": "Bloqueada: falta hardware para reproducir el reorg del hallazgo h-03."
    },
    {
     "id": "t-032",
     "titulo": "Aplicar y re-probar las mejoras aceptadas",
     "fase": "estabilizacion",
     "requisito": "estabilizacion.mejoras",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 3,
     "vence": "2026-09-20",
     "notas": ""
    },
    {
     "id": "t-033",
     "titulo": "Congelar versión candidata y notas de versión",
     "fase": "estabilizacion",
     "requisito": "estabilizacion.congelado",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "Dev 2",
     "estimacion_dias": 1,
     "vence": "2026-09-25",
     "notas": ""
    },
    {
     "id": "t-040",
     "titulo": "Montar dos seed nodes en producción",
     "fase": "infraestructura",
     "requisito": "infraestructura.nodos",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "Dev 2",
     "estimacion_dias": 2,
     "vence": "2026-09-28",
     "notas": ""
    },
    {
     "id": "t-041",
     "titulo": "Desplegar el explorador de bloques",
     "fase": "infraestructura",
     "requisito": "infraestructura.explorador",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "Dev 2",
     "estimacion_dias": 2,
     "vence": "2026-10-02",
     "notas": ""
    },
    {
     "id": "t-042",
     "titulo": "Publicar binarios y guía de instalación",
     "fase": "infraestructura",
     "requisito": "infraestructura.binarios",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "Dev 2",
     "estimacion_dias": 1,
     "vence": "2026-10-05",
     "notas": ""
    },
    {
     "id": "t-050",
     "titulo": "Identidad visual de Konopy Coin",
     "fase": "landing",
     "requisito": "landing.identidad",
     "estado": "en_progreso",
     "prioridad": "media",
     "responsable": "Marketing",
     "estimacion_dias": 3,
     "vence": "2026-09-12",
     "notas": "Logo en revisión."
    },
    {
     "id": "t-051",
     "titulo": "Copy y propuesta de valor de la landing",
     "fase": "landing",
     "requisito": "landing.copy",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "Marketing",
     "estimacion_dias": 2,
     "vence": "2026-09-22",
     "notas": ""
    }
   ],
   "corridas_frio": [
    {
     "id": "cf-01",
     "fecha": "2026-07-13",
     "tipo": "arranque",
     "objetivo": "Levantar la red desde el bloque 0 con 3 nodos aislados y verificar sincronización.",
     "duracion_horas": 5,
     "resultado": "ok",
     "nodos": 3,
     "bloques": 214,
     "metricas": {
      "tiempo_bloque_promedio_s": 118,
      "reorgs": 0,
      "peers_estables": 3
     },
     "incidencias": [],
     "notas": "Arranque limpio. El génesis quedó validado."
    },
    {
     "id": "cf-02",
     "fecha": "2026-08-03",
     "tipo": "minado",
     "objetivo": "Minado sostenido 12 horas para observar el ajuste de dificultad y la emisión real.",
     "duracion_horas": 12,
     "resultado": "con_incidencias",
     "nodos": 4,
     "bloques": 361,
     "metricas": {
      "tiempo_bloque_promedio_s": 143,
      "reorgs": 2,
      "peers_estables": 4
     },
     "incidencias": [
      "El tiempo de bloque se desvía un 19% del objetivo tras subidas bruscas de hashrate.",
      "Un nodo se quedó atrás 40 bloques y tardó 11 minutos en resincronizar."
     ],
     "notas": "La ventana de dificultad hereda valores del core original y no encaja con un block target de 120 s."
    },
    {
     "id": "cf-03",
     "fecha": "2026-08-21",
     "tipo": "transacciones",
     "objetivo": "Envíos con mixin 4, transacciones concurrentes y recuperación de wallet desde semilla.",
     "duracion_horas": 9,
     "resultado": "fallida",
     "nodos": 5,
     "bloques": 288,
     "metricas": {
      "tiempo_bloque_promedio_s": 126,
      "reorgs": 4,
      "transacciones": 512,
      "transacciones_perdidas": 7
     },
     "incidencias": [
      "7 transacciones desaparecieron del pool tras un reorg de 3 bloques.",
      "simplewallet mostró saldo incorrecto hasta reiniciar el daemon."
     ],
     "notas": "Corrida detenida antes de tiempo. Hay que repetirla completa después de corregir."
    }
   ],
   "reportes_frio": [
    {
     "id": "rf-01",
     "fecha": "2026-07-14",
     "corrida": "cf-01",
     "autor": "E. Palomares",
     "conclusion": "Arranque validado. Se puede pasar a corridas de minado.",
     "hallazgos": [
      {
       "id": "h-01",
       "titulo": "Los logs del daemon no marcan la hora con zona horaria",
       "severidad": "baja",
       "impacto": "Dificulta correlacionar eventos entre nodos durante las corridas.",
       "mejora_propuesta": "Añadir timestamp ISO-8601 con zona en el logger del daemon.",
       "estado": "cerrado",
       "tarea": ""
      }
     ]
    },
    {
     "id": "rf-02",
     "fecha": "2026-08-04",
     "corrida": "cf-02",
     "autor": "Dev 2",
     "conclusion": "El algoritmo de dificultad necesita reajuste antes de cualquier red pública.",
     "hallazgos": [
      {
       "id": "h-02",
       "titulo": "Ventana de dificultad heredada no encaja con block target de 120 s",
       "severidad": "alta",
       "impacto": "Tiempos de bloque inestables y emisión distinta a la publicada en la ficha.",
       "mejora_propuesta": "Recalcular DIFFICULTY_WINDOW y DIFFICULTY_CUT para 120 s y re-correr la corrida de minado.",
       "estado": "en_progreso",
       "tarea": "t-031"
      },
      {
       "id": "h-04",
       "titulo": "Resincronización lenta de nodos rezagados",
       "severidad": "media",
       "impacto": "Un nodo tarda más de 10 minutos en volver a la cadena tras desconectarse.",
       "mejora_propuesta": "Subir el tamaño de lote de bloques en la sincronización y añadir métrica de retraso al RPC.",
       "estado": "abierto",
       "tarea": ""
      }
     ]
    },
    {
     "id": "rf-03",
     "fecha": "2026-08-24",
     "corrida": "cf-03",
     "autor": "E. Palomares",
     "conclusion": "Corrida fallida. No se avanza a infraestructura pública hasta cerrar h-03.",
     "hallazgos": [
      {
       "id": "h-03",
       "titulo": "Transacciones perdidas del pool tras un reorg",
       "severidad": "critica",
       "impacto": "Pérdida de transacciones confirmadas ante los usuarios: bloquea cualquier lanzamiento.",
       "mejora_propuesta": "Reinyectar al pool las transacciones de los bloques huérfanos y cubrirlo con una prueba automatizada de reorg.",
       "estado": "abierto",
       "tarea": "t-031"
      },
      {
       "id": "h-05",
       "titulo": "simplewallet no refresca el saldo tras un reorg",
       "severidad": "alta",
       "impacto": "El usuario ve un saldo que no existe hasta reiniciar.",
       "mejora_propuesta": "Invalidar la caché del wallet al detectar cambio de cadena y forzar refresco.",
       "estado": "abierto",
       "tarea": "t-031"
      },
      {
       "id": "h-06",
       "titulo": "Sin prueba automatizada que cubra reorgs",
       "severidad": "media",
       "impacto": "Los errores de reorg sólo se detectan a mano en corridas largas.",
       "mejora_propuesta": "Añadir un test de integración en tests/ que provoque un reorg de 3 bloques.",
       "estado": "abierto",
       "tarea": ""
      }
     ]
    }
   ],
   "bitacora": [
    {
     "fecha": "2026-06-01",
     "horas": 5,
     "personas": 1,
     "fase": "definicion",
     "elaborado": [
      "Ficha inicial del producto",
      "Investigación de parámetros de monedas comparables"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-02",
     "horas": 6,
     "personas": 1,
     "fase": "definicion",
     "elaborado": [
      "Parámetros de emisión y block target",
      "Puertos P2P/RPC reservados"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-04",
     "horas": 4,
     "personas": 1,
     "fase": "definicion",
     "elaborado": [
      "Alcance cerrado y lista de entregables"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-05",
     "horas": 3,
     "personas": 1,
     "fase": "definicion",
     "elaborado": [
      "Calendario y estimación inicial de 55 días"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-09",
     "horas": 6,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "Fork del core y repositorio propio",
      "Entorno de compilación en el servidor 192.168.1.81"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-10",
     "horas": 7,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "Primera pasada de CryptoNoteConfig.h"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-11",
     "horas": 7,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "Prefijo de direcciones y nombres de la moneda en todo el código"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-16",
     "horas": 6,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "Ajuste de emisión y reward"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-18",
     "horas": 8,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "Generación del bloque génesis",
      "Primer intento fallido de fijar el hex"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-19",
     "horas": 8,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "Génesis regenerado y validado en tres máquinas"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-23",
     "horas": 5,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "Limpieza de referencias al proyecto original"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-25",
     "horas": 7,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "Compilación limpia en Linux",
      "Ajuste de CMakeLists para el nuevo nombre"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-06-30",
     "horas": 6,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "Compilación en Windows con Boost 1.84"
     ],
     "notas": "Dos días perdidos por dependencias."
    },
    {
     "fecha": "2026-07-02",
     "horas": 5,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "Binarios de prueba para el equipo"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-07-06",
     "horas": 4,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "Revisión de estimación: quedan 40 días"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-07-09",
     "horas": 5,
     "personas": 1,
     "fase": "corridas_frio",
     "elaborado": [
      "Plan de corridas en frío con 5 escenarios"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-07-13",
     "horas": 8,
     "personas": 2,
     "fase": "corridas_frio",
     "elaborado": [
      "Corrida cf-01 de arranque de red",
      "214 bloques minados en laboratorio"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-07-14",
     "horas": 4,
     "personas": 1,
     "fase": "estabilizacion",
     "elaborado": [
      "Reporte de frío rf-01"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-07-21",
     "horas": 6,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "Timestamps con zona horaria en el logger (hallazgo h-01)"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-08-03",
     "horas": 10,
     "personas": 2,
     "fase": "corridas_frio",
     "elaborado": [
      "Corrida cf-02 de minado de 12 horas"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-08-04",
     "horas": 5,
     "personas": 1,
     "fase": "estabilizacion",
     "elaborado": [
      "Reporte de frío rf-02",
      "Hallazgos h-02 y h-04 documentados"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-08-11",
     "horas": 7,
     "personas": 1,
     "fase": "estabilizacion",
     "elaborado": [
      "Primer intento de recálculo de la ventana de dificultad"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-08-21",
     "horas": 9,
     "personas": 2,
     "fase": "corridas_frio",
     "elaborado": [
      "Corrida cf-03 de transacciones",
      "Detección de pérdida de transacciones en reorg"
     ],
     "notas": "Corrida detenida antes de tiempo."
    },
    {
     "fecha": "2026-08-24",
     "horas": 6,
     "personas": 1,
     "fase": "estabilizacion",
     "elaborado": [
      "Reporte de frío rf-03",
      "Revisión de estimación: quedan 26 días"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-08-28",
     "horas": 5,
     "personas": 1,
     "fase": "estabilizacion",
     "elaborado": [
      "Reproducción parcial del reorg en laboratorio"
     ],
     "notas": "Falta hardware para el escenario completo."
    },
    {
     "fecha": "2026-09-01",
     "horas": 4,
     "personas": 1,
     "fase": "landing",
     "elaborado": [
      "Primeras propuestas de logo e identidad"
     ],
     "notas": ""
    }
   ],
   "riesgos": [
    {
     "id": "r-01",
     "titulo": "El hallazgo crítico h-03 puede exigir cambios profundos en el pool de transacciones",
     "probabilidad": "media",
     "impacto": "alto",
     "mitigacion": "Aislar el cambio y cubrirlo con prueba de reorg antes de tocar nada más.",
     "estado": "abierto"
    },
    {
     "id": "r-02",
     "titulo": "Toda la fase comercial (genoma, publicación, venta) sigue sin planificar",
     "probabilidad": "alta",
     "impacto": "alto",
     "mitigacion": "Arrancar el genoma de marketing en paralelo a la estabilización, no después.",
     "estado": "abierto"
    }
   ],
   "resultado_final": {
    "landing_page": {
     "estado": "en_progreso",
     "url": "",
     "fecha": null,
     "notas": "Identidad visual en revisión; copy sin empezar."
    },
    "genoma_marketing": {
     "estado": "pendiente",
     "url": "",
     "fecha": null,
     "notas": "Sin arrancar."
    },
    "publicacion": {
     "estado": "pendiente",
     "url": "",
     "fecha": null,
     "notas": "Bloqueada por los hallazgos de frío abiertos."
    },
    "venta": {
     "estado": "pendiente",
     "fecha_primera_venta": null,
     "unidades_vendidas": 0,
     "ingresos": 0,
     "moneda": "USD",
     "notas": ""
    }
   }
  },
  {
   "id": "terra-nodo",
   "nombre": "Terra Nodo",
   "ticker": "TRR",
   "descripcion": "Moneda regional orientada a comercios locales. Proyecto recién arrancado.",
   "estado": "planificado",
   "responsable": "E. Palomares",
   "equipo": [
    "E. Palomares"
   ],
   "repositorio": "",
   "fecha_inicio": "2026-08-17",
   "fecha_objetivo": "2026-12-18",
   "fecha_fin": null,
   "estimacion_inicial_dias": 50,
   "estimaciones": [
    {
     "fecha": "2026-08-17",
     "dias_restantes": 50,
     "nota": "Estimación inicial, sin equipo asignado todavía."
    }
   ],
   "parametros_moneda": {
    "emision_total": "",
    "block_target_segundos": 0,
    "block_reward": "",
    "prefijo_direcciones": "",
    "puerto_p2p": 0,
    "puerto_rpc": 0
   },
   "tareas": [
    {
     "id": "t-001",
     "titulo": "Ficha de producto de Terra Nodo",
     "fase": "definicion",
     "requisito": "definicion.ficha",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "E. Palomares",
     "estimacion_dias": 1,
     "vence": "2026-08-20",
     "notas": ""
    },
    {
     "id": "t-002",
     "titulo": "Definir parámetros de la moneda",
     "fase": "definicion",
     "requisito": "definicion.parametros",
     "estado": "en_progreso",
     "prioridad": "alta",
     "responsable": "E. Palomares",
     "estimacion_dias": 2,
     "vence": "2026-08-31",
     "notas": "Falta decidir emisión total y block target."
    },
    {
     "id": "t-003",
     "titulo": "Cerrar alcance y entregables",
     "fase": "definicion",
     "requisito": "definicion.alcance",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "E. Palomares",
     "estimacion_dias": 1,
     "vence": "2026-09-04",
     "notas": ""
    },
    {
     "id": "t-004",
     "titulo": "Calendario y estimación",
     "fase": "definicion",
     "requisito": "definicion.calendario",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "E. Palomares",
     "estimacion_dias": 1,
     "vence": "2026-09-08",
     "notas": ""
    },
    {
     "id": "t-010",
     "titulo": "Fork del core para Terra Nodo",
     "fase": "desarrollo",
     "requisito": "desarrollo.fork",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "",
     "estimacion_dias": 1,
     "vence": "2026-09-15",
     "notas": "Sin responsable asignado."
    },
    {
     "id": "t-011",
     "titulo": "Ajustar CryptoNoteConfig.h",
     "fase": "desarrollo",
     "requisito": "desarrollo.config",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "",
     "estimacion_dias": 3,
     "vence": "2026-09-25",
     "notas": ""
    }
   ],
   "corridas_frio": [],
   "reportes_frio": [],
   "bitacora": [
    {
     "fecha": "2026-08-17",
     "horas": 4,
     "personas": 1,
     "fase": "definicion",
     "elaborado": [
      "Idea de producto y primera ficha"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-08-19",
     "horas": 3,
     "personas": 1,
     "fase": "definicion",
     "elaborado": [
      "Investigación de comercios locales interesados"
     ],
     "notas": ""
    },
    {
     "fecha": "2026-08-31",
     "horas": 3,
     "personas": 1,
     "fase": "definicion",
     "elaborado": [
      "Borrador de parámetros de emisión"
     ],
     "notas": "Sin cerrar."
    }
   ],
   "riesgos": [
    {
     "id": "r-01",
     "titulo": "No hay desarrollador asignado",
     "probabilidad": "alta",
     "impacto": "alto",
     "mitigacion": "Reservar a Dev 2 en cuanto Konopy Coin congele versión.",
     "estado": "abierto"
    }
   ],
   "resultado_final": {
    "landing_page": {
     "estado": "pendiente",
     "url": "",
     "fecha": null,
     "notas": ""
    },
    "genoma_marketing": {
     "estado": "pendiente",
     "url": "",
     "fecha": null,
     "notas": ""
    },
    "publicacion": {
     "estado": "pendiente",
     "url": "",
     "fecha": null,
     "notas": ""
    },
    "venta": {
     "estado": "pendiente",
     "fecha_primera_venta": null,
     "unidades_vendidas": 0,
     "ingresos": 0,
     "moneda": "USD",
     "notas": ""
    }
   }
  }
 ]
};
