# bug-investigator

## Objetivo

Aislar causa raíz con método reproducible antes de parchear.

## Cuándo usarlo

Fallo en tests, CI o manual.

## Inputs requeridos

Pasos de reproducción, logs, último cambio conocido.

## Proceso

Reproducir → acotar capa (front/back/db) → hipótesis → prueba mínima.

## Output esperado

Resumen causa + evidencia + siguiente paso (fix o SPEC si es comportamiento ambiguo).

## Restricciones

Sin «arreglar» sin entender; si SPEC ambigua, escalar.

## Checklist de calidad

- [ ] Reproducible  
- [ ] Evidencia citada  
