# FieldOps — YaCleaning Adaptation

Especificación v0.1 (borrador a partir de las notas del dueño). Dos líneas de negocio:

- **Construction cleaning** (proyectos, GCs, bids, foremen en campo)
- **Janitorial / post-janitorial** (limpieza nocturna de oficinas, maintenance)

---

## 1. Roles y permisos

| Rol | Línea | Qué hace en el sistema |
|---|---|---|
| Admin (oficina) | Ambas | Aprueba change orders, revisa invoices, ve reportes |
| Sales | Ambas | Leads, llamadas, propuestas, bids, chat/historial con el cliente |
| Project Manager | Construction | Asignado al proyecto; ve bids, GCs, costos, change orders |
| Foreman | Construction | Clock in/out, daily report, solicita extras/materiales/change orders, reporta incidentes |
| Worker / Janitor | Ambas | Clock in/out con foto + geolocalización, sube fotos antes/después |
| Delivery / Office-Warehouse | Oficina | Entregas de materiales, inventario |
| Maintenance | Janitorial | **No tiene PM** → supervisor/lead de maintenance (por definir) |
| Owner | Todas | Dashboards, job costing, reporte semanal |

Regla: los workers solo ven su turno y suben fotos; no ven precios ni change orders.

## 2. Módulos

### 2.1 Inquiry → Job (tracking tipo Jobber)
- Formulario público (web) donde el **cliente llena su propia info** → crea *Inquiry*.
- Triggers al crear Inquiry / Job Request: notificar a Sales, crear tarea de seguimiento, abrir hilo de chat.
- Estados: `Inquiry → Contacted → Site Visit → Proposal Sent → Won/Lost → Active → Completed → Invoiced → Paid`.
- Al ganar: asignar **PM**, **Foreman** y **Sales owner**.

### 2.2 Proyecto
- Datos: cliente/GC, dirección, **coordenadas (obligatorias al registrar)**, geofence, PM, foreman, fechas.
- **Job costing**: presupuesto por rubro (labor, materiales, subs, equipo) vs real → saldo disponible para comisión y margen.

### 2.3 Clock in / out + Geofence
- Foto selfie **dentro del sitio** + timestamp + GPS en cada clock in y out.
- Validación: distancia al punto del proyecto ≤ **100 ft** (configurable por proyecto; en downtown puede requerir ajuste por tiempo de metro/estacionamiento).
- Fuera de rango → se bloquea o se marca "pendiente de aprobación" (decisión abierta).
- Registro guardado como timestamp inmutable → base de nómina y job costing.

### 2.4 Daily Report (Foreman)
Cada día el foreman reporta; cada opción dispara una acción:

| Evento | Trigger / siguiente persona |
|---|---|
| Trabajo extra solicitado | Notifica a admin → **admin aprueba ANTES** de ejecutar; se marca como cobrable |
| Materiales extra | Notifica a delivery/warehouse + PM |
| Retrasos (otros trades estorbando) | Notifica a PM; queda log para justificar cargos/tiempo |
| Incidente en sitio | Alerta inmediata a PM + owner |
| Lesión | Alerta urgente + formulario de incidente (seguro/OSHA) |
| Super del GC pide trabajo adicional | Crea **Change Order** en borrador |
| Fotos | Antes/después, avance |

### 2.5 Change Orders
1. Foreman (o PM) solicita → 2. Admin revisa/aprueba (se envía email al GC) → 3. Se libera el trabajo y se agrega a job costing e invoice.
Sin aprobación no se puede registrar como trabajo cobrable.

### 2.6 Fotos / Marketing
- Cualquier worker toma foto desde la app (sin necesidad de ser PM).
- Etiquetas: before / after / change order / incidente. Banco de fotos para marketing.

### 2.7 Sales
- Seguimiento y llamadas de leads, creación de **proposals** y envío directo al email del cliente.
- Chat por cliente con historial (notas + correos + llamadas).
- Acceso a bids y proceso con GCs.

### 2.8 Facturación
- QuickBooks (sync de customers, invoices, pagos). "Oracle Text" → **aclarar** (¿SMS/texto? ¿Oracle NetSuite?).
- Pantalla "Invoices que necesitan atención" (sin enviar, vencidas, sin cobrar vs labor ya gastada).

### 2.9 Fuentes de trabajo (bids)
BuildingConnected, Pipeline Suite, PlanHub, Autodesk, Procore. Fase 1: registro manual/forward de invitaciones por email; Fase 2: integración donde exista API.

### 2.10 Permit Report (Houston)
Fuente: <https://houstontx.gov/planning/Publications/listsrv/WebeReport.html>. Importar reporte periódico, filtrar por tipo/zona y generar leads para Sales.

### 2.11 Topline Pro
Integración/CRM existente. **Las credenciales no van en este repo ni en el código** — se configuran como secretos del entorno (ver §7).

## 3. Reportes

**Diario:** clock-ins, proyectos activos, incidentes, extras pendientes de aprobación.
**Semanal (fin de semana):**
- Invoices enviadas / pendientes / que necesitan atención
- Proyectos activos
- Ingreso facturado vs cobrado
- **Costo de labor y costos pagados**
- **Pérdida/ganancia por proyecto** (el dolor principal: se gasta mucho en labor vs lo que se cobra)
- Alertas: proyectos donde labor > X% del contrato

## 4. Modelo de datos (resumen)

`Client/GC` · `Contact` · `Inquiry` · `Proposal` · `Project`(lat,lng,radio_ft,pm,foreman,tipo) · `Assignment` · `Worker` · `TimeEntry`(in/out, foto, gps, distancia) · `DailyReport` · `ReportEvent` · `ChangeOrder`(estado, aprobado_por) · `Photo` · `CostItem` · `Invoice` · `Notification` · `ChatMessage` · `Permit` · `Bid`

## 5. Plataforma (recomendación)

Se mencionó Quickbase. Opciones:
1. **Quickbase** — rápido para formularios/flujos/reportes; app móvil y geofence/foto más limitados.
2. **App propia** (PWA móvil + backend) — control total de geofence, fotos y offline.

Recomendación: **PWA + backend (Postgres)** para clock in/geofence/fotos/daily report, con QuickBooks vía API. Se puede prototipar el flujo en Quickbase mientras tanto.

## 6. Fases

- **Fase 1 (MVP):** Proyectos con coordenadas, clock in/out con foto + geofence, daily report con triggers, change orders con aprobación.
- **Fase 2:** Sales (inquiries, proposals por email, chat), job costing, reporte semanal.
- **Fase 3:** QuickBooks, permit report Houston, bids (BuildingConnected/PlanHub/Procore).
- **Fase 4:** Janitorial: rutas nocturnas, checklists, maintenance.

## 7. Seguridad

- Credenciales de Topline Pro (y cualquier otra) **no se guardan en el repo**. Las compartidas en el chat deben considerarse expuestas → **cambiar la contraseña**.
- Secretos vía variables de entorno / gestor de secretos.
- Fotos de selfie y GPS = datos personales: aviso y consentimiento a empleados.

## 8. Preguntas abiertas

1. ¿Quickbase o app propia? ¿Cuántos usuarios (workers/foremen)?
2. Clock in fuera de los 100 ft: ¿bloquear o permitir con aprobación?
3. ¿Quién supervisa maintenance sin PM?
4. "Oracle Text": ¿qué es exactamente?
5. ¿Idiomas de la app (ES/EN)? Los workers probablemente necesitan español.
6. ¿Pago de comisión: fórmula sobre margen del job costing?
7. ¿Android, iPhone o ambos?
8. Horarios de Zoom durante la semana para validar flujos.
