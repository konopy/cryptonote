/* Generado por tools/build.py. No editar a mano. */
window.PD_DATA = {
 "indice": {
  "nombre": "Projets Dashboard",
  "descripcion": "Panel de control de los proyectos de Konopy.",
  "proyectos": [
   "proyectos/fieldops.json",
   "proyectos/indigo.json"
  ]
 },
 "pipeline": {
  "version": 2,
  "descripcion": "Modelo canónico de un proyecto completo: desde la definición hasta la venta. Cada fase tiene requisitos obligatorios; el dashboard compara cada proyecto contra este modelo para decir exactamente qué falta. Es genérico a propósito: sirve para una app, una moneda o cualquier producto que se construya, se pruebe en frío, se publique y se venda.",
  "fases": [
   {
    "id": "definicion",
    "nombre": "Definición y alcance",
    "peso": 1,
    "descripcion": "Qué se va a construir, para quién y con qué criterio se dará por terminado.",
    "requisitos": [
     {
      "id": "definicion.ficha",
      "nombre": "Ficha del proyecto",
      "detalle": "Qué es, qué problema resuelve, para quién y con qué stack o materiales."
     },
     {
      "id": "definicion.alcance",
      "nombre": "Alcance y entregables",
      "detalle": "Lista cerrada de entregables y de lo que queda explícitamente fuera."
     },
     {
      "id": "definicion.calendario",
      "nombre": "Calendario y estimación",
      "detalle": "Fecha de inicio, fecha objetivo y estimación de días de trabajo."
     },
     {
      "id": "definicion.criterios",
      "nombre": "Criterios de terminado",
      "detalle": "Qué tiene que ser cierto para poder cerrar el proyecto y firmarlo."
     }
    ]
   },
   {
    "id": "desarrollo",
    "nombre": "Desarrollo y construcción",
    "peso": 3,
    "descripcion": "El producto en sí: el núcleo funcional, sus pruebas y su documentación.",
    "requisitos": [
     {
      "id": "desarrollo.entorno",
      "nombre": "Entorno y repositorio",
      "detalle": "Repositorio, entorno de desarrollo reproducible y guía de instalación."
     },
     {
      "id": "desarrollo.nucleo",
      "nombre": "Núcleo funcional construido",
      "detalle": "Las funciones que justifican el producto, terminadas y usables de punta a punta."
     },
     {
      "id": "desarrollo.pruebas",
      "nombre": "Pruebas automatizadas del flujo crítico",
      "detalle": "Suite de pruebas que cubre los recorridos que no se pueden romper."
     },
     {
      "id": "desarrollo.documentacion",
      "nombre": "Documentación de uso",
      "detalle": "Manuales por rol o guía de uso, y documentación técnica de despliegue."
     },
     {
      "id": "desarrollo.revision",
      "nombre": "Revisión de seguridad y cumplimiento",
      "detalle": "Repaso de seguridad, permisos, datos personales y obligaciones legales del sector."
     }
    ]
   },
   {
    "id": "corridas_frio",
    "nombre": "Corridas en frío",
    "peso": 2,
    "descripcion": "Ensayos controlados de extremo a extremo antes de exponer el producto a clientes reales.",
    "requisitos": [
     {
      "id": "corridas_frio.plan",
      "nombre": "Plan de corridas en frío",
      "detalle": "Escenarios a probar, criterios de éxito y qué se mide en cada corrida."
     },
     {
      "id": "corridas_frio.ensayo",
      "nombre": "Corrida de ensayo interna",
      "detalle": "Recorrido completo de punta a punta hecho por el equipo, sin usuarios externos."
     },
     {
      "id": "corridas_frio.reales",
      "nombre": "Corrida con usuarios y equipos reales",
      "detalle": "Personas reales, en sus dispositivos y condiciones reales, sin ayuda."
     },
     {
      "id": "corridas_frio.datos",
      "nombre": "Corrida con datos y volumen reales",
      "detalle": "Comportamiento con el volumen, los datos y la carga que habrá en producción."
     },
     {
      "id": "corridas_frio.recuperacion",
      "nombre": "Corrida de fallo y recuperación",
      "detalle": "Provocar la caída y comprobar que el sistema y los datos vuelven."
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
      "nombre": "Hallazgos críticos y altos cerrados",
      "detalle": "Ningún hallazgo bloqueante queda abierto."
     },
     {
      "id": "estabilizacion.mejoras",
      "nombre": "Mejoras aplicadas y re-probadas",
      "detalle": "Las mejoras aceptadas están implementadas y verificadas en una corrida posterior."
     },
     {
      "id": "estabilizacion.congelado",
      "nombre": "Versión congelada para lanzamiento",
      "detalle": "Release candidato, notas de versión y acta de cierre firmada."
     }
    ]
   },
   {
    "id": "infraestructura",
    "nombre": "Infraestructura y producción",
    "peso": 2,
    "descripcion": "Lo que tiene que estar en línea y sostenerse solo para que el producto exista de verdad.",
    "requisitos": [
     {
      "id": "infraestructura.produccion",
      "nombre": "Entorno de producción estable",
      "detalle": "Servidor, dominio, HTTPS y datos de producción funcionando."
     },
     {
      "id": "infraestructura.despliegue",
      "nombre": "Despliegue reproducible",
      "detalle": "Publicar una versión nueva es un procedimiento repetible y verificado."
     },
     {
      "id": "infraestructura.respaldo",
      "nombre": "Respaldo y restauración probados",
      "detalle": "Copias automáticas y una restauración ensayada de verdad, no sólo documentada."
     },
     {
      "id": "infraestructura.monitoreo",
      "nombre": "Monitoreo y alertas",
      "detalle": "Se sabe que algo se cayó sin que lo cuente un usuario."
     }
    ]
   },
   {
    "id": "landing",
    "nombre": "Landing page de producto",
    "peso": 1,
    "descripcion": "La página de producto que convierte visitantes en interesados y compradores.",
    "requisitos": [
     {
      "id": "landing.identidad",
      "nombre": "Identidad visual",
      "detalle": "Nombre, logo, paleta, tipografía y reglas de marca."
     },
     {
      "id": "landing.copy",
      "nombre": "Copy y propuesta de valor",
      "detalle": "Titular, propuesta de valor, beneficios, prueba social y llamada a la acción."
     },
     {
      "id": "landing.publicada",
      "nombre": "Landing publicada",
      "detalle": "Dominio, hosting, HTTPS y página en línea de cara al público."
     },
     {
      "id": "landing.analitica",
      "nombre": "Analítica y captación",
      "detalle": "Medición de visitas y conversión, y captura de contactos operativa."
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
      "detalle": "Categoría, competidores y por qué este producto es distinto."
     },
     {
      "id": "genoma.audiencia",
      "nombre": "Audiencias y buyer persona",
      "detalle": "Segmentos, dolores, objeciones y disparadores de compra."
     },
     {
      "id": "genoma.mensajes",
      "nombre": "Matriz de mensajes",
      "detalle": "Mensaje maestro y variantes por segmento, canal e idioma."
     },
     {
      "id": "genoma.canales",
      "nombre": "Canales, calendario y presupuesto",
      "detalle": "Canales priorizados, calendario de contenidos y cuánto se invierte."
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
    "descripcion": "Salida pública del producto.",
    "requisitos": [
     {
      "id": "publicacion.anuncio",
      "nombre": "Anuncio de lanzamiento",
      "detalle": "Nota de lanzamiento y publicaciones en los canales elegidos."
     },
     {
      "id": "publicacion.presencia",
      "nombre": "Presencia pública y directorios",
      "detalle": "Web pública, perfiles y alta en los directorios donde busca el cliente."
     },
     {
      "id": "publicacion.disponible",
      "nombre": "Producto disponible para usuarios reales",
      "detalle": "Cualquiera del público objetivo puede entrar y usarlo sin intervención del equipo."
     },
     {
      "id": "publicacion.soporte",
      "nombre": "Soporte y documentación pública",
      "detalle": "Canal de soporte atendido y documentación accesible al usuario final."
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
      "detalle": "Pasarela, contrato y facturación probados con una transacción real."
     },
     {
      "id": "venta.primera_venta",
      "nombre": "Primera venta cerrada",
      "detalle": "Al menos una venta real cobrada y registrada."
     },
     {
      "id": "venta.seguimiento",
      "nombre": "Seguimiento comercial",
      "detalle": "Registro de ventas, ingresos, renovaciones y siguientes pasos comerciales."
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
   "id": "fieldops",
   "nombre": "Konopy FieldOps",
   "ticker": "",
   "descripcion": "Software de operación de campo para empresas de construcción: jornada del trabajador con foto y GPS, compras, comisiones, facturas, contratos con firma y reportes. Laravel 12 sobre hosting compartido, PWA y app nativa Android.",
   "estado": "en_pruebas",
   "responsable": "Arthuro",
   "equipo": [
    "Arthuro",
    "Konopy Dev",
    "Codex",
    "Claude",
    "Marketing"
   ],
   "repositorio": "https://github.com/konopy/FieldOps",
   "fecha_inicio": "2026-06-15",
   "fecha_objetivo": null,
   "fecha_fin": null,
   "estimacion_inicial_dias": null,
   "estimaciones": [],
   "tareas": [
    {
     "id": "t-001",
     "titulo": "Ficha de producto (README + CLAUDE.md)",
     "fase": "definicion",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Arthuro",
     "vence": "",
     "notas": "",
     "requisito": "definicion.ficha"
    },
    {
     "id": "t-002",
     "titulo": "Alcance y entregables (ROADMAP v2 + backlog)",
     "fase": "definicion",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Arthuro",
     "vence": "",
     "notas": "",
     "requisito": "definicion.alcance"
    },
    {
     "id": "t-003",
     "titulo": "Criterios de cierre v1 (cero P0/P1, respaldo restaurable, deploy reproducible, monitoreo)",
     "fase": "definicion",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Arthuro",
     "vence": "",
     "notas": "",
     "requisito": "definicion.criterios"
    },
    {
     "id": "t-004",
     "titulo": "Fijar fecha objetivo de cierre v1 y del plan de mercado EE. UU.",
     "fase": "definicion",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "Arthuro",
     "vence": "",
     "notas": "El proyecto no tiene fecha objetivo declarada: sin ella el dashboard no puede calcular desvío.",
     "requisito": "definicion.calendario",
     "estimacion_dias": 1
    },
    {
     "id": "t-010",
     "titulo": "Entorno reproducible, repositorio y guía de instalación",
     "fase": "desarrollo",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Konopy Dev",
     "vence": "",
     "notas": "",
     "requisito": "desarrollo.entorno"
    },
    {
     "id": "t-011",
     "titulo": "Núcleo funcional: fases 1–19 del roadmap completadas",
     "fase": "desarrollo",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Konopy Dev",
     "vence": "",
     "notas": "Jornada del trabajador, compras y comisiones, facturas y PDF, multiempresa, contratos con firma, estimador de planos y reportes. El núcleo queda en curso hasta cerrar el plan de mercado EE. UU. (tareas C1–C5 y X1–X7), que es lo que falta para poder venderlo allí.",
     "requisito": "desarrollo.nucleo"
    },
    {
     "id": "t-012",
     "titulo": "Suite de pruebas del flujo crítico (205+ pruebas)",
     "fase": "desarrollo",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Konopy Dev",
     "vence": "",
     "notas": "",
     "requisito": "desarrollo.pruebas"
    },
    {
     "id": "t-013",
     "titulo": "Manuales por rol y documentación de despliegue",
     "fase": "desarrollo",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Konopy Dev",
     "vence": "",
     "notas": "Manuales de trabajador, PM/foreman, admin/office, superadmin y soporte/deploy.",
     "requisito": "desarrollo.documentacion"
    },
    {
     "id": "t-014",
     "titulo": "Revisión de seguridad y cumplimiento",
     "fase": "desarrollo",
     "estado": "en_progreso",
     "prioridad": "alta",
     "responsable": "Konopy Dev",
     "vence": "",
     "notas": "Base de seguridad hecha (headers, CSRF, RBAC, throttle). Faltan 2FA para ADMIN/OFFICE (X5) y ToS/Privacy (X7).",
     "requisito": "desarrollo.revision",
     "estimacion_dias": 3
    },
    {
     "id": "t-020",
     "titulo": "C1 · Overtime 1.5× (FLSA) en la nómina",
     "fase": "desarrollo",
     "estado": "en_progreso",
     "prioridad": "alta",
     "responsable": "Claude",
     "vence": "",
     "notas": "Implementado en el PR #38 del 3 de septiembre; el plan todavía lo marca EN CURSO. Confirmar si se puede cerrar.",
     "estimacion_dias": 3,
     "requisito": "desarrollo.nucleo"
    },
    {
     "id": "t-021",
     "titulo": "C2 · Lien waivers de Texas",
     "fase": "desarrollo",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "Claude",
     "vence": "",
     "notas": "",
     "estimacion_dias": 4,
     "requisito": "desarrollo.nucleo"
    },
    {
     "id": "t-022",
     "titulo": "C3 · Lenguaje del cierre automático",
     "fase": "desarrollo",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "Claude",
     "vence": "",
     "notas": "",
     "estimacion_dias": 2,
     "requisito": "desarrollo.nucleo"
    },
    {
     "id": "t-023",
     "titulo": "C4 · Consentimiento del trabajador",
     "fase": "desarrollo",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "Claude",
     "vence": "",
     "notas": "",
     "estimacion_dias": 2,
     "requisito": "desarrollo.nucleo"
    },
    {
     "id": "t-024",
     "titulo": "C5 · Daily log que protege: clima, headcount y delays",
     "fase": "desarrollo",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "Claude",
     "vence": "",
     "notas": "",
     "estimacion_dias": 3,
     "requisito": "desarrollo.nucleo"
    },
    {
     "id": "t-030",
     "titulo": "X1 · QuickBooks Online fase 1",
     "fase": "desarrollo",
     "estado": "en_progreso",
     "prioridad": "alta",
     "responsable": "Codex",
     "vence": "",
     "notas": "Ya asignada, en curso según el plan maestro.",
     "estimacion_dias": 5,
     "requisito": "desarrollo.nucleo"
    },
    {
     "id": "t-031",
     "titulo": "X2 · Conciliación bancaria por CSV",
     "fase": "desarrollo",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "Codex",
     "vence": "",
     "notas": "Va después de X1.",
     "estimacion_dias": 4,
     "requisito": "desarrollo.nucleo"
    },
    {
     "id": "t-032",
     "titulo": "X3 · Retainage + Pay Application (AIA G702/G703)",
     "fase": "desarrollo",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "Codex",
     "vence": "",
     "notas": "La más importante del plan: sin esto no se factura a un GC comercial en EE. UU.",
     "estimacion_dias": 8,
     "requisito": "desarrollo.nucleo"
    },
    {
     "id": "t-033",
     "titulo": "X4 · Subcontratistas: W-9, 1099-NEC y rastreo de COI",
     "fase": "desarrollo",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "Codex",
     "vence": "",
     "notas": "",
     "estimacion_dias": 5,
     "requisito": "desarrollo.nucleo"
    },
    {
     "id": "t-034",
     "titulo": "X5 · 2FA para usuarios ADMIN/OFFICE",
     "fase": "desarrollo",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "Codex",
     "vence": "",
     "notas": "",
     "estimacion_dias": 3,
     "requisito": "desarrollo.nucleo"
    },
    {
     "id": "t-035",
     "titulo": "X6 · Export total por empresa",
     "fase": "desarrollo",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "Codex",
     "vence": "",
     "notas": "",
     "estimacion_dias": 3,
     "requisito": "desarrollo.nucleo"
    },
    {
     "id": "t-036",
     "titulo": "X7 · Páginas de Términos y Privacidad",
     "fase": "desarrollo",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "Codex",
     "vence": "",
     "notas": "",
     "estimacion_dias": 2,
     "requisito": "desarrollo.nucleo"
    },
    {
     "id": "t-040",
     "titulo": "Tablero de proyectos: arrastrar y soltar",
     "fase": "desarrollo",
     "estado": "pendiente",
     "prioridad": "baja",
     "responsable": "",
     "vence": "",
     "notas": "Único pendiente del tablero; el resto está hecho.",
     "estimacion_dias": 2
    },
    {
     "id": "t-041",
     "titulo": "Webhook a GoHighLevel al cambiar de estado un proyecto",
     "fase": "desarrollo",
     "estado": "pendiente",
     "prioridad": "baja",
     "responsable": "",
     "vence": "",
     "notas": "",
     "estimacion_dias": 2
    },
    {
     "id": "t-042",
     "titulo": "Notificaciones por WhatsApp",
     "fase": "desarrollo",
     "estado": "pendiente",
     "prioridad": "baja",
     "responsable": "",
     "vence": "",
     "notas": "",
     "estimacion_dias": 3
    },
    {
     "id": "t-050",
     "titulo": "Plan de pruebas de Fase 20: guion, prevuelo y acta",
     "fase": "corridas_frio",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Arthuro",
     "vence": "",
     "notas": "",
     "requisito": "corridas_frio.plan"
    },
    {
     "id": "t-051",
     "titulo": "Dry-run automatizado del guion de Fase 20",
     "fase": "corridas_frio",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Claude",
     "vence": "",
     "notas": "Ejecutado el 4 de agosto: los tres recorridos completan su columna vertebral.",
     "requisito": "corridas_frio.ensayo"
    },
    {
     "id": "t-052",
     "titulo": "Prueba de usabilidad con 2–3 usuarios reales (WORKER, PM y OFFICE)",
     "fase": "corridas_frio",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "Arthuro",
     "vence": "",
     "notas": "Es el pendiente que bloquea el cierre v1: hay guion y acta preparados, pero no se ha ejecutado.",
     "requisito": "corridas_frio.reales",
     "estimacion_dias": 2
    },
    {
     "id": "t-053",
     "titulo": "Validación en teléfonos reales: cámara, GPS, sin conexión, passkeys/Face ID y PIN",
     "fase": "corridas_frio",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "Arthuro",
     "vence": "",
     "notas": "El ensayo automatizado no pudo cubrirlo: requiere hardware.",
     "requisito": "corridas_frio.reales",
     "estimacion_dias": 1
    },
    {
     "id": "t-060",
     "titulo": "Reportes de frío de las corridas y auditorías",
     "fase": "estabilizacion",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Claude",
     "vence": "",
     "notas": "",
     "requisito": "estabilizacion.reportes"
    },
    {
     "id": "t-061",
     "titulo": "Cerrar los hallazgos P0/P1 que salgan de la prueba real",
     "fase": "estabilizacion",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "Konopy Dev",
     "vence": "",
     "notas": "Depende de que se ejecute la prueba de usabilidad (t-052).",
     "requisito": "estabilizacion.hallazgos",
     "estimacion_dias": 4
    },
    {
     "id": "t-062",
     "titulo": "Aplicar las mejoras del dry-run y de la auditoría UX",
     "fase": "estabilizacion",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Konopy Dev",
     "vence": "",
     "notas": "Flotantes que tapaban formularios y secuencia PM sin doble aprobación: corregidos y recompilados.",
     "requisito": "estabilizacion.mejoras"
    },
    {
     "id": "t-063",
     "titulo": "Congelar la v1 y firmar el acta GO/NO-GO",
     "fase": "estabilizacion",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "Arthuro",
     "vence": "",
     "notas": "",
     "requisito": "estabilizacion.congelado",
     "estimacion_dias": 1
    },
    {
     "id": "t-070",
     "titulo": "Producción en ops.konopy.com (Hostinger compartido)",
     "fase": "infraestructura",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Konopy Dev",
     "vence": "",
     "notas": "",
     "requisito": "infraestructura.produccion"
    },
    {
     "id": "t-071",
     "titulo": "Despliegue reproducible con deploy.sh y smoke obligatorio",
     "fase": "infraestructura",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Konopy Dev",
     "vence": "",
     "notas": "",
     "requisito": "infraestructura.despliegue"
    },
    {
     "id": "t-072",
     "titulo": "Respaldo ops:backup y ensayo de restauración",
     "fase": "infraestructura",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Konopy Dev",
     "vence": "",
     "notas": "Restauración verificada en base aislada (44 tablas) y archivos comparados 1:1.",
     "requisito": "infraestructura.respaldo"
    },
    {
     "id": "t-073",
     "titulo": "Monitoreo: /up y monitor programado cada 15 minutos",
     "fase": "infraestructura",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Konopy Dev",
     "vence": "",
     "notas": "",
     "requisito": "infraestructura.monitoreo"
    },
    {
     "id": "t-074",
     "titulo": "Automatizar la copia off-site del respaldo",
     "fase": "infraestructura",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "Konopy Dev",
     "vence": "",
     "notas": "Señalado en las recomendaciones de cierre v1: hoy el off-site no está automatizado.",
     "estimacion_dias": 2
    },
    {
     "id": "t-075",
     "titulo": "Conectar Hermes/Open WebUI en producción (HTTPS válido, API key, modelo aprobado)",
     "fase": "infraestructura",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "Arthuro",
     "vence": "",
     "notas": "Objetivo final de la Fase 20; hoy la IA en producción depende de esto.",
     "estimacion_dias": 2
    },
    {
     "id": "t-080",
     "titulo": "Identidad de marca Konopy FieldOps",
     "fase": "landing",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Marketing",
     "vence": "",
     "notas": "Reglas de marca fijadas: siempre 'Konopy FieldOps', nunca las mitades por separado.",
     "requisito": "landing.identidad"
    },
    {
     "id": "t-081",
     "titulo": "Copy y propuesta de valor de la landing (EN/ES)",
     "fase": "landing",
     "estado": "hecha",
     "prioridad": "media",
     "responsable": "Marketing",
     "vence": "",
     "notas": "Redactada en docs/marketing/landing-konopy-fieldops.html a partir del mensaje central.",
     "requisito": "landing.copy"
    },
    {
     "id": "t-082",
     "titulo": "C6 · Publicar la landing nueva",
     "fase": "landing",
     "estado": "pendiente",
     "prioridad": "media",
     "responsable": "Claude",
     "vence": "",
     "notas": "El plan la deja para el final, cuando las funciones del mercado EE. UU. estén vivas.",
     "requisito": "landing.publicada",
     "estimacion_dias": 3
    },
    {
     "id": "t-090",
     "titulo": "Posicionamiento y estudio competitivo (ago-2026)",
     "fase": "genoma_marketing",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Marketing",
     "vence": "",
     "notas": "",
     "requisito": "genoma.posicionamiento"
    },
    {
     "id": "t-091",
     "titulo": "Audiencia y buyer persona: subcontratistas de acero de 5–50 trabajadores en Texas",
     "fase": "genoma_marketing",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Marketing",
     "vence": "",
     "notas": "",
     "requisito": "genoma.audiencia"
    },
    {
     "id": "t-092",
     "titulo": "Matriz de mensajes bilingüe: one-pager, anuncios sociales, guion de demo y secuencias GHL",
     "fase": "genoma_marketing",
     "estado": "hecha",
     "prioridad": "alta",
     "responsable": "Marketing",
     "vence": "",
     "notas": "",
     "requisito": "genoma.mensajes"
    },
    {
     "id": "t-093",
     "titulo": "Canales, calendario y presupuesto",
     "fase": "genoma_marketing",
     "estado": "en_progreso",
     "prioridad": "media",
     "responsable": "Marketing",
     "vence": "",
     "notas": "Los canales están definidos (GHL, social, demo); falta el calendario de publicación y el presupuesto.",
     "requisito": "genoma.canales",
     "estimacion_dias": 2
    }
   ],
   "corridas_frio": [
    {
     "id": "cf-01",
     "fecha": "2026-08-04",
     "tipo": "ensayo interno",
     "objetivo": "Dry-run automatizado del guion de Fase 20 con los tres recorridos: trabajador, PM y oficina.",
     "resultado": "con_incidencias",
     "metricas": {
      "recorridos": 3,
      "hallazgos": 4,
      "p2": 2,
      "p3": 2
     },
     "incidencias": [
      "El botón flotante '+' y el de 'Acciones' se superponen y tapan 'Confirmar SALIDA' del trabajador (P2).",
      "Los flotantes del tema admin tapan el checkbox 'Convertir en extra facturable' del PM (P2)."
     ],
     "notas": "Decisión: GO para la prueba real, condicionado a arreglar las dos superposiciones. Quedó diferido a la prueba real todo lo que necesita hardware: cámara, GPS, huella/Face ID, modo avión y lectura de recibo con IA."
    }
   ],
   "reportes_frio": [
    {
     "id": "rf-01",
     "fecha": "2026-07-28",
     "autor": "Claude",
     "conclusion": "Auditoría de UX y navegabilidad sobre actividades. Ver docs/AUDITORIA-UX-NAVEGABILIDAD-ACTIVIDADES-2026-07-28.md.",
     "hallazgos": [
      {
       "id": "h-01",
       "titulo": "El icono 'Campo' no muestra contador de pendientes para el rol OFFICE",
       "severidad": "baja",
       "impacto": "OFFICE puede revisar pendientes pero no ve que los tiene.",
       "mejora_propuesta": "Incluir OFFICE en el composer que calcula el badge de pendientes.",
       "estado": "abierto",
       "tarea": ""
      }
     ]
    },
    {
     "id": "rf-02",
     "fecha": "2026-07-28",
     "autor": "Claude",
     "conclusion": "Recomendaciones profesionales para el cierre v1: el código está fuerte; lo que impide el GO es un defecto de secuencia en el flujo del PM y que los recorridos humanos no se han ejecutado ni registrado.",
     "hallazgos": [
      {
       "id": "h-02",
       "titulo": "Doble aprobación del mismo extra: aprobar la actividad no aprueba el change order",
       "severidad": "critica",
       "impacto": "El PM introduce el mismo monto dos veces y el guion de prueba habría fallado en su checkpoint principal.",
       "mejora_propuesta": "Revisar, corregir y aprobar el change order desde un solo formulario, que abra la factura con la línea prellenada.",
       "estado": "cerrado",
       "tarea": "t-062"
      },
      {
       "id": "h-03",
       "titulo": "'Probar IA' sólo prueba texto y acepta http:// sin cifrar",
       "severidad": "alta",
       "impacto": "Falso positivo: la prueba pasa y la visión falla en obra.",
       "mejora_propuesta": "Sonda de visión en la prueba de IA y exigir HTTPS.",
       "estado": "cerrado",
       "tarea": ""
      },
      {
       "id": "h-04",
       "titulo": "Formularios largos densos sin bloques visuales",
       "severidad": "media",
       "impacto": "Fricción que la prueba de usabilidad anotará como P2/P3.",
       "mejora_propuesta": "Aplicar el patrón de bloques ya existente a los 3-4 formularios más densos.",
       "estado": "abierto",
       "tarea": ""
      },
      {
       "id": "h-05",
       "titulo": "Restauración off-site sin automatizar y acta de cierre en blanco",
       "severidad": "alta",
       "impacto": "Bloquea firmar el GO de la v1.",
       "mejora_propuesta": "Automatizar la copia off-site y levantar el acta tras la prueba real.",
       "estado": "abierto",
       "tarea": "t-074"
      }
     ]
    },
    {
     "id": "rf-03",
     "fecha": "2026-08-04",
     "corrida": "cf-01",
     "autor": "Claude",
     "conclusion": "Los tres recorridos completan su columna vertebral sin ayuda. GO para la prueba real tras arreglar las dos superposiciones de botones flotantes.",
     "hallazgos": [
      {
       "id": "h-06",
       "titulo": "F20-01 · Los flotantes tapan 'Confirmar SALIDA' del trabajador",
       "severidad": "media",
       "impacto": "Toca justo el botón de salida, que es lo que mide la prueba.",
       "mejora_propuesta": "Dejar un solo botón flotante en esa esquina.",
       "estado": "cerrado",
       "tarea": "t-062"
      },
      {
       "id": "h-07",
       "titulo": "F20-02 · Los flotantes del tema admin tapan el checkbox de decisión del PM",
       "severidad": "media",
       "impacto": "Estorba sobre los CTA del final de las tarjetas.",
       "mejora_propuesta": "Subir el z-order del contenido o reposicionar los flotantes.",
       "estado": "cerrado",
       "tarea": "t-062"
      },
      {
       "id": "h-08",
       "titulo": "F20-04 · Un borrador offline viejo puede adjuntar su foto a una actividad nueva con el mismo id",
       "severidad": "baja",
       "impacto": "Sólo ocurre en local por reseeds; en producción los ids no se reutilizan.",
       "mejora_propuesta": "Incluir un sello de fecha en la clave del borrador.",
       "estado": "abierto",
       "tarea": ""
      }
     ]
    },
    {
     "id": "rf-04",
     "fecha": "2026-09-03",
     "autor": "Auditoría de mercado EE. UU.",
     "conclusion": "El núcleo es competitivo, pero falta la capa contractual y legal americana alrededor del dinero. Sin ella no se puede vender a subcontratistas comerciales en Texas.",
     "hallazgos": [
      {
       "id": "h-10",
       "titulo": "La nómina paga horas × tarifa plana, sin overtime 1.5× tras 40 h (FLSA)",
       "severidad": "critica",
       "impacto": "Riesgo legal activo, y el propio sistema documenta la infracción con selfie y GPS.",
       "mejora_propuesta": "Calcular el excedente semanal a 1.5× y desglosarlo en la nómina y el cheque.",
       "estado": "en_progreso",
       "tarea": "t-020"
      },
      {
       "id": "h-11",
       "titulo": "No existen pay applications (AIA G702/G703) ni retainage",
       "severidad": "alta",
       "impacto": "Así se factura la construcción comercial en EE. UU.; el módulo actual es residencial.",
       "mejora_propuesta": "Módulo de retainage y pay application sobre el flujo de facturas existente.",
       "estado": "abierto",
       "tarea": "t-032"
      },
      {
       "id": "h-12",
       "titulo": "No hay lien waivers de Texas",
       "severidad": "alta",
       "impacto": "El intercambio cobro↔waiver es ritual de cada pago; sin él no se cobra.",
       "mejora_propuesta": "Generar y firmar los waivers junto al cobro.",
       "estado": "abierto",
       "tarea": "t-021"
      },
      {
       "id": "h-13",
       "titulo": "Sin W-9 / 1099-NEC para subcontratistas ni rastreo de COI",
       "severidad": "alta",
       "impacto": "Obligación fiscal y de seguro sin cubrir.",
       "mejora_propuesta": "Alta de subcontratista con W-9, emisión de 1099 y vencimiento del COI.",
       "estado": "abierto",
       "tarea": "t-033"
      },
      {
       "id": "h-14",
       "titulo": "Sin 2FA para ADMIN/OFFICE",
       "severidad": "media",
       "impacto": "Cuentas con acceso al dinero protegidas sólo por contraseña.",
       "mejora_propuesta": "Segundo factor obligatorio para esos roles.",
       "estado": "abierto",
       "tarea": "t-034"
      },
      {
       "id": "h-15",
       "titulo": "Sin Términos ni Política de Privacidad publicados",
       "severidad": "media",
       "impacto": "No se puede vender software a una empresa sin términos.",
       "mejora_propuesta": "Páginas legales bilingües servidas por la app y aceptación con sello de tiempo.",
       "estado": "abierto",
       "tarea": "t-036"
      },
      {
       "id": "h-16",
       "titulo": "El daily report no protege en un claim: faltan clima, headcount y delays",
       "severidad": "media",
       "impacto": "La evidencia de obra no sirve como defensa documental.",
       "mejora_propuesta": "Añadir clima, headcount y retrasos al parte diario.",
       "estado": "abierto",
       "tarea": "t-024"
      },
      {
       "id": "h-17",
       "titulo": "Sin exportación total de los datos de una empresa",
       "severidad": "baja",
       "impacto": "Es requisito de confianza para un comprador empresarial.",
       "mejora_propuesta": "Export completo por empresa bajo demanda.",
       "estado": "abierto",
       "tarea": "t-035"
      }
     ]
    }
   ],
   "bitacora": [
    {
     "fecha": "2026-06-15",
     "horas": 9.0,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "feat: Fase 14 — geocerca de obra (fichaje en sitio) + aviso de jornada sin cerrar",
      "feat: Fase 13 — puestos/cargos editables por empresa, asignables a trabajadores",
      "feat: nav con iconos + tooltip + submenú Configuraciones del superusuario",
      "fix: firma pública de contrato daba 500 (auth()->user() es null sin sesión)",
      "feat: marca por empresa en PDF (encabezado + logo) y nombre de archivo por empresa",
      "lo que cambiaste",
      "FieldOps full codebase - server version with all fixes"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-06-16",
     "horas": 9.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "chore: deploy.sh versionado (pull + composer + migrate --force + cachés)",
      "chore: dejar de versionar .phpunit.result.cache (caché transitoria de tests)",
      "feat: autocompletar cliente en el contrato + rellena la contraparte al elegir",
      "test: recorrido del superusuario en empresa activa (aislamiento end-to-end)",
      "feat: autocompletar también en PM (proyecto y wizard) + cliente del wizard",
      "feat: autocompletar campos que apuntan a la BD (cliente) + endpoint de búsqueda",
      "feat: change order editable + botón Facturar; guard de empresa activa (super)",
      "fix: aislamiento multi-empresa — escribir en la empresa ACTIVA, no en la del usuario"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-06-17",
     "horas": 6.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat: UX4 — panel accionable (\"requiere tu atención\") + migas de pan",
      "feat: UX3 — formularios cortos (revelación progresiva)",
      "feat: UX2 — proyecto como centro de mando con pestañas",
      "feat: UX1 — búsqueda global ⌘K (paleta de comandos)"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-06-18",
     "horas": 3.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat: Novedades — modal automático estilo Chrome (al entrar tras una actualización)",
      "feat: UX5 — \"Novedades\" (what's new) in-app, estilo Chrome"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-06-19",
     "horas": 9.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat: buscador global más claro — agrupado por tipo, por empresa, + órdenes de compra",
      "feat: IA por empresa (BYO key, OpenAI o Anthropic) — Konopy no paga la IA de todos",
      "feat: geocerca integrada en el sitio (app nativa) + IA avisa cuando no está configurada",
      "docs: checklist para compilar/probar la app Android (Fase 18)",
      "fix: hora local por empresa — las marcas se guardan en UTC y se muestran en su zona",
      "feat: Fase 18 (servidor + scaffold) — API de fichaje automático por geocerca + app Capacitor",
      "fix: Notifier setea company_id explícito (cron CLI) + bump guzzle (CVE-2026-55568)"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-06-20",
     "horas": 9.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat: QR en /app para instalar la app escaneando desde otro teléfono",
      "feat: descarga de la app Android desde el sitio (página pública /app)",
      "fix: el botón '+' flotante también se muestra al superusuario sin empresa activa",
      "ci: despliegue automático a producción por SSH (GitHub Actions) en push a main",
      "docs(native): guía paso a paso para compilar e instalar el APK en Android",
      "feat: Fase 18 — app nativa del fichaje (Capacitor) con geocerca en 2.º plano",
      "feat: chat en facturas + navegación móvil con accesos + botón de creación único",
      "feat: nombre de empresa en factura y change order (solo superusuario)"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-06-21",
     "horas": 3.0,
     "personas": 1,
     "fase": "infraestructura",
     "elaborado": [
      "fix: deploy.sh ahora incluye npm ci + npm run build (Vite assets)",
      "docs: agregar seccion build por terminal en INSTALL-ANDROID.md"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-06-23",
     "horas": 9.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat(fab): rediseño de botones flotantes según spec del usuario",
      "fix(audit): pluralizar 'artículo', truncar enlace de trabajador + copiar, 'Encargado del proyecto'",
      "fix: atajo ⇧⌘E del selector de empresa en JS plano (Alpine no matchea shift+letra)",
      "feat: selector de empresa del superusuario (modal + atajo ⇧⌘E + auto-apertura)",
      "fix: deploy.sh descarta cambios locales en public/build antes del git pull",
      "fix: deploy sin compilar assets en el server (sirve public/build versionado)",
      "feat: formulario de Configuración por empresa (IA + correo) + pulido de botones flotantes",
      "chore: tooling del build (Tailwind v4 + assets recompilados) + docs de la app Android"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-06-24",
     "horas": 9.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat(reportes): reporte de Change Orders + aging de facturas + estado vacío de gráfica (Tanda 8)",
      "feat(trabajadores): teléfono/email, revocar+regenerar enlace, total de jornadas (Tanda 7)",
      "feat(gasto-rapido): fecha visible, CTA configurar IA, recordar último proyecto (Tanda 6)",
      "feat: color de identidad por empresa (tiñe el encabezado al operar como esa empresa)",
      "feat(factura): confirmaciones de estado, zona de peligro, nota de CO, 'U'->'Unidad' (Tanda 5)",
      "feat: encabezado crema con empresa activa + Panel clicable (Tanda 4)",
      "feat(buscador): el superusuario busca en TODAS las empresas (no solo la activa)",
      "feat(co): estado inicial al crear change order + reorganizar acciones"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-01",
     "horas": 3.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat(change-order): se marca 'Cobrado' automáticamente al pagar la factura enlazada",
      "security: endurecimiento técnico + mapa de cumplimiento SOC 2 / ISO 27001"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-02",
     "horas": 9.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat: tablero operativo de proyectos por estado + tipo de pago DIARIO en nómina",
      "feat(nómina): pago por PUESTO (rol) con herencia y override individual",
      "fix(ux): alias /estimator → /estimador (typo común)",
      "feat: Fase 19 — Estimador de planos (IA de visión → partidas → cotización)",
      "feat(ux): índice global de Facturas (/facturas) + aterrizar en el Panel tras el login (mejoras P1)",
      "docs: corrida en frío de navegabilidad — puntaje por tarea núcleo + mejoras priorizadas"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-03",
     "horas": 3.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat(estimador): abre PDF de planos en el navegador y elige hojas clave",
      "feat: Tablero v2 (columnas personalizables + ficha con checklist) y hombres/horas en actividad"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-05",
     "horas": 1.5,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat(actividad): total hombres × horas = horas-hombre (en vivo + en revisión y ficha)"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-06",
     "horas": 1.5,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat(nómina): cuadrilla por nombre en actividades → pago semanal + preview antes de generar"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-08",
     "horas": 3.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat(presupuesto): firma electrónica del quote + botón Facturar al aceptar",
      "feat(factura): cliente en la factura (elegir o CREAR al momento) + guardar línea como producto nuevo"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-09",
     "horas": 1.5,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "fix(IA): mostrar la causa real del fallo + botón Probar IA; feat(actividad): material/precio/recibo/facturar y edición del PM"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-10",
     "horas": 9.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat(actividad): el DESPUÉS cierra la actividad + horas al cerrar + control antes/después vs horas reportadas",
      "feat(actividad): agregar fotos del DESPUÉS a actividades de DÍAS ANTERIORES",
      "feat(geocerca): la SALIDA también exige geolocalización (como la entrada)",
      "feat(puestos): 'Líder de cuadrilla (foreman)' — el reporte del equipo es solo suyo",
      "fix(actividad): 'Horas de la actividad' rechazaba valores enteros (5 → 'válidos 4.6 y 5.1')",
      "feat(actividad): bloque 'Tiempo de la actividad' desvinculado de precios (solo registro + nómina)",
      "fix(worker): cargar Alpine en el layout del trabajador — chips de cuadrilla y contador vivos",
      "feat(actividad): puesto en la cuadrilla, sin 'facturar' para el worker, precio=material, fotos ANTES/DESPUÉS"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-13",
     "horas": 1.5,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat(bids): plantilla .xlsx descargable para el importador de estimados"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-15",
     "horas": 1.5,
     "personas": 1,
     "fase": "infraestructura",
     "elaborado": [
      "feat(navegabilidad): P2+P3 aplicadas — factura en 3 clics, aceptar+convertir en 1, breadcrumbs completos; DEPLOY.md actualizado"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-16",
     "horas": 1.5,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "fix(facturas): el cliente se hereda del proyecto en vez de preguntarlo"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-23",
     "horas": 9.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat: complete field change-order flow and worker passkeys",
      "fix(qa): ISSUE-002 — corrige JSON de productos IA",
      "fix(qa): ISSUE-001 — precarga cuadrilla clocked-in",
      "polish(ux): tap targets de 44px + aviso de tamaño en el estimador",
      "feat: páginas de error branded + endurecimiento (traversal, índices, scoping, throttle)",
      "perf+fix: N+1 en dashboard/reportes/finanzas, badge móvil, scoping de FKs y flash global",
      "feat(ui): estandariza profundidad de formularios",
      "feat(ux): aplica navegación por rol y jornada configurable"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-24",
     "horas": 9.0,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "feat: idempotencia en compra, meta e inventario del trabajador",
      "fix: normalize HTTP headers in production smoke",
      "fix: prepare runtime directories in CI",
      "feat: monitor production health after deploy",
      "ci: puerta de calidad antes del deploy (tests PHP + JS + build)",
      "fix: serve PWA manifest with standard MIME",
      "fix: authenticate VPS repository sync",
      "docs: prepare phase 20 production validation"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-25",
     "horas": 1.5,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "Merge pull request #5 from konopy/claude/idempotencia-endpoints-worker"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-28",
     "horas": 9.0,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "feat: show open shift status on workers",
      "feat: autocomplete invoice lines from products",
      "fix: match worker quick action icon",
      "feat: add worker quick action menu",
      "feat: create activity suggestions from search",
      "feat: autocomplete worker activity reports",
      "feat: create inventory items from product photos",
      "feat: select catalog products in worker activity"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-29",
     "horas": 9.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat: polish superadmin management screens",
      "feat: polish bid and contract workflows",
      "feat: polish project board and quick ficha",
      "feat: polish settings roles and document sending",
      "feat: polish finance payroll and notification screens",
      "fix: redirect english product import url",
      "feat: polish detail and reporting screens",
      "feat: polish master data forms"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-07-30",
     "horas": 7.5,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat: trace change order invoice lines to field reports",
      "feat: bill change orders as invoice lines",
      "fix: render redesigned lists from collections",
      "feat: polish auth and profile screens",
      "feat: polish bid and contract forms"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-04",
     "horas": 9.0,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "docs: estudio competitivo del mercado field-ops (ago-2026)",
      "feat: resolve notifications to source records",
      "feat: add management decision links to dashboard",
      "feat: make project analytics actionable",
      "feat: link management reports to source records",
      "chore: recompilar assets (pb-48/pb-44 de los arreglos de flotantes)",
      "fix: app 100% bilingüe (892 traducciones EN) + flotantes no tapan formularios",
      "docs: resultados del dry-run F20 (ensayo de usabilidad local)"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-05",
     "horas": 9.0,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "feat: add quick previews to sales lists",
      "feat: preview invoice line items in lists",
      "feat: make weekly payroll review actionable",
      "fix: ancla #goal-{id} al loop de metas (estaba en el loop de COs)",
      "Merge remote-tracking branch 'origin/main' into codex/linkable-management-reports",
      "Merge remote-tracking branch 'origin/main' into codex/project-health-status"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-06",
     "horas": 9.0,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "feat: auditoría de rutas por rol (guardia anti-500) + 5 manuales de usuario",
      "feat: create projects from quick expenses",
      "feat: reduce friction in quick entry flows",
      "feat: streamline project and invoice setup"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-07",
     "horas": 1.5,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "fix: open PDFs reliably in app"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-10",
     "horas": 4.5,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "chore: recompilar assets de los fixes",
      "fix: allow long invoice item descriptions"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-13",
     "horas": 1.5,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat: polish mobile quote lines and document sharing"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-15",
     "horas": 1.5,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat: clarify project change order billing flow"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-16",
     "horas": 3.0,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat: add sticky invoice summary bar",
      "feat: add unbilled receipts to invoice flow"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-17",
     "horas": 6.0,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "fix: prevent mobile floaters overlapping invoice summary",
      "chore: recompilar assets del relevo"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-18",
     "horas": 6.0,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "fix: traducciones EN del visor de PDF en app (guardia de cobertura)",
      "fix: add app-safe invoice pdf viewer",
      "feat: improve mobile form ergonomics"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-22",
     "horas": 9.0,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "docs: kit completo de marketing de Konopy FieldOps (bilingüe EN/ES)",
      "chore: recompilar assets del relevo",
      "feat: clarify worker pay inherited from positions",
      "fix: show newest invoices first",
      "feat: add monthly project billing closeout",
      "feat: add project reading and invoice line review"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-23",
     "horas": 4.5,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "chore: recompilar assets del relevo",
      "feat: add monthly activity review pdf"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-24",
     "horas": 9.0,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "feat: add subcontractor payment flow from paid invoices",
      "feat: show dates on invoice billable selections",
      "fix: stabilize monthly activity pdf export",
      "chore: recompilar assets del relevo",
      "fix: informe EN resiliente — restaura idioma con finally y degrada sin columnas _en",
      "feat: generate activity reports in english",
      "fix: open activity review pdf in app",
      "feat: include activity photo thumbnails in monthly pdf"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-26",
     "horas": 1.5,
     "personas": 1,
     "fase": "desarrollo",
     "elaborado": [
      "feat: protect invoice and quote edits with local drafts"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-27",
     "horas": 7.5,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "chore: recompilar assets tras el revert",
      "Revert \"feat: sitio público de Blossom Exteriors con leads hacia GoHighLevel\"",
      "feat: sitio público de Blossom Exteriors con leads hacia GoHighLevel"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-08-28",
     "horas": 6.0,
     "personas": 2,
     "fase": "desarrollo",
     "elaborado": [
      "feat: reenvío automático de reportes en cola + Probar IA con sonda de visión",
      "feat: libro de banco operativo (entradas/salidas pagadas con saldo corrido)"
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    },
    {
     "fecha": "2026-09-03",
     "horas": 3.0,
     "personas": 2,
     "fase": "genoma_marketing",
     "elaborado": [
      "feat: overtime FLSA 1.5x en nómina + plan maestro mercado EE. UU."
     ],
     "notas": "Días y trabajo tomados del historial de git; las horas son una estimación por número de commits."
    }
   ],
   "riesgos": [
    {
     "id": "r-01",
     "titulo": "La prueba de usabilidad con usuarios reales sigue sin ejecutarse y bloquea el cierre v1",
     "probabilidad": "alta",
     "impacto": "alto",
     "mitigacion": "Sentar a un WORKER, un PM y una persona de OFFICE con el guion ya escrito y levantar el acta.",
     "estado": "abierto"
    },
    {
     "id": "r-02",
     "titulo": "Falta la capa contractual americana (pay app, retainage, lien waivers, W-9/COI)",
     "probabilidad": "alta",
     "impacto": "alto",
     "mitigacion": "Ejecutar el plan de mercado EE. UU. en el orden acordado: C1 → X1 → X3 → C2.",
     "estado": "abierto"
    },
    {
     "id": "r-03",
     "titulo": "Toda la fase comercial está sin planificar: no hay precio, ni medio de cobro, ni primera venta",
     "probabilidad": "alta",
     "impacto": "alto",
     "mitigacion": "Definir oferta y precio antes de terminar el plan EE. UU., no después.",
     "estado": "abierto"
    },
    {
     "id": "r-04",
     "titulo": "El proyecto no tiene fecha objetivo declarada",
     "probabilidad": "alta",
     "impacto": "medio",
     "mitigacion": "Fijar fecha de cierre v1 y de las tareas del plan (t-004).",
     "estado": "abierto"
    }
   ],
   "resultado_final": {
    "landing_page": {
     "estado": "en_progreso",
     "url": "",
     "fecha": null,
     "notas": "La landing está redactada (docs/marketing/landing-konopy-fieldops.html) pero no publicada: el plan la deja para el final."
    },
    "genoma_marketing": {
     "estado": "en_progreso",
     "url": "",
     "fecha": null,
     "notas": "Kit bilingüe completo: mensaje central, one-pager, anuncios sociales, guion de demo, secuencias GHL y plantilla de caso de éxito. Faltan KPIs, calendario y presupuesto."
    },
    "publicacion": {
     "estado": "pendiente",
     "url": "https://ops.konopy.com",
     "fecha": null,
     "notas": "La aplicación corre en producción, pero no hay anuncio, ni presencia pública, ni alta abierta para usuarios que no sean del equipo."
    },
    "venta": {
     "estado": "pendiente",
     "fecha_primera_venta": null,
     "unidades_vendidas": 0,
     "ingresos": 0,
     "moneda": "USD",
     "notas": "Sin precio público por decisión de marca: se habla en la demo. No hay precio definido, ni medio de cobro, ni venta registrada."
    }
   }
  },
  {
   "id": "indigo",
   "nombre": "Indigo",
   "ticker": "",
   "descripcion": "Proyecto de figuras 3D. Hoy el repositorio sólo tiene el README con la frase «3d figures»: no hay definición escrita, ni código, ni actividad desde el 25 de junio.",
   "estado": "planificado",
   "responsable": "Arthuro",
   "equipo": [],
   "repositorio": "https://github.com/konopy/indigo",
   "fecha_inicio": "2026-06-24",
   "fecha_objetivo": null,
   "fecha_fin": null,
   "estimacion_inicial_dias": null,
   "estimaciones": [],
   "tareas": [
    {
     "id": "t-001",
     "titulo": "Definir qué es Indigo: producto, alcance y público",
     "fase": "definicion",
     "requisito": "definicion.ficha",
     "estado": "pendiente",
     "prioridad": "alta",
     "responsable": "Arthuro",
     "estimacion_dias": 1,
     "vence": "",
     "notas": "Sin esto no se puede planificar nada más. Dime en dos líneas qué es Indigo y lo desarrollo entero en el dashboard."
    }
   ],
   "corridas_frio": [],
   "reportes_frio": [],
   "bitacora": [
    {
     "fecha": "2026-06-24",
     "horas": 1,
     "personas": 1,
     "fase": "definicion",
     "elaborado": [
      "Initial commit: creación del repositorio"
     ],
     "notas": "Tomado del historial de git; horas estimadas."
    },
    {
     "fecha": "2026-06-25",
     "horas": 1,
     "personas": 1,
     "fase": "definicion",
     "elaborado": [
      "first commit: README con «3d figures»"
     ],
     "notas": "Tomado del historial de git; horas estimadas."
    }
   ],
   "riesgos": [
    {
     "id": "r-01",
     "titulo": "Proyecto parado desde el 25 de junio y sin definición escrita",
     "probabilidad": "alta",
     "impacto": "medio",
     "mitigacion": "Escribir la ficha del proyecto o pausarlo formalmente para que no ensucie la cartera.",
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
