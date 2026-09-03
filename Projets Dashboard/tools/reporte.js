#!/usr/bin/env node
/*
 * Informe del panel en la terminal, con los mismos calculos que la web
 * (reutiliza assets/metricas.js: una sola fuente de verdad).
 *
 *   node tools/reporte.js               -> resumen de toda la cartera
 *   node tools/reporte.js konopy-coin   -> informe completo de un proyecto
 */
'use strict';
var fs = require('fs');
var path = require('path');

var RAIZ = path.dirname(__dirname);
var M = require(path.join(RAIZ, 'assets', 'metricas.js'));

function leer(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

var pipeline = leer(path.join(RAIZ, 'data', 'pipeline.json'));
var dirProyectos = path.join(RAIZ, 'data', 'proyectos');
var proyectos = fs.readdirSync(dirProyectos)
  .filter(function (n) { return n.endsWith('.json'); })
  .map(function (n) { return leer(path.join(dirProyectos, n)); })
  .sort(function (a, b) { return String(a.nombre).localeCompare(String(b.nombre)); });

function linea(t) { console.log(t == null ? '' : t); }
function titulo(t) { linea(''); linea(t); linea('-'.repeat(t.length)); }
function f(v) { return v == null ? '—' : v; }

function cartera() {
  linea('PROJETS DASHBOARD — resumen de cartera');
  linea('');
  proyectos.forEach(function (p) {
    var c = M.calcular(p, pipeline);
    var s = c.seguimiento;
    linea(
      pad(p.nombre, 16) + ' ' + pad(p.estado, 15) +
      pad(c.avance + '%', 7) +
      pad(c.pendientes.length + ' pend.', 10) +
      pad(c.alertas + ' aten.', 10) +
      pad(s.diasTrabajados + ' d trab.', 12) +
      'fin previsto ' + f(s.fechaProyectada) +
      (s.desvioObjetivo != null ? ' (' + (s.desvioObjetivo > 0 ? '+' : '') + s.desvioObjetivo + ' d vs objetivo)' : '')
    );
  });
  linea('');
  linea('Detalle de un proyecto:  node tools/reporte.js <id>');
  linea('Ids: ' + proyectos.map(function (p) { return p.id; }).join(', '));
}

function pad(s, n) {
  s = String(s == null ? '' : s);
  return s.length >= n ? s + ' ' : s + ' '.repeat(n - s.length);
}

function detalle(id) {
  var p = proyectos.filter(function (x) { return x.id === id; })[0];
  if (!p) {
    linea('No existe el proyecto "' + id + '". Ids: ' + proyectos.map(function (x) { return x.id; }).join(', '));
    process.exit(1);
  }
  var c = M.calcular(p, pipeline);
  var s = c.seguimiento;

  linea('=== ' + p.nombre + (p.ticker ? ' (' + p.ticker + ')' : '') + ' ===');
  linea(p.descripcion || '');
  linea('Estado: ' + p.estado + ' · responsable: ' + f(p.responsable) +
        ' · inicio: ' + f(p.fecha_inicio) + ' · objetivo: ' + f(p.fecha_objetivo));
  linea('Avance global: ' + c.avance + '%  ·  ' + s.unidadesHechas + '/' + s.unidadesTotal + ' requisitos');

  titulo('1. Pendiente (' + c.pendientes.length + ')');
  c.pendientes.forEach(function (t) {
    linea(' - [' + t.estado + '/' + t.prioridad + '] ' + t.titulo +
      ' · ' + t.fase + ' · ' + f(t.responsable) + ' · vence ' + f(t.vence) +
      (t.vencida ? ' (VENCIDA ' + Math.abs(t.diasParaVencer) + ' d)' : ''));
  });
  if (!c.pendientes.length) linea(' (nada pendiente)');

  titulo('2. Falta para estar completo (' + c.faltantes.length + ' requisitos)');
  c.fases.forEach(function (fa) {
    linea(' ' + pad(fa.nombre, 34) + pad(fa.progreso + '%', 7) + fa.unidadesHechas + '/' + fa.unidadesTotal);
    fa.requisitos.filter(function (r) { return r.estado !== 'hecho'; }).forEach(function (r) {
      linea('     · ' + r.nombre + ' [' + r.estado + ']');
    });
  });

  titulo('3. Necesita atencion');
  var a = c.atencion;
  linea(' Corridas en frio: ' + a.corridas.length + ' (' + a.corridasProblema.length + ' con incidencias o fallidas, ' +
        a.corridasSinReporte.length + ' sin reporte)');
  linea(' Reportes de frio: ' + a.reportes.length + ' · hallazgos abiertos: ' + a.hallazgosAbiertos.length +
        ' (' + a.hallazgosCriticos.length + ' criticos o altos)');
  a.hallazgosAbiertos.forEach(function (h) {
    linea(' - [' + h.severidad + '] ' + h.titulo);
    linea('     impacto: ' + f(h.impacto));
    linea('     mejora:  ' + f(h.mejora_propuesta));
  });
  a.bloqueadas.forEach(function (t) { linea(' - BLOQUEADA: ' + t.titulo + (t.notas ? ' — ' + t.notas : '')); });
  a.vencidas.forEach(function (t) { linea(' - VENCIDA: ' + t.titulo + ' (' + t.vence + ')'); });
  a.riesgos.forEach(function (r) { linea(' - RIESGO: ' + r.titulo + ' — ' + f(r.mitigacion)); });

  titulo('4. Seguimiento interno');
  linea(' Dias trabajados: ' + s.diasTrabajados + ' de ' + f(s.diasCalendario) + ' de calendario (cadencia ' + s.cadencia + '%)');
  linea(' Horas: ' + s.horas + ' (' + s.horasPorDia + ' h/dia) · horas-persona: ' + s.horasPersona);
  linea(' Arranque en blanco: ' + f(s.arranqueEnBlanco) + ' d · sin tocar desde hace: ' + f(s.huecoActual) + ' d');
  linea(' Pausas de ' + M.HUECO_MINIMO_DIAS + ' dias o mas: ' + s.huecos.length);
  s.huecos.forEach(function (h) { linea('   · ' + h.desde + ' → ' + h.hasta + ': ' + h.dias + ' dias parados'); });
  linea(' Estimacion inicial: ' + f(s.estimacionInicial) + ' d · vigente: ' +
        (s.estimacionVigente ? s.estimacionVigente.dias_restantes + ' d (' + s.estimacionVigente.fecha + ')' : '—'));
  linea(' Faltan al ritmo real: ' + f(s.diasTrabajoRestantes) + ' dias de trabajo / ' +
        f(s.diasCalendarioRestantes) + ' de calendario → fin ' + f(s.fechaProyectada) +
        (s.desvioObjetivo != null ? ' (' + (s.desvioObjetivo > 0 ? '+' : '') + s.desvioObjetivo + ' d vs objetivo)' : ''));

  titulo('5. Dias trabajados y lo elaborado');
  s.bitacora.slice().reverse().forEach(function (b) {
    linea(' ' + b.fecha + '  ' + pad(b.horas + ' h', 7) + pad(b.fase || '', 16) + (b.elaborado || []).join('; '));
  });
  if (!s.bitacora.length) linea(' (bitacora vacia)');

  titulo('6. Duracion');
  linea(' Calendario: ' + f(s.diasCalendario) + ' dias (' + f(s.fechaInicio) + ' → ' + (s.terminado ? s.fechaFin : 'hoy') + ')');
  linea(' Efectivos: ' + s.diasTrabajados + ' dias · ' + s.horas + ' horas');
  c.duracionFases.forEach(function (d) {
    if (!d.dias) return;
    linea('   ' + pad(d.nombre, 34) + pad(d.dias + ' d', 7) + pad(d.horas + ' h', 9) + d.desde + ' → ' + d.hasta);
  });

  titulo('7. Resultado final');
  c.resultado.hitos.forEach(function (h) {
    linea(' ' + pad(h.nombre, 30) + pad(h.estado, 14) + 'fase al ' + h.progresoFase + '%' +
      (h.url ? ' · ' + h.url : ''));
    h.faltan.forEach(function (x) { linea('     falta: ' + x.nombre + ' [' + x.estado + ']'); });
  });
  linea(' Ventas: ' + c.resultado.ventas.unidades + ' unidades · ' +
        c.resultado.ventas.ingresos + ' ' + c.resultado.ventas.moneda +
        ' · primera venta: ' + f(c.resultado.ventas.primeraVenta));
  linea('');
  linea(c.resultado.cerrado ? 'PROYECTO CERRADO de punta a punta.' : 'PROYECTO NO TERMINADO: faltan hitos por cerrar.');
}

var arg = process.argv[2];
if (arg) detalle(arg); else cartera();
