# Entrega ejercicio E10 — MJTR

**Alumno:** Manuel Jesús Torralbo Rodríguez  
**Iniciales:** MJTR  
**Repositorio:** [desarrollork/AI4Devs-frontend-202602-Seniors](https://github.com/desarrollork/AI4Devs-frontend-202602-Seniors)  
**Rama:** `frontend-mjtr`  
**Pull Request:** [#1 — Frontend mjtr](https://github.com/desarrollork/AI4Devs-frontend-202602-Seniors/pull/1)

## Contenido entregado (según enunciado)

| Requisito | Ubicación |
|-----------|-----------|
| Cambios frontend (Kanban, detalle posición, D&D, consumo API) | `frontend/src/` |
| `prompts-iniciales.md` | `prompts/prompts-iniciales.md` |
| `prompts.md` | `prompts/prompts.md` |

Copia de trabajo en `frontend/prompts/` para comodidad local.

## APIs utilizadas (backend de este repo)

No coinciden literalmente con el PDF del enunciado (`/positions` plural, `/stage`): el cliente usa las rutas reales montadas en Express:

- `GET /position/:id/interviewflow`
- `GET /position/:id/candidates`
- `PUT /candidates/:id` con `{ applicationId, currentInterviewStep }` (id numérico de paso)

## Validación recomendada

```bash
bash scripts/validate-local.sh
```

Manual: Docker PostgreSQL, migraciones + seed, backend `:3010`, frontend `:3000`, flujo `/positions` → Ver proceso → mover tarjeta → recargar.

## Texto sugerido para la descripción del PR (GitHub)

_Puedes pegar esto en el primer comentario del PR si sigue vacío:_

---

**E10 — Vista detalle de posición (Kanban)** — MJTR

- Lista `/positions` → detalle `/positions/:id` con título, volver atrás, columnas por fase del flujo, tarjetas con nombre y puntuación media.
- Arrastrar tarjetas entre columnas + actualización optimista y rollback si falla la API.
- Responsive: columnas apiladas en móvil (`flex-column` / `flex-md-row`).
- Tests: `cd frontend && npm run test:ci`.
- Prompts: `prompts/prompts-iniciales.md`, `prompts/prompts.md`.

Validación: `bash scripts/validate-local.sh`.

---
