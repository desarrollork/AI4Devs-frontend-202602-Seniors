# refactor-planner

## Objetivo

Planear refactor sin cambiar comportamiento observable.

## Cuándo usarlo

Deuda técnica localizada; antes de `08-refactor-safely.md`.

## Inputs requeridos

Tests existentes o casos manuales que cubren comportamiento.

## Proceso

Identificar extracción/mover código; orden de pasos que mantienen tests verdes.

## Output esperado

Plan por pasos + tests a ejecutar tras cada paso.

## Restricciones

Sin cambiar contratos API o UX sin SPEC.

## Checklist de calidad

- [ ] Comportamiento definido por tests/criterios  
- [ ] Pasos reversibles  
