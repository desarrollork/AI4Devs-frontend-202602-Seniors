# Plan de implementación E10 — Kanban detalle de posición

**Proyecto**: LTI — Talent Tracking System  
**Alumno**: MJTR  
**Estado**: Entrega lista — tests frontend (`npm run test:ci`), CI actualizado, prompts en `/prompts` y `frontend/prompts`. Lista de posiciones sigue en mock (ids alineados con seed); sin `GET /positions` en backend.

**Validación**: `bash scripts/validate-local.sh` y guía `docs/validacion-y-calidad-E10.md`. CI: `.github/workflows/ci.yml`.

## Contexto API (verificado)

- `GET /position/:id/interviewflow` — cuerpo `{ interviewFlow: { positionName, interviewFlow: { id, interviewSteps[] } } }`
- `GET /position/:id/candidates` — array con `applicationId`, `id` (candidato), `currentInterviewStep` como nombre
- `PUT /candidates/:id` — body `{ applicationId, currentInterviewStep }` (ids). No usar `/stage`

## Fases

**Fase 0** — prompts + `docs/especificacion-inicial.md` — hecho  
**Fase 1** — `positionService.js`, types, `App.js`, `Positions.tsx` — hecho  
**Fase 2** — componentes `PositionDetail/*` — hecho  
**Fase 3** — D&D, optimistic + rollback — hecho  
**Fase 4** — build + `test:ci` + checklist manual en `validacion-y-calidad-E10.md` — hecho (E2E manual requiere Docker local)

## Archivos clave

`frontend/src/App.js`, `Positions.tsx`, `components/PositionDetail/*`, `services/positionService.js`, `types/position.types.ts`

## Verificación

1. PostgreSQL con docker-compose  
2. Backend puerto 3010  
3. Frontend puerto 3000  
4. `/positions` → Ver proceso → mover tarjeta → recargar y comprobar fase
