# Revisar código

## Objetivo

Validar calidad, alcance y seguridad antes de merge.

## Precondiciones

Diff completo; tests ejecutados; SPEC/task disponible.

## Pasos

1. Alcance vs task.  
2. Errores y logs seguros.  
3. Tests suficientes.  
4. Actualizar lista de follow-ups si no bloqueante.

## Archivos afectados

Ninguno salvo comentarios de revisión o checklist `.ai/checklists/code-review.md`.

## Criterios de aceptación

Bloqueantes resueltos o registrados como deuda con ID.

## Checklist final

Usar plantilla `.ai/templates/code-review-template.md`.

## Errores comunes

Aprobar sin ver tests; ignorar seguridad en inputs.

## Cuándo detenerse

Conflicto de diseño — ADR o SPEC primero.
