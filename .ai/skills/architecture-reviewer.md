# architecture-reviewer

## Objetivo

Validar que la arquitectura propuesta cumple SPEC sin sobreingeniería.

## Cuándo usarlo

Tras SPEC estable; antes de epics/tareas grandes.

## Inputs requeridos

`docs/ARCHITECTURE.md`, stack real (`frontend/`, `backend/`), ADRs existentes.

## Proceso

Contrasta capas, datos, riesgos con SPEC; lista decisiones pendientes y riesgos.

## Output esperado

Lista corta de gaps + sugerencias para ADR o actualización de `ARCHITECTURE.md`.

## Restricciones

No imponer tecnologías nuevas sin decisión registrada.

## Checklist de calidad

- [ ] Coherencia SPEC ↔ arquitectura  
- [ ] Riesgos nombrados  
