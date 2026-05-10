# database-designer

## Objetivo

Propuesta de modelo/migración alineada con integridad y rendimiento razonable.

## Cuándo usarlo

Cambios en `schema.prisma` o datos relacionados.

## Inputs requeridos

SPEC, volumen esperado **TODO**, relaciones actuales.

## Proceso

Entidades, FKs, índices justificados, plan migración/rollback.

## Output esperado

Lista cambios esquema + riesgos + orden aplicación.

## Restricciones

Sin migraciones destructivas sin plan explícito.

## Checklist de calidad

- [ ] Integridad referencial  
- [ ] Impacto en datos existentes  
