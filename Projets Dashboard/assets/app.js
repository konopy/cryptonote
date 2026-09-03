/*
 * Projets Dashboard - interfaz
 * Carga los datos (por fetch si hay servidor, o del bundle si se abre con file://)
 * y dibuja el panel de cartera y el panel de cada proyecto.
 */
(function () {
  'use strict';

  var M = window.PD.metricas;
  var estado = { pipeline: null, proyectos: [], calculos: {}, actual: null, filtros: {} };

  /* ---------- utilidades ---------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function $(sel) { return document.querySelector(sel); }

  var ETIQUETAS_ESTADO = {
    planificado: 'Planificado', en_desarrollo: 'En desarrollo', en_pruebas: 'En pruebas',
    en_lanzamiento: 'En lanzamiento', en_venta: 'En venta', terminado: 'Terminado', pausado: 'Pausado',
    pendiente: 'Pendiente', en_progreso: 'En progreso', bloqueada: 'Bloqueada', hecha: 'Hecha',
    hecho: 'Hecho', en_curso: 'En curso', sin_planificar: 'Sin planificar',
    abierto: 'Abierto', cerrado: 'Cerrado', ok: 'Correcta', con_incidencias: 'Con incidencias', fallida: 'Fallida'
  };

  function nom(v) { return ETIQUETAS_ESTADO[v] || (v || '—'); }

  function clasePorEstado(e) {
    if (e === 'hecha' || e === 'hecho' || e === 'ok' || e === 'cerrado') return 'ok';
    if (e === 'bloqueada' || e === 'fallida' || e === 'abierto') return 'peligro';
    if (e === 'en_progreso' || e === 'en_curso' || e === 'con_incidencias' || e === 'sin_planificar') return 'aviso';
    return 'apagada';
  }

  function claseSeveridad(s) {
    if (s === 'critica') return 'critica';
    if (s === 'alta') return 'peligro';
    if (s === 'media') return 'aviso';
    return 'apagada';
  }

  function barra(p, clase) {
    var c = clase || (p >= 100 ? 'ok' : p < 34 ? 'aviso' : '');
    return '<div class="barra ' + c + '"><i style="width:' + Math.max(0, Math.min(100, p)) + '%"></i></div>';
  }

  function num(v, sufijo) {
    if (v == null || v === '' || (typeof v === 'number' && isNaN(v))) return '—';
    return esc(v) + (sufijo || '');
  }

  function fechaLarga(s) {
    if (!s) return '—';
    var d = M.aFecha(s);
    if (!d) return esc(s);
    var meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return d.getUTCDate() + ' ' + meses[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
  }

  function kpi(etiqueta, valor, nota, clase) {
    return '<div class="kpi ' + (clase || '') + '">' +
      '<div class="etiqueta">' + esc(etiqueta) + '</div>' +
      '<div class="valor">' + valor + '</div>' +
      (nota ? '<div class="nota">' + nota + '</div>' : '') +
      '</div>';
  }

  function vacio(txt) { return '<p class="vacio">' + esc(txt) + '</p>'; }

  /* ---------- carga de datos ---------- */

  function cargar() {
    if (window.location.protocol === 'file:' && window.PD_DATA) {
      return Promise.resolve(window.PD_DATA);
    }
    return Promise.all([
      fetch('data/index.json').then(function (r) { return r.json(); }),
      fetch('data/pipeline.json').then(function (r) { return r.json(); })
    ]).then(function (res) {
      var indice = res[0], pipeline = res[1];
      return Promise.all(indice.proyectos.map(function (ruta) {
        return fetch('data/' + ruta).then(function (r) { return r.json(); });
      })).then(function (proyectos) {
        return { indice: indice, pipeline: pipeline, proyectos: proyectos };
      });
    }).catch(function (e) {
      if (window.PD_DATA) return window.PD_DATA;
      throw e;
    });
  }

  /* ---------- barra lateral ---------- */

  function pintarLateral() {
    var html = '<button class="item-proyecto' + (estado.actual === null ? ' activo' : '') + '" data-id="">' +
      '<div class="fila"><span class="nombre">Resumen de cartera</span>' +
      '<span class="meta">' + estado.proyectos.length + '</span></div>' +
      '<div class="meta">Todos los proyectos</div></button>';

    estado.proyectos.forEach(function (p) {
      var c = estado.calculos[p.id];
      html += '<button class="item-proyecto' + (estado.actual === p.id ? ' activo' : '') + '" data-id="' + esc(p.id) + '">' +
        '<div class="fila"><span class="nombre">' + esc(p.nombre) + '</span>' +
        '<span class="meta">' + c.avance + '%</span></div>' +
        barra(c.avance) +
        '<div class="fila"><span class="meta">' + esc(nom(p.estado)) + '</span>' +
        (c.alertas ? '<span class="etq peligro">' + c.alertas + (c.alertas === 1 ? ' alerta' : ' alertas') + '</span>' : '<span class="meta">sin alertas</span>') +
        '</div></button>';
    });

    $('#lista-proyectos').innerHTML = html;
    Array.prototype.forEach.call(document.querySelectorAll('.item-proyecto'), function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-id');
        window.location.hash = id ? '#/proyecto/' + id : '#/cartera';
      });
    });
  }

  /* ---------- vista: cartera ---------- */

  function pintarCartera() {
    var cs = estado.proyectos.map(function (p) { return estado.calculos[p.id]; });
    var totalPendientes = cs.reduce(function (s, c) { return s + c.pendientes.length; }, 0);
    var totalAlertas = cs.reduce(function (s, c) { return s + c.alertas; }, 0);
    var totalHallazgos = cs.reduce(function (s, c) { return s + c.atencion.hallazgosAbiertos.length; }, 0);
    var totalDias = cs.reduce(function (s, c) { return s + c.seguimiento.diasTrabajados; }, 0);
    var totalHoras = cs.reduce(function (s, c) { return s + c.seguimiento.horas; }, 0);
    var terminados = cs.filter(function (c) { return c.resultado.cerrado; }).length;

    var html = '<div class="cabecera"><div>' +
      '<h1>Resumen de cartera</h1>' +
      '<p>Estado de los ' + cs.length + ' proyectos de la plataforma. Elige un proyecto en la izquierda para ver su detalle completo.</p>' +
      '</div></div>';

    html += '<div class="kpis">' +
      kpi('Proyectos', cs.length, terminados + ' cerrados de punta a punta') +
      kpi('Avance medio', (cs.length ? Math.round(cs.reduce(function (s, c) { return s + c.avance; }, 0) / cs.length * 10) / 10 : 0) + '%', 'ponderado por fase') +
      kpi('Pendientes', totalPendientes, 'tareas sin terminar') +
      kpi('Necesitan atención', totalAlertas, 'bloqueos, vencidas, frío', totalAlertas ? 'peligro' : 'ok') +
      kpi('Hallazgos de frío abiertos', totalHallazgos, 'mejoras sin aplicar', totalHallazgos ? 'aviso' : 'ok') +
      kpi('Días trabajados', totalDias, Math.round(totalHoras) + ' h acumuladas') +
      '</div>';

    html += '<section class="bloque"><h2>Todos los proyectos</h2>' +
      '<div class="tarjeta"><table><thead><tr>' +
      '<th>Proyecto</th><th>Estado</th><th style="width:150px">Avance</th>' +
      '<th class="num">Pendientes</th><th class="num">Atención</th><th class="num">Días trab.</th>' +
      '<th>Fecha objetivo</th><th>Proyección</th><th>Resultado final</th>' +
      '</tr></thead><tbody>';

    cs.forEach(function (c) {
      var s = c.seguimiento;
      var desvio = s.desvioObjetivo;
      var claseDesvio = desvio == null ? '' : desvio > 7 ? 'peligro' : desvio > 0 ? 'aviso' : 'ok';
      var hitosHechos = c.resultado.hitos.filter(function (h) { return h.estado === 'hecho'; }).length;
      html += '<tr>' +
        '<td><a href="#/proyecto/' + esc(c.proyecto.id) + '"><strong>' + esc(c.proyecto.nombre) + '</strong></a>' +
        (c.proyecto.ticker ? ' <span class="etq apagada">' + esc(c.proyecto.ticker) + '</span>' : '') + '</td>' +
        '<td><span class="etq">' + esc(nom(c.proyecto.estado)) + '</span></td>' +
        '<td><div class="celda-avance">' + barra(c.avance) + '<span>' + c.avance + '%</span></div></td>' +
        '<td class="num">' + c.pendientes.length + '</td>' +
        '<td class="num">' + (c.alertas ? '<span class="etq peligro">' + c.alertas + '</span>' : '0') + '</td>' +
        '<td class="num">' + s.diasTrabajados + '</td>' +
        '<td>' + fechaLarga(s.fechaObjetivo) + '</td>' +
        '<td>' + (s.fechaProyectada ? fechaLarga(s.fechaProyectada) +
          (desvio != null ? ' <span class="etq ' + claseDesvio + '">' + (desvio > 0 ? '+' : '') + desvio + ' d</span>' : '') : '—') + '</td>' +
        '<td>' + hitosHechos + '/4 hitos</td>' +
        '</tr>';
    });

    html += '</tbody></table></div></section>';

    // Lo que necesita atencion en toda la cartera.
    html += '<section class="bloque"><h2>Lo más urgente de toda la cartera</h2>';
    var urgentes = [];
    cs.forEach(function (c) {
      c.atencion.hallazgosCriticos.forEach(function (h) {
        urgentes.push({ proyecto: c.proyecto.nombre, id: c.proyecto.id, tipo: 'Hallazgo de frío', sev: h.severidad, texto: h.titulo, extra: h.mejora_propuesta });
      });
      c.atencion.bloqueadas.forEach(function (t) {
        urgentes.push({ proyecto: c.proyecto.nombre, id: c.proyecto.id, tipo: 'Tarea bloqueada', sev: 'alta', texto: t.titulo, extra: t.notas });
      });
      c.atencion.vencidas.forEach(function (t) {
        urgentes.push({ proyecto: c.proyecto.nombre, id: c.proyecto.id, tipo: 'Tarea vencida', sev: 'media', texto: t.titulo, extra: 'Venció el ' + fechaLarga(t.vence) });
      });
    });
    urgentes.sort(function (a, b) {
      var o = { critica: 0, alta: 1, media: 2, baja: 3 };
      return (o[a.sev] == null ? 9 : o[a.sev]) - (o[b.sev] == null ? 9 : o[b.sev]);
    });

    if (!urgentes.length) {
      html += '<div class="tarjeta bien">' + vacio('Nada urgente en la cartera.') + '</div>';
    } else {
      html += '<div class="tarjeta alerta"><table><thead><tr><th>Proyecto</th><th>Tipo</th><th>Severidad</th><th>Asunto</th><th>Siguiente paso</th></tr></thead><tbody>';
      urgentes.slice(0, 20).forEach(function (u) {
        html += '<tr><td><a href="#/proyecto/' + esc(u.id) + '">' + esc(u.proyecto) + '</a></td>' +
          '<td>' + esc(u.tipo) + '</td>' +
          '<td><span class="etq ' + claseSeveridad(u.sev) + '">' + esc(u.sev) + '</span></td>' +
          '<td>' + esc(u.texto) + '</td><td>' + esc(u.extra || '—') + '</td></tr>';
      });
      html += '</tbody></table></div>';
    }
    html += '</section>';

    $('#contenido').innerHTML = html + pie();
  }

  /* ---------- vista: proyecto ---------- */

  function pintarProyecto(id) {
    var c = estado.calculos[id];
    if (!c) { pintarCartera(); return; }
    var p = c.proyecto, s = c.seguimiento;

    var html = '<div class="cabecera"><div>' +
      '<h1>' + esc(p.nombre) + (p.ticker ? ' <span class="etq acento">' + esc(p.ticker) + '</span>' : '') + '</h1>' +
      '<p>' + esc(p.descripcion || '') + '</p>' +
      '<p class="meta" style="margin-top:6px;color:var(--texto-3);font-size:12px">' +
      'Estado: <strong>' + esc(nom(p.estado)) + '</strong> · Responsable: ' + esc(p.responsable || '—') +
      ' · Inicio: ' + fechaLarga(p.fecha_inicio) + ' · Objetivo: ' + fechaLarga(p.fecha_objetivo) +
      (p.repositorio ? ' · <a href="' + esc(p.repositorio) + '">repositorio</a>' : '') +
      '</p></div></div>';

    html += '<nav class="navegacion">' +
      '<a href="#s1">1 · Pendiente</a><a href="#s2">2 · Para estar completo</a>' +
      '<a href="#s3">3 · Necesita atención</a><a href="#s4">4 · Seguimiento interno</a>' +
      '<a href="#s5">5 · Días y lo elaborado</a><a href="#s6">6 · Duración</a>' +
      '<a href="#s7">7 · Resultado final</a></nav>';

    var claseDesvio = s.desvioObjetivo == null ? '' : s.desvioObjetivo > 7 ? 'peligro' : s.desvioObjetivo > 0 ? 'aviso' : 'ok';
    html += '<div class="kpis">' +
      kpi('Avance global', c.avance + '%', barra(c.avance)) +
      kpi('Pendientes', c.pendientes.length, c.atencion.bloqueadas.length + ' bloqueadas · ' + c.atencion.vencidas.length + ' vencidas',
        c.pendientes.length ? '' : 'ok') +
      kpi('Requisitos que faltan', c.faltantes.length, 'de ' + s.unidadesTotal + ' unidades del modelo') +
      kpi('Necesita atención', c.alertas, c.atencion.hallazgosAbiertos.length + ' hallazgos de frío abiertos', c.alertas ? 'peligro' : 'ok') +
      kpi('Días trabajados', s.diasTrabajados, s.horas + ' h · ' + s.horasPorDia + ' h/día') +
      kpi('Días que faltan (ritmo real)', s.diasCalendarioRestantes == null ? '—' : s.diasCalendarioRestantes,
        s.fechaProyectada ? 'terminaría el ' + fechaLarga(s.fechaProyectada) : 'sin ritmo medible',
        claseDesvio) +
      '</div>';

    html += seccionPendientes(c);
    html += seccionCompleto(c);
    html += seccionAtencion(c);
    html += seccionSeguimiento(c);
    html += seccionBitacora(c);
    html += seccionDuracion(c);
    html += seccionResultado(c);

    $('#contenido').innerHTML = html + pie();
    conectarFiltros(c);
  }

  /* 1. Pendiente */
  function seccionPendientes(c) {
    var f = estado.filtros;
    var lista = c.pendientes.filter(function (t) {
      if (f.fase && t.fase !== f.fase) return false;
      if (f.prioridad && t.prioridad !== f.prioridad) return false;
      if (f.soloRiesgo && !(t.vencida || t.estado === 'bloqueada')) return false;
      return true;
    });

    var opcionesFase = c.fases.map(function (fa) {
      return '<option value="' + esc(fa.id) + '"' + (f.fase === fa.id ? ' selected' : '') + '>' + esc(fa.nombre) + '</option>';
    }).join('');

    var html = '<section class="bloque" id="s1"><h2><span class="num">1</span> Todo lo que está pendiente</h2>' +
      '<p class="sub">Tareas abiertas del proyecto, ordenadas por urgencia: primero lo vencido, luego por prioridad y fecha.</p>' +
      '<div class="filtros">' +
      '<label>Fase</label><select id="f-fase"><option value="">Todas</option>' + opcionesFase + '</select>' +
      '<label>Prioridad</label><select id="f-prioridad"><option value="">Todas</option>' +
      ['alta', 'media', 'baja'].map(function (x) {
        return '<option value="' + x + '"' + (f.prioridad === x ? ' selected' : '') + '>' + x + '</option>';
      }).join('') + '</select>' +
      '<label><input type="checkbox" id="f-riesgo"' + (f.soloRiesgo ? ' checked' : '') + '> sólo vencidas o bloqueadas</label>' +
      '<span class="meta" style="color:var(--texto-3);font-size:12px">' + lista.length + ' de ' + c.pendientes.length + '</span>' +
      '</div>';

    if (!lista.length) {
      html += '<div class="tarjeta bien">' + vacio('No hay tareas pendientes con estos filtros.') + '</div></section>';
      return html;
    }

    html += '<div class="tarjeta"><table><thead><tr>' +
      '<th>Tarea</th><th>Fase</th><th>Estado</th><th>Prioridad</th><th>Responsable</th><th>Vence</th><th class="num">Días est.</th>' +
      '</tr></thead><tbody>';
    lista.forEach(function (t) {
      var fase = c.fases.filter(function (x) { return x.id === t.fase; })[0];
      html += '<tr>' +
        '<td><strong>' + esc(t.titulo) + '</strong>' + (t.notas ? '<div class="meta" style="color:var(--texto-3);font-size:12px">' + esc(t.notas) + '</div>' : '') + '</td>' +
        '<td>' + esc(fase ? fase.nombre : t.fase || '—') + '</td>' +
        '<td><span class="etq ' + clasePorEstado(t.estado) + '">' + esc(nom(t.estado)) + '</span></td>' +
        '<td><span class="etq ' + (t.prioridad === 'alta' ? 'peligro' : t.prioridad === 'media' ? 'aviso' : 'apagada') + '">' + esc(t.prioridad || '—') + '</span></td>' +
        '<td>' + (t.responsable ? esc(t.responsable) : '<span class="etq aviso">sin asignar</span>') + '</td>' +
        '<td>' + fechaLarga(t.vence) + (t.vencida ? ' <span class="etq peligro">vencida ' + Math.abs(t.diasParaVencer) + ' d</span>' : '') + '</td>' +
        '<td class="num">' + num(t.estimacion_dias) + '</td>' +
        '</tr>';
    });
    html += '</tbody></table></div></section>';
    return html;
  }

  /* 2. Para estar completo */
  function seccionCompleto(c) {
    var html = '<section class="bloque" id="s2"><h2><span class="num">2</span> Todo lo que falta para que el proyecto esté completo</h2>' +
      '<p class="sub">Cada proyecto se compara contra el modelo canónico de nueve fases (definición → venta). ' +
      'Un requisito marcado <em>sin planificar</em> no tiene ninguna tarea que lo cubra: es trabajo que todavía no existe en el plan.</p>';

    html += '<div class="kpis">' +
      kpi('Requisitos completos', c.seguimiento.unidadesHechas + ' / ' + c.seguimiento.unidadesTotal, barra(c.avance)) +
      kpi('En curso', c.faltantes.filter(function (x) { return x.requisito.estado === 'en_curso'; }).length, 'con tareas abiertas', 'aviso') +
      kpi('Sin planificar', c.faltantes.filter(function (x) { return x.requisito.estado === 'sin_planificar'; }).length, 'sin ninguna tarea creada', 'peligro') +
      '</div>';

    c.fases.forEach(function (f) {
      var abierto = f.progreso < 100;
      html += '<details class="fase"' + (abierto ? ' open' : '') + '>' +
        '<summary><span class="titulo-fase">' + esc(f.nombre) + '</span>' +
        '<span class="etq apagada">peso ' + f.peso + '</span>' +
        barra(f.progreso) +
        '<span class="etq ' + (f.progreso === 100 ? 'ok' : f.progreso === 0 ? 'peligro' : 'aviso') + '">' + f.progreso + '%</span>' +
        '</summary><div class="cuerpo">' +
        '<p class="sub">' + esc(f.descripcion || '') + '</p><ul class="requisitos">';

      f.requisitos.forEach(function (r) {
        var marca = r.estado === 'hecho' ? '✔' : r.estado === 'en_curso' ? '◔' : '○';
        html += '<li class="' + r.estado + '"><span class="marca-estado">' + marca + '</span><div>' +
          '<span class="nombre-req"><strong>' + esc(r.nombre) + '</strong></span> ' +
          '<span class="etq ' + clasePorEstado(r.estado) + '">' + esc(nom(r.estado)) + '</span>' +
          '<div class="detalle">' + esc(r.detalle) + '</div>' +
          (r.tareas.length
            ? '<div class="detalle">Tareas: ' + r.tareas.map(function (t) {
                return esc(t.titulo) + ' (' + esc(nom(t.estado)) + ')';
              }).join(' · ') + '</div>'
            : '<div class="detalle" style="color:var(--aviso)">No hay ninguna tarea creada para este requisito.</div>') +
          '</div></li>';
      });

      f.tareasSueltas.forEach(function (t) {
        html += '<li class="' + (t.estado === 'hecha' ? 'hecho' : 'en_curso') + '"><span class="marca-estado">' +
          (t.estado === 'hecha' ? '✔' : '◔') + '</span><div><span class="nombre-req">' + esc(t.titulo) + '</span> ' +
          '<span class="etq apagada">extra</span></div></li>';
      });

      html += '</ul></div></details>';
    });

    return html + '</section>';
  }

  /* 3. Necesita atencion */
  function seccionAtencion(c) {
    var a = c.atencion;
    var html = '<section class="bloque" id="s3"><h2><span class="num">3</span> Lo que necesita atención: corridas y reportes de frío</h2>' +
      '<p class="sub">Cada corrida en frío deja métricas e incidencias; cada reporte deja hallazgos con una mejora propuesta. ' +
      'Aquí está todo lo que sigue abierto y cómo mejora la plataforma al cerrarlo.</p>';

    html += '<div class="kpis">' +
      kpi('Corridas en frío', a.corridas.length, a.corridasProblema.length + ' con incidencias o fallidas', a.corridasProblema.length ? 'aviso' : 'ok') +
      kpi('Reportes de frío', a.reportes.length, a.corridasSinReporte.length + ' corridas sin reporte', a.corridasSinReporte.length ? 'aviso' : 'ok') +
      kpi('Hallazgos abiertos', a.hallazgosAbiertos.length, a.hallazgosCriticos.length + ' críticos o altos', a.hallazgosCriticos.length ? 'peligro' : 'ok') +
      kpi('Bloqueos', a.bloqueadas.length, a.vencidas.length + ' tareas vencidas', a.bloqueadas.length ? 'peligro' : 'ok') +
      '</div>';

    html += '<div class="tarjeta ' + (a.hallazgosCriticos.length ? 'alerta' : 'bien') + '"><h3>Hallazgos abiertos y mejoras propuestas para la plataforma</h3>';
    if (!a.hallazgosAbiertos.length) {
      html += vacio('No queda ningún hallazgo abierto.');
    } else {
      html += '<table><thead><tr><th>Severidad</th><th>Hallazgo</th><th>Impacto</th><th>Mejora propuesta</th><th>Origen</th><th>Tarea</th></tr></thead><tbody>';
      a.hallazgosAbiertos.forEach(function (h) {
        html += '<tr><td><span class="etq ' + claseSeveridad(h.severidad) + '">' + esc(h.severidad) + '</span></td>' +
          '<td><strong>' + esc(h.titulo) + '</strong></td>' +
          '<td>' + esc(h.impacto || '—') + '</td>' +
          '<td>' + esc(h.mejora_propuesta || '—') + '</td>' +
          '<td>' + esc(h.reporte) + ' · ' + esc(h.corrida || '—') + '<div class="meta" style="color:var(--texto-3);font-size:12px">' + fechaLarga(h.fecha) + '</div></td>' +
          '<td>' + (h.tarea ? esc(h.tarea) : '<span class="etq aviso">sin tarea</span>') + '</td></tr>';
      });
      html += '</tbody></table>';
    }
    html += '</div>';

    html += '<div class="tarjeta"><h3>Corridas en frío</h3>';
    if (!a.corridas.length) {
      html += vacio('Todavía no se ha hecho ninguna corrida en frío.');
    } else {
      html += '<table><thead><tr><th>Corrida</th><th>Fecha</th><th>Tipo</th><th>Objetivo</th><th>Resultado</th>' +
        '<th class="num">Horas</th><th class="num">Nodos</th><th class="num">Bloques</th><th>Incidencias</th><th>Reporte</th></tr></thead><tbody>';
      a.corridas.forEach(function (co) {
        var rep = a.reportes.filter(function (r) { return r.corrida === co.id; })[0];
        html += '<tr><td><strong>' + esc(co.id) + '</strong></td>' +
          '<td>' + fechaLarga(co.fecha) + '</td>' +
          '<td>' + esc(co.tipo || '—') + '</td>' +
          '<td>' + esc(co.objetivo || '—') + '</td>' +
          '<td><span class="etq ' + clasePorEstado(co.resultado) + '">' + esc(nom(co.resultado)) + '</span></td>' +
          '<td class="num">' + num(co.duracion_horas) + '</td>' +
          '<td class="num">' + num(co.nodos) + '</td>' +
          '<td class="num">' + num(co.bloques) + '</td>' +
          '<td>' + ((co.incidencias || []).length
            ? '<ul style="margin:0;padding-left:16px">' + co.incidencias.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>'
            : '—') + '</td>' +
          '<td>' + (rep ? esc(rep.id) : '<span class="etq aviso">falta</span>') + '</td></tr>';
      });
      html += '</tbody></table>';
    }
    html += '</div>';

    html += '<div class="tarjeta"><h3>Reportes de frío</h3>';
    if (!a.reportes.length) {
      html += vacio('Todavía no hay reportes de frío.');
    } else {
      a.reportes.forEach(function (r) {
        var abiertos = (r.hallazgos || []).filter(function (h) { return h.estado !== 'cerrado'; }).length;
        html += '<div style="padding:9px 0;border-top:1px solid var(--borde)">' +
          '<strong>' + esc(r.id) + '</strong> · ' + fechaLarga(r.fecha) +
          ' · corrida ' + esc(r.corrida || '—') + ' · ' + esc(r.autor || '—') + ' ' +
          '<span class="etq ' + (abiertos ? 'peligro' : 'ok') + '">' + (r.hallazgos || []).length + ' hallazgos, ' + abiertos + ' abiertos</span>' +
          '<div class="detalle" style="color:var(--texto-2)">' + esc(r.conclusion || '') + '</div></div>';
      });
    }
    html += '</div>';

    if (a.riesgos.length) {
      html += '<div class="tarjeta aviso"><h3>Riesgos abiertos</h3><table><thead><tr><th>Riesgo</th><th>Probabilidad</th><th>Impacto</th><th>Mitigación</th></tr></thead><tbody>';
      a.riesgos.forEach(function (r) {
        html += '<tr><td>' + esc(r.titulo) + '</td><td>' + esc(r.probabilidad || '—') + '</td>' +
          '<td>' + esc(r.impacto || '—') + '</td><td>' + esc(r.mitigacion || '—') + '</td></tr>';
      });
      html += '</tbody></table></div>';
    }

    return html + '</section>';
  }

  /* 4. Seguimiento interno */
  function seccionSeguimiento(c) {
    var s = c.seguimiento;
    var html = '<section class="bloque" id="s4"><h2><span class="num">4</span> Seguimiento interno: días trabajados y días que faltan</h2>' +
      '<p class="sub">Cuántos días se ha trabajado de verdad, cuántos se perdieron al arrancar y durante la elaboración, ' +
      'y cuántos faltan según el ritmo real frente a lo que estimó el equipo.</p>';

    html += '<div class="kpis">' +
      kpi('Días trabajados', s.diasTrabajados, 'sobre ' + num(s.diasCalendario) + ' días de calendario') +
      kpi('Cadencia', s.cadencia + '%', 'del calendario con actividad', s.cadencia < 30 ? 'aviso' : 'ok') +
      kpi('Días sin actividad', num(s.diasSinActividad), s.huecos.length + ' pausas de 7 días o más', s.huecos.length ? 'aviso' : 'ok') +
      kpi('Arranque en blanco', num(s.arranqueEnBlanco, ' d'), 'entre la fecha de inicio y el primer día real', s.arranqueEnBlanco > 7 ? 'aviso' : '') +
      kpi('Sin tocar desde', num(s.huecoActual, ' d'), 'último día con trabajo: ' + fechaLarga(s.ultimoDia), s.huecoActual > 7 ? 'peligro' : '') +
      '</div>';

    html += '<div class="rejilla-2">';

    html += '<div class="tarjeta"><h3>Días que faltan</h3><table><tbody>' +
      '<tr><td>Estimación inicial del equipo</td><td class="num">' + num(s.estimacionInicial, ' días') + '</td></tr>' +
      '<tr><td>Estimación vigente (' + (s.estimacionVigente ? fechaLarga(s.estimacionVigente.fecha) : '—') + ')</td>' +
      '<td class="num">' + (s.estimacionVigente ? num(s.estimacionVigente.dias_restantes, ' días') : '—') + '</td></tr>' +
      '<tr><td>Suma de estimaciones de tareas abiertas</td><td class="num">' + num(s.diasEstimadosTareas, ' días') + '</td></tr>' +
      '<tr><td>Días de trabajo restantes al ritmo real</td><td class="num">' + num(s.diasTrabajoRestantes, ' días') + '</td></tr>' +
      '<tr><td>Días de calendario restantes al ritmo real</td><td class="num">' + num(s.diasCalendarioRestantes, ' días') + '</td></tr>' +
      '<tr><td>Fecha de fin proyectada</td><td class="num">' + fechaLarga(s.fechaProyectada) + '</td></tr>' +
      '<tr><td>Fecha objetivo</td><td class="num">' + fechaLarga(s.fechaObjetivo) + '</td></tr>' +
      '<tr><td>Desvío frente al objetivo</td><td class="num">' +
      (s.desvioObjetivo == null ? '—' : '<span class="etq ' + (s.desvioObjetivo > 7 ? 'peligro' : s.desvioObjetivo > 0 ? 'aviso' : 'ok') + '">' +
        (s.desvioObjetivo > 0 ? '+' : '') + s.desvioObjetivo + ' días</span>') + '</td></tr>' +
      '</tbody></table>' +
      '<p class="sub">Ritmo medido: ' + s.velocidad + ' requisitos cerrados por día trabajado. ' +
      'Quedan ' + s.unidadesPendientes + ' de ' + s.unidadesTotal + ' unidades del modelo.</p></div>';

    html += '<div class="tarjeta"><h3>Revisiones de la estimación</h3>';
    if (!s.estimaciones.length) {
      html += vacio('No hay revisiones de estimación registradas.');
    } else {
      html += '<table><thead><tr><th>Fecha</th><th class="num">Días restantes</th><th>Motivo</th></tr></thead><tbody>';
      s.estimaciones.forEach(function (e) {
        html += '<tr><td>' + fechaLarga(e.fecha) + '</td><td class="num">' + num(e.dias_restantes) + '</td><td>' + esc(e.nota || '') + '</td></tr>';
      });
      html += '</tbody></table>';
    }
    html += '</div>';

    html += '<div class="tarjeta ' + (s.huecos.length ? 'aviso' : '') + '"><h3>Pausas durante la elaboración</h3>';
    if (!s.huecos.length) {
      html += vacio('Sin pausas de una semana o más.');
    } else {
      html += '<table><thead><tr><th>Desde</th><th>Hasta</th><th class="num">Días parados</th></tr></thead><tbody>';
      s.huecos.slice().sort(function (a, b) { return b.dias - a.dias; }).forEach(function (h) {
        html += '<tr><td>' + fechaLarga(h.desde) + '</td><td>' + fechaLarga(h.hasta) + '</td><td class="num">' + h.dias + '</td></tr>';
      });
      html += '</tbody></table>';
    }
    html += '</div>';

    html += '</div>';
    return html + '</section>';
  }

  /* 5. Dias y lo elaborado */
  function seccionBitacora(c) {
    var s = c.seguimiento;
    var html = '<section class="bloque" id="s5"><h2><span class="num">5</span> Los días que se trabajaron y lo que se elaboró</h2>' +
      '<p class="sub">Bitácora día a día, de la más reciente a la más antigua. Las pausas de una semana o más aparecen marcadas.</p>' +
      '<div class="tarjeta">';

    if (!s.bitacora.length) {
      html += vacio('Todavía no hay días registrados en la bitácora.');
    } else {
      var fases = {};
      c.fases.forEach(function (f) { fases[f.id] = f.nombre; });
      var orden = s.bitacora.slice().reverse();
      html += '<ul class="linea-tiempo">';
      orden.forEach(function (b, i) {
        var siguiente = orden[i + 1];
        html += '<li><div class="fecha">' + fechaLarga(b.fecha) +
          '<small>' + num(b.horas, ' h') + (b.personas > 1 ? ' · ' + b.personas + ' personas' : '') + '</small></div>' +
          '<div><span class="etq apagada">' + esc(fases[b.fase] || b.fase || 'sin fase') + '</span>' +
          '<ul>' + (b.elaborado || []).map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>' +
          (b.notas ? '<div class="nota">' + esc(b.notas) + '</div>' : '') +
          '</div></li>';
        if (siguiente) {
          var salto = M.diasEntre(M.aFecha(siguiente.fecha), M.aFecha(b.fecha)) - 1;
          if (salto >= M.HUECO_MINIMO_DIAS) {
            html += '<li class="hueco" style="display:block">— ' + salto + ' días sin actividad —</li>';
          }
        }
      });
      html += '</ul>';
    }

    return html + '</div></section>';
  }

  /* 6. Duracion */
  function seccionDuracion(c) {
    var s = c.seguimiento;
    var html = '<section class="bloque" id="s6"><h2><span class="num">6</span> Cuánto ha durado la elaboración</h2>' +
      '<p class="sub">Duración real medida en calendario, en días efectivos de trabajo y en horas, con el desglose por fase.</p>';

    html += '<div class="kpis">' +
      kpi('Duración en calendario', num(s.diasCalendario, ' d'), fechaLarga(s.fechaInicio) + ' → ' + (s.terminado ? fechaLarga(s.fechaFin) : 'hoy')) +
      kpi('Días efectivos', s.diasTrabajados, 'días con actividad registrada') +
      kpi('Horas', s.horas, s.horasPersona + ' horas-persona') +
      kpi('Media por día', s.horasPorDia + ' h', 'en los días trabajados') +
      kpi('Estado', s.terminado ? 'Terminado' : 'En curso', s.terminado ? 'cerrado el ' + fechaLarga(s.fechaFin) : 'sigue abierto', s.terminado ? 'ok' : '') +
      '</div>';

    html += '<div class="tarjeta"><table><thead><tr><th>Fase</th><th class="num">Días trabajados</th><th class="num">Horas</th>' +
      '<th>Desde</th><th>Hasta</th><th class="num">Días de calendario</th><th style="width:120px">Avance</th></tr></thead><tbody>';
    var porFase = {};
    c.fases.forEach(function (f) { porFase[f.id] = f; });
    c.duracionFases.forEach(function (d) {
      var f = porFase[d.id];
      html += '<tr><td>' + esc(d.nombre) + '</td>' +
        '<td class="num">' + d.dias + '</td>' +
        '<td class="num">' + d.horas + '</td>' +
        '<td>' + fechaLarga(d.desde) + '</td>' +
        '<td>' + fechaLarga(d.hasta) + '</td>' +
        '<td class="num">' + num(d.diasCalendario) + '</td>' +
        '<td>' + barra(f ? f.progreso : 0) + '</td></tr>';
    });
    html += '</tbody></table></div>';

    return html + '</section>';
  }

  /* 7. Resultado final */
  function seccionResultado(c) {
    var r = c.resultado;
    var html = '<section class="bloque" id="s7"><h2><span class="num">7</span> Resultado final: landing, genoma, publicación y venta</h2>' +
      '<p class="sub">El proyecto se considera terminado cuando los cuatro hitos están cerrados: landing page de producto publicada, ' +
      'genoma de marketing hecho, proyecto publicado y vendiendo.</p>';

    html += '<div class="kpis">' +
      kpi('Hitos cerrados', r.hitos.filter(function (h) { return h.estado === 'hecho'; }).length + ' / 4',
        r.cerrado ? 'proyecto cerrado de punta a punta' : 'todavía no está terminado', r.cerrado ? 'ok' : 'aviso') +
      kpi('Unidades vendidas', r.ventas.unidades, r.ventas.primeraVenta ? 'primera venta: ' + fechaLarga(r.ventas.primeraVenta) : 'sin primera venta', r.ventas.unidades ? 'ok' : '') +
      kpi('Ingresos', r.ventas.ingresos + ' ' + esc(r.ventas.moneda), 'registrados en el proyecto') +
      '</div>';

    html += '<div class="rejilla-2">';
    r.hitos.forEach(function (h) {
      html += '<div class="hito"><h4>' + esc(h.nombre) +
        '<span class="etq ' + clasePorEstado(h.estado) + '">' + esc(nom(h.estado)) + '</span></h4>' +
        barra(h.progresoFase) +
        '<div class="meta" style="color:var(--texto-3);font-size:12px">Fase al ' + h.progresoFase + '%' +
        (h.fecha ? ' · ' + fechaLarga(h.fecha) : '') +
        (h.url ? ' · <a href="' + esc(h.url) + '">' + esc(h.url) + '</a>' : '') + '</div>' +
        (h.notas ? '<div class="meta" style="color:var(--texto-2);font-size:12px;margin-top:5px">' + esc(h.notas) + '</div>' : '') +
        (h.faltan.length
          ? '<ul>' + h.faltan.map(function (x) {
              return '<li>' + esc(x.nombre) + ' <span class="etq ' + clasePorEstado(x.estado) + '">' + esc(nom(x.estado)) + '</span></li>';
            }).join('') + '</ul>'
          : '<div class="meta" style="color:var(--ok);font-size:12px;margin-top:5px">Nada pendiente en esta fase.</div>') +
        '</div>';
    });
    html += '</div>';

    return html + '</section>';
  }

  function pie() {
    return '<div class="pie">Projets Dashboard · datos en <code>data/proyectos/*.json</code> · ' +
      'modelo de fases en <code>data/pipeline.json</code> · calculado el ' + fechaLarga(M.aTexto(M.hoyUTC())) + '</div>';
  }

  function conectarFiltros(c) {
    var fase = $('#f-fase'), pri = $('#f-prioridad'), riesgo = $('#f-riesgo');
    if (!fase) return;
    function actualizar() {
      estado.filtros = { fase: fase.value, prioridad: pri.value, soloRiesgo: riesgo.checked };
      var scroll = window.scrollY;
      pintarProyecto(c.proyecto.id);
      window.scrollTo(0, scroll);
    }
    fase.addEventListener('change', actualizar);
    pri.addEventListener('change', actualizar);
    riesgo.addEventListener('change', actualizar);
  }

  /* ---------- enrutado ---------- */

  function enrutar() {
    var h = window.location.hash || '#/cartera';
    var m = h.match(/^#\/proyecto\/(.+)$/);
    if (m && estado.calculos[m[1]]) {
      estado.actual = m[1];
      pintarLateral();
      pintarProyecto(m[1]);
    } else if (h.indexOf('#s') === 0) {
      return; // ancla interna de la propia pagina
    } else {
      estado.actual = null;
      estado.filtros = {};
      pintarLateral();
      pintarCartera();
    }
    if (h.indexOf('#s') !== 0) window.scrollTo(0, 0);
  }

  /* ---------- arranque ---------- */

  cargar().then(function (datos) {
    estado.pipeline = datos.pipeline;
    estado.proyectos = datos.proyectos.slice().sort(function (a, b) {
      return String(a.nombre).localeCompare(String(b.nombre));
    });
    estado.proyectos.forEach(function (p) {
      estado.calculos[p.id] = M.calcular(p, estado.pipeline);
    });
    if (datos.indice && datos.indice.nombre) {
      $('#marca-nombre').textContent = datos.indice.nombre;
      $('#marca-desc').textContent = datos.indice.descripcion || '';
    }
    window.addEventListener('hashchange', enrutar);
    enrutar();
  }).catch(function (e) {
    $('#contenido').innerHTML = '<div class="tarjeta alerta"><h3>No se pudieron cargar los datos</h3>' +
      '<p>' + esc(e && e.message ? e.message : e) + '</p>' +
      '<p>Si has abierto el archivo directamente con doble clic, ejecuta <code>python3 tools/servir.py</code> ' +
      'o regenera el bundle con <code>python3 tools/build.py</code>.</p></div>';
  });

  $('#btn-imprimir').addEventListener('click', function () { window.print(); });
})();
