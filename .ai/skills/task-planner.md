# task-planner

## Objetivo

Dividir trabajo en tareas pequeñas con archivos y tests explícitos.

## Cuándo usarlo

Después de SPEC/PRD; antes de implementar.

## Inputs requeridos

SPEC, `docs/TASKS.md`, plantilla `.ai/templates/task-template.md`.

## Proceso

Epics → historias → tasks con ID, archivos implicados, exclusiones.

## Output esperado

Filas en backlog `docs/TASKS.md` o issues enlazados.

## Restricciones

Una tarea = conjunto coherente de archivos; sin mezclar features.

## Checklist de calidad

- [ ] Criterios de aceptación por tarea  
- [ ] Tests requeridos indicados  
