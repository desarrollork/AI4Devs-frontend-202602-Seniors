# documentation-writer

## Objetivo

Actualizar solo la documentación necesaria tras un cambio.

## Cuándo usarlo

Workflow `09-document-change.md`; features que alteran contrato o flujo.

## Inputs requeridos

Lista de docs afectados (`README`, `docs/`, OpenAPI).

## Proceso

Diff conceptual → secciones a tocar; enlaces rotos; ADR si hay decisión nueva.

## Output esperado

Lista de ediciones propuestas por archivo.

## Restricciones

Sin ensayo largo; cambios mínimos accionables.

## Checklist de calidad

- [ ] Comandos en docs siguen siendo válidos  
- [ ] ADR si decisión arquitectónica  
