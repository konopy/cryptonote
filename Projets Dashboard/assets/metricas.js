/*
 * Projets Dashboard - motor de metricas
 * Sin dependencias. Se usa desde el navegador (assets/app.js).
 * Todo lo que el panel muestra se calcula aqui, a partir del JSON del proyecto
 * y del modelo canonico data/pipeline.json.
 */
(function (global) {
  'use strict';

  var DIA_MS = 86400000;
  var ORDEN_PRIORIDAD = { alta: 0, media: 1, baja: 2 };
  var ORDEN_SEVERIDAD = { critica: 0, alta: 1, media: 2, baja: 3 };
  var HUECO_MINIMO_DIAS = 7; // una semana sin tocar el proyecto ya cuenta como paron

  function aFecha(s) {
    if (!s) return null;
    var p = String(s).slice(0, 10).split('-');
    if (p.length !== 3) return null;
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    return isNaN(d.getTime()) ? null : d;
  }

  function aTexto(d) {
    if (!d) return null;
    return d.toISOString().slice(0, 10);
  }

  function hoyUTC() {
    var n = new Date();
    return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
  }

  function diasEntre(a, b) {
    if (!a || !b) return null;
    return Math.round((b.getTime() - a.getTime()) / DIA_MS);
  }

  function sumar(d, dias) {
    return new Date(d.getTime() + dias * DIA_MS);
  }

  function pct(hechas, total) {
    if (!total) return 0;
    return Math.round((hechas / total) * 1000) / 10;
  }

  /* ---------- 2. Ruta a proyecto completo: fases y requisitos ---------- */

  function calcularFases(proyecto, pipeline) {
    var tareas = proyecto.tareas || [];
    return pipeline.fases.map(function (fase) {
      var tareasFase = tareas.filter(function (t) { return t.fase === fase.id; });

      var requisitos = (fase.requisitos || []).map(function (req) {
        var suyas = tareasFase.filter(function (t) { return t.requisito === req.id; });
        var estado;
        if (!suyas.length) estado = 'sin_planificar';
        else if (suyas.every(function (t) { return t.estado === 'hecha'; })) estado = 'hecho';
        else estado = 'en_curso';
        return {
          id: req.id,
          nombre: req.nombre,
          detalle: req.detalle,
          estado: estado,
          tareas: suyas
        };
      });

      // Unidades de avance: cada requisito canonico + cada tarea suelta sin requisito.
      var sueltas = tareasFase.filter(function (t) { return !t.requisito; });
      var unidadesTotal = requisitos.length + sueltas.length;
      var unidadesHechas =
        requisitos.filter(function (r) { return r.estado === 'hecho'; }).length +
        sueltas.filter(function (t) { return t.estado === 'hecha'; }).length;

      return {
        id: fase.id,
        nombre: fase.nombre,
        descripcion: fase.descripcion,
        peso: fase.peso || 1,
        requisitos: requisitos,
        tareas: tareasFase,
        tareasSueltas: sueltas,
        unidadesTotal: unidadesTotal,
        unidadesHechas: unidadesHechas,
        progreso: pct(unidadesHechas, unidadesTotal),
        sinPlanificar: requisitos.filter(function (r) { return r.estado === 'sin_planificar'; }),
        pendientes: tareasFase.filter(function (t) { return t.estado !== 'hecha'; })
      };
    });
  }

  function avanceGlobal(fases) {
    var pesoTotal = 0, acumulado = 0;
    fases.forEach(function (f) {
      pesoTotal += f.peso;
      acumulado += f.peso * (f.progreso / 100);
    });
    return pesoTotal ? Math.round((acumulado / pesoTotal) * 1000) / 10 : 0;
  }

  /* ---------- 1. Pendientes ---------- */

  function calcularPendientes(proyecto, hoy) {
    return (proyecto.tareas || [])
      .filter(function (t) { return t.estado !== 'hecha'; })
      .map(function (t) {
        var vence = aFecha(t.vence);
        var dias = vence ? diasEntre(hoy, vence) : null;
        return Object.assign({}, t, {
          vencida: dias !== null && dias < 0,
          diasParaVencer: dias
        });
      })
      .sort(function (a, b) {
        if (a.vencida !== b.vencida) return a.vencida ? -1 : 1;
        var pa = ORDEN_PRIORIDAD[a.prioridad] != null ? ORDEN_PRIORIDAD[a.prioridad] : 9;
        var pb = ORDEN_PRIORIDAD[b.prioridad] != null ? ORDEN_PRIORIDAD[b.prioridad] : 9;
        if (pa !== pb) return pa - pb;
        var da = a.diasParaVencer == null ? 9999 : a.diasParaVencer;
        var db = b.diasParaVencer == null ? 9999 : b.diasParaVencer;
        return da - db;
      });
  }

  /* ---------- 3. Necesita atencion: frio, bloqueos, riesgos ---------- */

  function calcularAtencion(proyecto, pendientes) {
    var corridas = proyecto.corridas_frio || [];
    var reportes = proyecto.reportes_frio || [];

    var hallazgos = [];
    reportes.forEach(function (r) {
      (r.hallazgos || []).forEach(function (h) {
        hallazgos.push(Object.assign({}, h, { reporte: r.id, corrida: r.corrida, fecha: r.fecha }));
      });
    });

    var abiertos = hallazgos
      .filter(function (h) { return h.estado !== 'cerrado'; })
      .sort(function (a, b) {
        var sa = ORDEN_SEVERIDAD[a.severidad] != null ? ORDEN_SEVERIDAD[a.severidad] : 9;
        var sb = ORDEN_SEVERIDAD[b.severidad] != null ? ORDEN_SEVERIDAD[b.severidad] : 9;
        return sa - sb;
      });

    var conReporte = {};
    reportes.forEach(function (r) { if (r.corrida) conReporte[r.corrida] = true; });

    var corridasProblema = corridas.filter(function (c) { return c.resultado !== 'ok'; });
    var corridasSinReporte = corridas.filter(function (c) { return !conReporte[c.id]; });

    return {
      corridas: corridas,
      reportes: reportes,
      hallazgos: hallazgos,
      hallazgosAbiertos: abiertos,
      hallazgosCriticos: abiertos.filter(function (h) {
        return h.severidad === 'critica' || h.severidad === 'alta';
      }),
      mejoras: abiertos.filter(function (h) { return !!h.mejora_propuesta; }),
      corridasProblema: corridasProblema,
      corridasSinReporte: corridasSinReporte,
      bloqueadas: pendientes.filter(function (t) { return t.estado === 'bloqueada'; }),
      vencidas: pendientes.filter(function (t) { return t.vencida; }),
      sinResponsable: pendientes.filter(function (t) { return !t.responsable; }),
      riesgos: (proyecto.riesgos || []).filter(function (r) { return r.estado !== 'cerrado'; })
    };
  }

  /* ---------- 4/5/6. Seguimiento interno, bitacora y duracion ---------- */

  function calcularSeguimiento(proyecto, fases, hoy) {
    var bitacora = (proyecto.bitacora || []).slice().sort(function (a, b) {
      return String(a.fecha).localeCompare(String(b.fecha));
    });

    var dias = bitacora.map(function (b) { return aFecha(b.fecha); }).filter(Boolean);
    var unicos = {};
    dias.forEach(function (d) { unicos[aTexto(d)] = true; });
    var diasTrabajados = Object.keys(unicos).length;

    var horas = bitacora.reduce(function (s, b) { return s + (+b.horas || 0); }, 0);
    var horasPersona = bitacora.reduce(function (s, b) {
      return s + (+b.horas || 0) * (+b.personas || 1);
    }, 0);

    var inicio = aFecha(proyecto.fecha_inicio);
    var fin = aFecha(proyecto.fecha_fin);
    var corte = fin || hoy;
    var diasCalendario = inicio ? diasEntre(inicio, corte) + 1 : null;
    var cadencia = diasCalendario ? diasTrabajados / diasCalendario : 0;

    var primerDia = dias.length ? dias[0] : null;
    var ultimoDia = dias.length ? dias[dias.length - 1] : null;

    // Dias que "faltan" al principio: desde el inicio oficial hasta el primer dia real de trabajo.
    var arranqueEnBlanco = inicio && primerDia ? Math.max(0, diasEntre(inicio, primerDia)) : null;

    // Huecos durante la elaboracion.
    var ordenados = Object.keys(unicos).sort();
    var huecos = [];
    for (var i = 1; i < ordenados.length; i++) {
      var a = aFecha(ordenados[i - 1]), b = aFecha(ordenados[i]);
      var salto = diasEntre(a, b) - 1;
      if (salto >= HUECO_MINIMO_DIAS) {
        huecos.push({ desde: ordenados[i - 1], hasta: ordenados[i], dias: salto });
      }
    }
    var huecoActual = ultimoDia ? Math.max(0, diasEntre(ultimoDia, corte)) : null;
    var diasSinActividad = diasCalendario != null ? diasCalendario - diasTrabajados : null;

    // Unidades pendientes y proyeccion por ritmo real.
    var unidadesTotal = 0, unidadesHechas = 0;
    fases.forEach(function (f) {
      unidadesTotal += f.unidadesTotal;
      unidadesHechas += f.unidadesHechas;
    });
    var unidadesPendientes = unidadesTotal - unidadesHechas;
    var velocidad = diasTrabajados ? unidadesHechas / diasTrabajados : 0; // unidades por dia trabajado
    var diasTrabajoRestantes = velocidad > 0 ? Math.ceil(unidadesPendientes / velocidad) : null;
    var diasCalendarioRestantes =
      diasTrabajoRestantes != null && cadencia > 0
        ? Math.ceil(diasTrabajoRestantes / cadencia)
        : null;
    var fechaProyectada =
      diasCalendarioRestantes != null ? sumar(corte, diasCalendarioRestantes) : null;

    // Estimacion declarada por el equipo (inicial y ultima revision).
    var estimaciones = (proyecto.estimaciones || []).slice().sort(function (a, b) {
      return String(a.fecha).localeCompare(String(b.fecha));
    });
    var estimacionVigente = estimaciones.length ? estimaciones[estimaciones.length - 1] : null;

    // Dias pendientes segun la suma de estimaciones de las tareas abiertas.
    var diasEstimadosTareas = (proyecto.tareas || [])
      .filter(function (t) { return t.estado !== 'hecha'; })
      .reduce(function (s, t) { return s + (+t.estimacion_dias || 0); }, 0);

    var objetivo = aFecha(proyecto.fecha_objetivo);
    var desvio = objetivo && fechaProyectada ? diasEntre(objetivo, fechaProyectada) : null;
    var diasHastaObjetivo = objetivo ? diasEntre(hoy, objetivo) : null;

    return {
      bitacora: bitacora,
      diasTrabajados: diasTrabajados,
      horas: Math.round(horas * 10) / 10,
      horasPersona: Math.round(horasPersona * 10) / 10,
      horasPorDia: diasTrabajados ? Math.round((horas / diasTrabajados) * 10) / 10 : 0,
      diasCalendario: diasCalendario,
      diasSinActividad: diasSinActividad,
      cadencia: Math.round(cadencia * 1000) / 10,
      primerDia: aTexto(primerDia),
      ultimoDia: aTexto(ultimoDia),
      arranqueEnBlanco: arranqueEnBlanco,
      huecos: huecos,
      huecoActual: huecoActual,
      unidadesTotal: unidadesTotal,
      unidadesHechas: unidadesHechas,
      unidadesPendientes: unidadesPendientes,
      velocidad: Math.round(velocidad * 100) / 100,
      diasTrabajoRestantes: diasTrabajoRestantes,
      diasCalendarioRestantes: diasCalendarioRestantes,
      fechaProyectada: aTexto(fechaProyectada),
      estimaciones: estimaciones,
      estimacionInicial: proyecto.estimacion_inicial_dias != null ? proyecto.estimacion_inicial_dias : null,
      estimacionVigente: estimacionVigente,
      diasEstimadosTareas: diasEstimadosTareas,
      diasHastaObjetivo: diasHastaObjetivo,
      desvioObjetivo: desvio,
      fechaInicio: proyecto.fecha_inicio || null,
      fechaObjetivo: proyecto.fecha_objetivo || null,
      fechaFin: proyecto.fecha_fin || null,
      terminado: !!proyecto.fecha_fin
    };
  }

  function calcularDuracionPorFase(proyecto, pipeline) {
    var bitacora = proyecto.bitacora || [];
    return pipeline.fases.map(function (fase) {
      var entradas = bitacora.filter(function (b) { return b.fase === fase.id; });
      var fechas = entradas.map(function (b) { return b.fecha; }).sort();
      var horas = entradas.reduce(function (s, b) { return s + (+b.horas || 0); }, 0);
      var unicos = {};
      fechas.forEach(function (f) { unicos[f] = true; });
      var desde = fechas[0] || null;
      var hasta = fechas[fechas.length - 1] || null;
      return {
        id: fase.id,
        nombre: fase.nombre,
        dias: Object.keys(unicos).length,
        horas: Math.round(horas * 10) / 10,
        desde: desde,
        hasta: hasta,
        diasCalendario: desde && hasta ? diasEntre(aFecha(desde), aFecha(hasta)) + 1 : null
      };
    });
  }

  /* ---------- 7. Resultado final ---------- */

  function calcularResultadoFinal(proyecto, fases) {
    var rf = proyecto.resultado_final || {};
    var porFase = {};
    fases.forEach(function (f) { porFase[f.id] = f; });

    function hito(clave, nombre, faseId) {
      var d = rf[clave] || {};
      var fase = porFase[faseId];
      return {
        clave: clave,
        nombre: nombre,
        fase: faseId,
        estado: d.estado || 'pendiente',
        url: d.url || '',
        fecha: d.fecha || null,
        notas: d.notas || '',
        progresoFase: fase ? fase.progreso : 0,
        faltan: fase ? fase.requisitos.filter(function (r) { return r.estado !== 'hecho'; }) : []
      };
    }

    var hitos = [
      hito('landing_page', 'Landing page de producto', 'landing'),
      hito('genoma_marketing', 'Genoma de marketing', 'genoma_marketing'),
      hito('publicacion', 'Publicación', 'publicacion'),
      hito('venta', 'Venta', 'venta')
    ];

    var venta = rf.venta || {};
    return {
      hitos: hitos,
      cerrado: hitos.every(function (h) { return h.estado === 'hecho'; }),
      ventas: {
        unidades: +venta.unidades_vendidas || 0,
        ingresos: +venta.ingresos || 0,
        moneda: venta.moneda || 'USD',
        primeraVenta: venta.fecha_primera_venta || null
      }
    };
  }

  /* ---------- Entrada principal ---------- */

  function calcular(proyecto, pipeline, hoyOpcional) {
    var hoy = hoyOpcional ? aFecha(hoyOpcional) : hoyUTC();
    var fases = calcularFases(proyecto, pipeline);
    var pendientes = calcularPendientes(proyecto, hoy);
    var atencion = calcularAtencion(proyecto, pendientes);
    var seguimiento = calcularSeguimiento(proyecto, fases, hoy);
    var duracionFases = calcularDuracionPorFase(proyecto, pipeline);
    var resultado = calcularResultadoFinal(proyecto, fases);

    var faltantes = [];
    fases.forEach(function (f) {
      f.requisitos.forEach(function (r) {
        if (r.estado !== 'hecho') {
          faltantes.push({ fase: f.id, faseNombre: f.nombre, requisito: r });
        }
      });
    });

    var alertas =
      atencion.hallazgosCriticos.length +
      atencion.bloqueadas.length +
      atencion.vencidas.length +
      atencion.corridasSinReporte.length;

    return {
      proyecto: proyecto,
      hoy: aTexto(hoy),
      fases: fases,
      avance: avanceGlobal(fases),
      pendientes: pendientes,
      faltantes: faltantes,
      atencion: atencion,
      seguimiento: seguimiento,
      duracionFases: duracionFases,
      resultado: resultado,
      alertas: alertas
    };
  }

  var api = {
    calcular: calcular,
    aFecha: aFecha,
    aTexto: aTexto,
    diasEntre: diasEntre,
    hoyUTC: hoyUTC,
    HUECO_MINIMO_DIAS: HUECO_MINIMO_DIAS
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.PD = Object.assign(global.PD || {}, { metricas: api });
})(typeof window !== 'undefined' ? window : globalThis);
