# cursor-rule-maintainer

## Objetivo

Mantener `.cursor/rules/` alineadas con el proceso y sin duplicación contradictoria.

## Cuándo usarlo

Cambio de proceso, nueva carpeta crítica, o reglas obsoletas.

## Inputs requeridos

Diff deseado en comportamiento del agente; convenciones del repo.

## Proceso

Revisar frontmatter `globs`/`alwaysApply`; fusionar en lugar de duplicar; mantener reglas críticas concisas.

## Output esperado

Propuesta de edición por archivo `.mdc` + impacto.

## Restricciones

No debilitar SPEC-first ni seguridad sin ADR.

## Checklist de calidad

- [ ] Sin contradicción entre reglas alwaysApply  
- [ ] globs correctos  
