# Especificación Inicial — LTI Talent Tracking System

**Proyecto**: LTI — Talent Tracking System
**Entrega**: E10 — Vista detalle de posición (Kanban)
**Alumno**: Manuel Jesús Torralbo Rodríguez (MJTR)
**Fecha límite**: 10 de mayo de 2026
**Rama de entrega**: `frontend-mjtr`
**Versión del documento**: 1.0.1

---

## 1. Resumen Ejecutivo

**LTI (Talent Tracking System)** es una herramienta interna de RRHH diseñada para que reclutadores y managers de contratación gestionen candidatos y procesos de selección de forma centralizada.

**Problema que resuelve**: Los equipos de selección necesitan saber en todo momento qué candidatos están en cada fase del proceso de una posición concreta y poder avanzarlos a la siguiente etapa sin fricciones ni herramientas externas.

**Propuesta de valor para E10**: Una vista de detalle de posición con tablero Kanban donde cada columna representa una fase del flujo de entrevistas. El reclutador puede ver los candidatos, su puntuación media y cambiar su etapa arrastrando la tarjeta — todo desde una única pantalla, sin abandonar la aplicación.

**Stack**: React (Create React App) + Express/TypeScript + Prisma + PostgreSQL. Sin dependencias de servicios externos para esta entrega.

---

## 2. Objetivos del Proyecto

### Objetivos principales
- Implementar la vista de detalle de posición (`/positions/:id`) con tablero Kanban por fases del proceso de entrevista.
- Integrar los tres endpoints definidos en el backend: `GET /position/:id/interviewflow`, `GET /position/:id/candidates`, `PUT /candidates/:id`.
- Permitir cambiar la fase de un candidato arrastrando su tarjeta a otra columna, persistiendo el cambio en backend.
- Conectar el botón "Ver proceso" de `Positions.tsx` para navegar a la vista de detalle.

### Objetivos secundarios
- Conectar `Positions.tsx` a datos reales del backend (en lugar de mock data) para disponer del `id` real de cada posición.
- Garantizar un layout responsive: columnas horizontales en escritorio, columnas apiladas verticalmente en móvil.
- Mantener coherencia visual con los componentes existentes (React Bootstrap).

### Fuera de alcance para E10
- Autenticación y autorización de usuarios.
- Crear, editar o eliminar posiciones.
- Crear o editar candidatos desde esta vista.
- Añadir nuevos endpoints en el backend.
- Internacionalización (i18n).
- Tests automatizados (no exigidos en la entrega).

---

## 3. Alcance del MVP

### Funcionalidades obligatorias
- Página `/positions/:id` accesible desde el botón "Ver proceso" de cada posición.
- Título de la posición visible en la cabecera de la vista.
- Columnas Kanban por fase (interviewStep), ordenadas por `orderIndex`.
- Tarjeta por candidato con nombre completo (`fullName`) y puntuación media (`averageScore`, 1 decimal; "—" si es 0 o nulo).
- Drag & drop para mover tarjetas entre columnas.
- Al soltar, llamada `PUT /candidates/:id` con el nuevo step; si falla, rollback a la columna original.
- Botón o breadcrumb para volver a `/positions`.
- Diseño responsive: columnas verticales a ancho completo en pantallas < 768px.

### Funcionalidades opcionales
- Loading skeleton mientras se cargan los datos.
- Optimistic UI: mover la tarjeta visualmente antes de que confirme el servidor.
- Toast o alerta de error cuando el PUT falla.

### Funcionalidades excluidas
- Filtros y búsqueda en el Kanban.
- Detalle individual del candidato.
- Historial de cambios de fase.
- Añadir/quitar candidatos de la posición desde esta vista.

### Criterios para considerar terminado el MVP
- La vista carga datos reales de los tres endpoints (con el backend y Docker arriba).
- Se pueden ver candidatos en sus columnas correspondientes.
- Arrastrar una tarjeta a otra columna actualiza `currentInterviewStep` en base de datos (verificable con GET tras el PUT).
- Si el PUT devuelve error, la tarjeta vuelve a su columna original.
- La vista es funcional en móvil (columnas apiladas, tarjetas legibles).
- El botón "Volver" regresa a `/positions`.

---

## 4. Usuarios y Roles

