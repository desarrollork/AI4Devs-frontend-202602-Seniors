# Probar tarea

## Objetivo

Verificar cambio con comandos reales del repo.

## Precondiciones

Implementación lista; comandos conocidos (`docs/TESTING_STRATEGY.md`).

## Pasos

1. Tests unitarios relevantes (`backend`/`frontend` `npm test`).  
2. Build backend `npm run build`; frontend `CI=true npm run build`.  
3. Opcional: `bash scripts/validate-local.sh`.

## Archivos afectados

Tests existentes o nuevos bajo convención del proyecto.

## Criterios de aceptación

Salida exitosa; fallos documentados si environment block.

## Checklist final

- [ ] Comando registrado en informe de tarea  
- [ ] Regresión sensible cubierta  

## Errores comunes

Saltar CI parity; ignorar CI=true en frontend.

## Cuándo detenerse

Fallo no reproducible — usar bug-investigator skill.
