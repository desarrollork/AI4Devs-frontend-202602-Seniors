# Prompts de Desarrollo — LTI E10

Este archivo recoge los prompts utilizados durante la implementación del Kanban de detalle de posición.

---

## Fase 1 — Servicio API y routing

### positionService.js + types

```
Implementa positionService.js en frontend/src/services/ con tres funciones:
- getInterviewFlow(positionId): GET /position/:id/interviewflow
- getCandidates(positionId): GET /position/:id/candidates  
- updateStage(candidateId, applicationId, interviewStepId): PUT /candidates/:id

Usa axios. Ten en cuenta que la respuesta de interviewflow tiene doble anidación:
response.interviewFlow.interviewFlow.interviewSteps para los pasos,
response.interviewFlow.positionName para el título.

Crea también frontend/src/types/position.types.ts con las interfaces
InterviewStep, InterviewFlowResponse y CandidateInStep.
```

### Modificaciones App.js y Positions.tsx

```
Modifica App.js para añadir la ruta /positions/:id con el componente PositionDetail.
Modifica Positions.tsx para que el botón "Ver proceso" use useNavigate y navegue
a /positions/:positionId. Los mock positions necesitan un id numérico para la demo.
```

---

## Fase 2 — Componentes Kanban

```
Crea los siguientes componentes en frontend/src/components/PositionDetail/:

1. PositionDetail.tsx — Raíz: lee :id de useParams, carga interviewFlow y candidates
   con useEffect, construye candidatesByStepName (mapa nombre-step → candidatos),
   muestra título y botón volver, delega el render a KanbanBoard.

2. KanbanBoard.tsx — Grid de KanbanColumn, layout flex row en desktop, column en móvil.

3. KanbanColumn.tsx — Columna individual con cabecera (nombre del step), zona de drop,
   lista de CandidateCard. Altura mínima 80px con borde punteado si está vacía.

4. CandidateCard.tsx — Tarjeta arrastrable con fullName y averageScore
   (toFixed(1) o "—" si es 0). draggable="true".

Todos usan React Bootstrap para UI. Patrones del repo: componentes funcionales + hooks.
```

---

## Fase 3 — Drag & Drop

```
Implementa HTML5 Drag and Drop en los componentes:
- CandidateCard: onDragStart guarda candidateId, applicationId, fromStepName en dataTransfer
- KanbanColumn: onDragOver + onDrop reciben los datos y llaman al handler del padre
- PositionDetail: handleDrop hace optimistic update del estado local,
  llama a updateStage(candidateId, applicationId, toStepId),
  si falla restaura el snapshot y muestra Alert de error con Bootstrap
```

---

## Fase 4 — Polish y responsive

```
Añade:
- Spinner de react-bootstrap mientras se cargan los datos (loading state)
- Alert de error si falla la carga inicial
- Botón "← Volver a posiciones" con navigate('/positions')
- Responsive: flex-column en móvil, flex-row en ≥768px
- Zonas de drop vacías visualmente delimitadas
```