### Reclutador
**Descripción**: Usuario principal de la herramienta. Gestiona candidatos y hace seguimiento diario del estado de los procesos.
**Permisos**: Lectura de posiciones y candidatos; escritura del campo `currentInterviewStep` de una application.
**Acciones principales**: Ver el tablero Kanban de una posición, consultar candidatos y scores, mover candidatos entre fases.
**Restricciones en E10**: Ninguna (no hay auth implementado).

### Manager de contratación
**Descripción**: Responsable de la toma de decisión final. Consulta el estado del proceso con menos frecuencia.
**Permisos**: Mismos que el reclutador en E10.
**Acciones principales**: Revisar qué candidatos están en cada fase y sus puntuaciones.
**Restricciones en E10**: Ninguna (no hay roles implementados).

> **Nota**: La autenticación y la gestión de roles están fuera del alcance de E10. Cualquier usuario con acceso a la URL puede operar la vista.

---

## 5. Requisitos Funcionales

| ID | Requisito |
|----|-----------|
| RF-001 | Desde `/positions`, el botón "Ver proceso" de cada posición navega a `/positions/:id` pasando el id real de la posición. |
| RF-002 | `/positions/:id` muestra el título de la posición en la cabecera, obtenido del backend. |
| RF-003 | El sistema obtiene las fases del flujo de entrevista llamando a `GET /position/:id/interviewflow`. |
| RF-004 | Las columnas del Kanban se muestran ordenadas por el campo `orderIndex` de cada `InterviewStep`. |
| RF-005 | El sistema obtiene los candidatos en proceso llamando a `GET /position/:id/candidates`. |
| RF-006 | Cada candidato aparece como tarjeta en la columna que corresponde a su `currentInterviewStep` (nombre de fase). |
| RF-007 | La tarjeta muestra el `fullName` del candidato y su `averageScore` formateado a 1 decimal (o "—" si es 0 o nulo). |
| RF-008 | El usuario puede arrastrar una tarjeta y soltarla en otra columna. |
| RF-009 | Al soltar la tarjeta en una nueva columna, el sistema llama a `PUT /candidates/:candidateId` con body `{ applicationId: number, currentInterviewStep: number }` donde `currentInterviewStep` es el **id** del `InterviewStep` destino. |
| RF-010 | Si el `PUT` devuelve error, la tarjeta vuelve visualmente a su columna original y se muestra feedback de error al usuario. |
| RF-011 | Existe un botón "Volver" o breadcrumb que regresa a `/positions`. |
| RF-012 | En pantallas < 768px las columnas se apilan verticalmente a ancho completo del viewport. |
| RF-013 | Mientras se cargan los datos, la vista muestra un indicador de carga (spinner o skeleton). |

---

## 6. Requisitos No Funcionales

| ID | Área | Requisito |
|----|------|-----------|
| RNF-001 | Rendimiento | El tablero debe ser interactuable en menos de 2 segundos para una posición con hasta 20 candidatos y 6 fases, en conexión local. |
| RNF-002 | Responsividad | Layout adaptable: columnas horizontales en ≥ 768px, columnas verticales apiladas en < 768px. Las tarjetas deben ser legibles en ambas orientaciones. |
| RNF-003 | Accesibilidad | El drag & drop debe tener una alternativa de teclado o al menos un indicador visible de que la acción está en curso. Los contrastes de color siguen AA (ya garantizado por Bootstrap 5). |
| RNF-004 | Mantenibilidad | Los componentes siguen el principio de responsabilidad única. Las llamadas a la API se encapsulan en `positionService.js`, separadas de la lógica de UI. |
| RNF-005 | Compatibilidad | La vista debe funcionar en Chrome, Firefox y Safari (últimas 2 versiones de cada uno en Mac y Windows). |
| RNF-006 | Observabilidad | Los errores de las llamadas API se registran en `console.error` con contexto, y se muestra un mensaje legible al usuario en la UI. |
| RNF-007 | Privacidad | No se almacenan datos de candidatos en `localStorage` ni `sessionStorage`. |
| RNF-008 | Usabilidad | Las columnas Kanban tienen un área de drop claramente delimitada y visible, especialmente cuando están vacías. |

---

## 7. Reglas de Negocio

