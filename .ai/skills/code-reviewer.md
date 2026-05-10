# code-reviewer

## Objetivo

Revisión de alcance, calidad y huellas de seguridad antes de merge.

## Cuándo usarlo

PR o fin de tarea; usar con `.ai/workflows/07-review-code.md`.

## Inputs requeridos

Diff o lista de archivos, SPEC/tarea, resultados de tests.

## Proceso

Comprobar alineación con tarea, errores, fugas, tests suficientes.

## Output esperado

Lista priorizada: bloqueante / importante / menor.

## Restricciones

No pedir rewrite total sin motivo SPEC.

## Checklist de calidad

- [ ] Cada hallazgo accionable  
- [ ] Seguridad y tests mencionados  
