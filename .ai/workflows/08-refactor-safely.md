# Refactorizar con seguridad

## Objetivo

Mejorar estructura sin cambiar comportamiento.

## Precondiciones

Tests verdes o casos manuales definidos; refactor-planner listo.

## Pasos

1. Congelar comportamiento esperado (tests).  
2. Paso pequeño → ejecutar tests.  
3. Repetir; sin mezclar fix funcional.

## Archivos afectados

Solo ámbito refactor; sin cambiar contratos sin SPEC.

## Criterios de aceptación

Tests pasan; diff revisable.

## Checklist final

- [ ] Sin cambio funcional inadvertido  

## Errores comunes

Refactor + feature en mismo commit.

## Cuándo detenerse

Faltan tests de red de seguridad — escribir primero.