| ID | Regla |
|----|-------|
| RB-001 | Un candidato ocupa una única fase en un momento dado por posición; `Application.currentInterviewStep` contiene el `id` del `InterviewStep` en el que está actualmente. |
| RB-002 | El orden de las columnas lo determina `InterviewStep.orderIndex`, no el orden de inserción ni el `id`. |
| RB-003 | `averageScore` lo calcula el backend como media de `Interview.score` para las entrevistas asociadas a esa aplicación. El frontend no recalcula este valor. |
| RB-004 | El campo `currentInterviewStep` en el body del `PUT /candidates/:id` debe ser el **id** (`integer`) del `InterviewStep` destino, no su nombre. El frontend resuelve el id buscando en los datos del interviewFlow. |
| RB-005 | El `applicationId` necesario para el `PUT` está disponible en la respuesta de `GET /position/:id/candidates` (campo `applicationId`), aunque este campo no figura en `api-spec.yaml`. Está confirmado en la implementación real de `positionService.ts:28`. |
| RB-006 | Una tarjeta solo puede moverse a columnas del mismo `interviewFlow` que la posición. No se pueden mezclar candidatos de posiciones distintas. |

---

## 8. Entidades Principales del Dominio

### Position
**Descripción**: Vacante publicada por una empresa para cubrir un puesto.
**Atributos principales**: `id`, `title`, `description`, `status` (Draft/Open/Closed/Hired), `isVisible`, `location`, `applicationDeadline`, `interviewFlowId`, `companyId`.
**Relaciones**: Pertenece a `Company`; tiene un `InterviewFlow`; tiene muchas `Application`.

### InterviewFlow
**Descripción**: Proceso de selección definido para una posición; agrupa las fases en orden.
**Atributos principales**: `id`, `description`.
**Relaciones**: Tiene muchos `InterviewStep`; es usado por una o más `Position`.

### InterviewStep
**Descripción**: Fase individual del proceso de selección (ej. "CV Review", "Technical Interview").
**Atributos principales**: `id`, `name`, `orderIndex`, `interviewFlowId`, `interviewTypeId`.
**Relaciones**: Pertenece a `InterviewFlow`; referenciado por `Application.currentInterviewStep`.

### Candidate
**Descripción**: Persona que postula a una o más posiciones.
**Atributos principales**: `id`, `firstName`, `lastName`, `email`, `phone`, `address`.
**Relaciones**: Tiene muchas `Application`, `Education`, `WorkExperience`, `Resume`.

### Application
**Descripción**: Relación entre un candidato y una posición. Registra en qué fase está el candidato.
**Atributos principales**: `id`, `positionId`, `candidateId`, `applicationDate`, `currentInterviewStep` (FK a `InterviewStep.id`), `notes`.
**Relaciones**: Pertenece a `Candidate` y a `Position`; tiene muchas `Interview`; referencia a un `InterviewStep` activo.

### Interview
**Descripción**: Registro de una evaluación concreta realizada a un candidato en una fase.
**Atributos principales**: `id`, `applicationId`, `interviewStepId`, `employeeId`, `interviewDate`, `score`, `result`, `notes`.
**Relaciones**: Pertenece a `Application` y a `InterviewStep`; la conduce un `Employee`.

---

## 9. Arquitectura Inicial Recomendada

### Tipo de arquitectura
SPA (Single Page Application) con API REST. El frontend consume la API del backend; no hay SSR ni BFF.

### Separación frontend / backend
| Capa | Tecnología | Puerto |
|------|-----------|--------|
| Frontend | React (CRA) | 3000 |
| Backend API | Express + TypeScript | 3010 |
| Base de datos | PostgreSQL (Docker) | 5432 |
| ORM | Prisma | — |

### Capas del frontend (E10)

```
UI Components (React)
      ↓ llama
Service Layer (positionService.js)
      ↓ HTTP (axios)
Backend REST API (/position/:id/interviewflow, /position/:id/candidates, /candidates/:id)
      ↓
Prisma ORM → PostgreSQL
```

### Módulos del frontend a crear

| Módulo | Responsabilidad |
|--------|----------------|
| `PositionDetail` | Componente raíz: carga datos, gestiona estado del Kanban, coordina D&D |
| `KanbanBoard` | Grid de columnas; distribuye candidatos por fase |
| `KanbanColumn` | Columna individual; zona de drop; lista de tarjetas |
| `CandidateCard` | Tarjeta arrastrable; muestra nombre y score |
| `positionService.js` | Abstracción de las 3 llamadas API |
| `position.types.ts` | Interfaces TypeScript para Position, InterviewStep, CandidateInStep |

