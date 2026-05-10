# security-reviewer

## Objetivo

Detectar problemas de seguridad en cambio concreto (inputs, secretos, logs).

## Cuándo usarlo

Tareas que tocan API, archivos, datos personales o dependencias.

## Inputs requeridos

Diff, `docs/SECURITY.md`, superficie de amenaza esperada.

## Proceso

Checklist SECURITY + amenazas OWASP ligeras aplicables al stack.

## Output esperado

Hallazgos priorizados y mitigaciones mínimas.

## Restricciones

Sin rediseñar auth completa salvo SPEC explícita.

## Checklist de calidad

- [ ] Entradas y errores revisados  
- [ ] Dependencias nuevas mencionadas  
