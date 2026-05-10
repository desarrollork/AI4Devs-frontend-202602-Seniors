# AI_WORKFLOW

## Cursor Composer 2

Contexto explícito (SPEC, tarea, `@archivo`). Propuestas acotadas; sin refactors globales no pedidos. Una conversación ≈ una tarea.

## AutoSkills

Skills en `.ai/skills/` (índice `README.md`). Fases: spec → plan → implementación → tests → revisión.

## Crear SPEC

Plantilla `.ai/templates/feature-spec-template.md` → workflow `02-review-spec.md` → actualizar `PROJECT_SPEC.md` / `PRODUCT_REQUIREMENTS.md`.

## Dividir tareas

Workflow `04-breakdown-epics-stories-tasks.md` · registrar en `TASKS.md`.

## Implementar / revisar / probar

Workflows `05`, `07`, `06` · `TESTING_STRATEGY.md` · `scripts/validate-local.sh` o CI.

## Cuándo detenerse

Ambigüedad crítica · sin SPEC · auth/migraciones/PII sin plan.