### Drag & Drop

**Opción recomendada para E10**: HTML5 Drag and Drop API nativa (sin dependencias extra).

- `draggable="true"` en `CandidateCard`.
- `onDragStart` guarda el `applicationId` y `candidateId` en `dataTransfer`.
- `onDragOver` / `onDrop` en `KanbanColumn` gestionan la zona de destino.
- Al hacer `drop` se llama `updateStage` en `positionService.js`; si falla, se restaura el estado previo.

**Alternativa**: `@hello-pangea/dnd` (fork activo de `react-beautiful-dnd`). Más accesible y con animaciones incluidas, pero requiere instalar la dependencia. Adecuado si la accesibilidad de teclado es prioritaria.

### Gestión de estado

`useState` local en `PositionDetail` para `steps` (columnas) y `candidatesByStep` (mapa de candidatos por step). No se requiere Context ni Redux para E10.

### Riesgos técnicos

| Riesgo | Descripción | Mitigación |
|--------|-------------|-----------|
| Doble anidación en interviewflow | La respuesta de `GET /position/:id/interviewflow` es `{ interviewFlow: { positionName, interviewFlow: { id, interviewSteps } } }`. Hay que acceder a `response.interviewFlow.interviewFlow.interviewSteps`. | Documentar y testear manualmente contra el backend real antes de codificar. |
| Posiciones en mock data | `Positions.tsx` sigue usando mock con `id` numérico para demo; no consume aún `GET /positions` si se expone en API. | Conectar a listado real cuando exista endpoint estable, o mantener ids alineados con el seed de Prisma. |
| `currentInterviewStep` string vs integer | GET devuelve el **nombre** del step; PUT espera el **id** del step. | El frontend resuelve el id buscando en el array `interviewSteps` por coincidencia de nombre antes de llamar al PUT. |

---

## 10. Estructura Inicial de Carpetas

Solo se listan los cambios respecto al estado actual del repositorio. Los archivos existentes no se modifican salvo `App.js` y `Positions.tsx`.

```
AI4Devs-frontend-202602-Seniors/
├── docs/
│   ├── especificacion-inicial.md           (este archivo)
│   └── plan-implementacion-E10.md          # Plan de ejecución por fases y checklist
└── frontend/
    ├── prompts/
    │   ├── prompts-iniciales.md            ← NUEVO (requisito entrega)
    │   └── prompts.md                      ← NUEVO (requisito entrega)
    └── src/
        ├── App.js                          ← MODIFICAR: añadir ruta /positions/:id
        ├── components/
        │   ├── PositionDetail/             ← NUEVO
        │   │   ├── PositionDetail.tsx      # Raíz: fetch, estado, layout
        │   │   ├── KanbanBoard.tsx
        │   │   ├── KanbanColumn.tsx
        │   │   └── CandidateCard.tsx
        │   ├── RecruiterDashboard.js       (sin cambios)
        │   ├── AddCandidateForm.js       (sin cambios)
        │   ├── FileUploader.js             (sin cambios)
        │   └── Positions.tsx               ← MODIFICAR: "Ver proceso" + ids (mock o API)
        ├── services/
        │   ├── candidateService.js         (sin cambios)
        │   └── positionService.js          ← NUEVO
        └── types/
            └── position.types.ts           ← NUEVO
```

---

## 11. Epics

### Epic 1: Navegación y routing
**Descripción**: Habilitar la navegación desde la lista de posiciones hasta la vista de detalle.
**Objetivo**: Que el usuario pueda hacer clic en "Ver proceso" y llegar a la URL correcta con el id de la posición.
**Incluye**:
- Añadir `<Route path="/positions/:id" element={<PositionDetail />} />` en `App.js`.
- Modificar el botón "Ver proceso" en `Positions.tsx` para usar `useNavigate` o `<Link>` con el id real de la posición.
- Conectar `Positions.tsx` a datos reales del backend (o usar id conocido para pruebas de desarrollo).
- Componente `PositionDetail` con estructura básica que lee `:id` de los params y muestra título de posición.

