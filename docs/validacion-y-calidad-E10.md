# Validación y calidad — LTI E10

## Qué queda dentro y fuera del repositorio

| Ámbito | Qué incluye este repo | Qué depende del entorno Cursor |
|--------|----------------------|----------------------------------|
| Automatización | GitHub Actions (`ci.yml`), script `scripts/validate-local.sh`, regla `.cursor/rules/lti-e10-verificacion.mdc` | Skills/plugins (p. ej. verificación antes de completar, depuración) en tu instalación de Cursor |
| Hooks de agente | No se versionan aquí (viven en configuración local de Cursor) | Opcional: crear hooks con la skill de Cursor *create-hook* si quieres disparar lint al guardar |

## Fases del plan ↔ validación

| Fase | Comprobación automática | Comprobación manual |
|------|---------------------------|---------------------|
| 0 — Docs / prompts | — | Revisar `docs/especificacion-inicial.md` y `docs/plan-implementacion-E10.md` |
| 1 — API + routing | CI frontend + backend | Navegar `/positions` → `/positions/1` |
| 2 — Kanban | CI | Datos coherentes con seed Prisma |
| 3 — D&D | CI | Arrastrar tarjeta; recargar; fase persistida |
| 4 — Cierre | `bash scripts/validate-local.sh` | E2E con Docker + API en 3010 + app en 3000 |

## Comandos canónicos

```bash
# Una pasada local (equivale a CI)
cd AI4Devs-frontend-202602-Seniors
bash scripts/validate-local.sh
```

Backend por separado: `cd backend && npm ci && npx prisma generate && npm run build && npm test`  
Frontend por separado: `cd frontend && npm ci && CI=true npm run build`

## CI en GitHub

Workflow: `.github/workflows/ci.yml` — jobs en paralelo para backend y frontend en cada push/PR a ramas configuradas.

## Agentes / roles (referencia operativa)

No se empaquetan “agentes” en el repo; en Cursor puedes delegar según fase:

- Localización de rutas y contratos API → exploración dirigida del código.
- Cambios acotados 1–2 archivos → edición mínima.
- Antes de merge → revisión de diff frente a RF/RNF de `especificacion-inicial.md`.

## Tests existentes

- **Backend**: Jest (`backend/npm test`).
- **Frontend**: `npm run test:ci` (`react-scripts test`, `--watchAll=false`). Tests en `src/**/*.test.{js,tsx}` (`positionService`, `usePositionKanban`, `KanbanColumn`).

## Checklist manual entrega E10 (Docker + UI)

1. `docker-compose up -d` desde la raíz del repo (variables en `.env`).
2. `cd backend && npx prisma migrate dev && npx ts-node prisma/seed.ts` (o comandos ya usados en tu flujo).
3. Backend `npm run dev` (:3010); frontend `npm start` (:3000).
4. Abrir `/positions` → «Ver proceso» en posición id 1 o 2 → comprobar título y columnas.
5. Arrastrar una tarjeta a otra columna → recargar página → la fase debe persistir.
6. Parar backend y repetir movimiento → debe aparecer alerta de error y estado anterior restaurado (rollback optimista).

_En entorno de CI del agente no se ejecutó el servidor; validar localmente antes del PR._
