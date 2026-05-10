# api-designer

## Objetivo

Definir o revisar contratos HTTP coherentes con SPEC y OpenAPI existente.

## Cuándo usarlo

Nuevo endpoint o cambio de payload/status codes.

## Inputs requeridos

`backend/api-spec.yaml`, SPEC de feature, convenciones actuales.

## Proceso

Recursos, métodos, códigos error, validación; compatibilidad hacia atrás.

## Output esperado

Esquema request/response + casos error + impacto frontend.

## Restricciones

Sin romper clientes sin versión/plan.

## Checklist de calidad

- [ ] Validación entrada descrita  
- [ ] Errores homogéneos  