### Epic 2: Tablero Kanban
**Descripción**: Renderizar el tablero con columnas y tarjetas a partir de los datos del backend.
**Objetivo**: El reclutador puede ver en qué fase está cada candidato.
**Incluye**:
- `positionService.js`: función `getInterviewFlow(id)` → llama a `GET /position/:id/interviewflow`.
- `positionService.js`: función `getCandidates(id)` → llama a `GET /position/:id/candidates`.
- `PositionDetail` llama a ambos servicios con `useEffect` y construye el estado `candidatesByStep`.
- `KanbanBoard` renderiza una `KanbanColumn` por cada step, ordenadas por `orderIndex`.
- `KanbanColumn` muestra una `CandidateCard` por cada candidato en esa fase.
- `CandidateCard` muestra `fullName` y `averageScore`.

### Epic 3: Drag & Drop y persistencia
**Descripción**: Permitir mover candidatos entre fases y persistir el cambio en backend.
**Objetivo**: El cambio de fase es real y durable; si falla, el tablero vuelve al estado anterior.
**Incluye**:
- Implementar D&D nativo (o con librería): `draggable`, `onDragStart`, `onDragOver`, `onDrop`.
- `positionService.js`: función `updateStage(candidateId, applicationId, newInterviewStepId)` → llama a `PUT /candidates/:candidateId`.
- Lógica de rollback: guardar snapshot del estado antes del drop; restaurar si el PUT falla.
- Feedback de error al usuario si el PUT falla (alert de Bootstrap o toast).

### Epic 4: UI/UX y responsive
**Descripción**: Pulir la experiencia visual y garantizar el comportamiento en móvil.
**Objetivo**: La vista es usable en escritorio y en móvil, coherente con el resto de la aplicación.
**Incluye**:
- Columnas en layout horizontal (flex/grid) en ≥ 768px.
- Columnas apiladas verticalmente a ancho completo en < 768px (usando breakpoints de Bootstrap).
- Spinner o skeleton mientras se cargan datos.
- Zonas de drop vacías visualmente delimitadas (ej. borde punteado con altura mínima).
- Botón "← Volver a posiciones" que hace `navigate('/positions')`.

---

## Apéndice: Contrato API verificado

> Los siguientes contratos se basan en el código real del backend, **no** solo en `api-spec.yaml`.

### GET `/position/:id/interviewflow`

**Respuesta 200**:
```json
{
  "interviewFlow": {
    "positionName": "Senior Backend Engineer",
    "interviewFlow": {
      "id": 1,
      "description": "Standard engineering flow",
      "interviewSteps": [
        { "id": 1, "name": "CV Review", "orderIndex": 1, "interviewFlowId": 1, "interviewTypeId": 1 },
        { "id": 2, "name": "Technical Interview", "orderIndex": 2, "interviewFlowId": 1, "interviewTypeId": 2 }
      ]
    }
  }
}
```
⚠️ La respuesta tiene doble anidación: `response.interviewFlow.interviewFlow.interviewSteps` para acceder a los pasos. `response.interviewFlow.positionName` para el título.

---

### GET `/position/:id/candidates`

**Respuesta 200**:
```json
[
  {
    "fullName": "Albert Saelices",
    "currentInterviewStep": "CV Review",
    "averageScore": 7.5,
    "id": 3,
    "applicationId": 12
  }
]
```
> `id` es el `Candidate.id`; `applicationId` es el `Application.id`. Ambos son necesarios para el `PUT`.
> `currentInterviewStep` es el **nombre** del step (string), no el id.

---

### PUT `/candidates/:id`

**⚠️ La URL es `/candidates/:id`, NO `/candidates/:id/stage`** — el enunciado del ejercicio tiene un error.

**Request body**:
```json
{
  "applicationId": 12,
  "currentInterviewStep": 2
}
```
> `currentInterviewStep` es el **id** del `InterviewStep` destino (integer).

**Respuesta 200**:
```json
{
  "message": "Candidate stage updated successfully",
  "data": {
    "id": 12,
    "positionId": 1,
    "candidateId": 3,
    "applicationDate": "2024-01-15T10:00:00.000Z",
    "currentInterviewStep": 2,
    "notes": null,
    "interviews": []
  }
}
```
