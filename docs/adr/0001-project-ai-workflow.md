# ADR 0001: Project AI Workflow

## Estado

Aceptado

## Contexto

LTI se desarrolla con Cursor (Composer 2) y AutoSkills; sin proceso explícito la IA puede desbordar alcance o saltarse tests.

## Decisión

**Spec-driven development** obligatorio. Reglas `.cursor/rules/`, `AGENTS.md`, skills `.ai/skills/`, workflows `.ai/workflows/`, plantillas `.ai/templates/`. Este ADR ancla el proceso.

## Consecuencias

**Positivas:** menos cambios masivos no revisados; trazabilidad spec → código → tests.  
**Tradeoffs:** fricción inicial; mantener docs/proceso.

## Alternativas consideradas

Solo prompts ad hoc — rechazado. Hooks npm sin Husky — aplazar hasta herramientas en repo.

## Riesgos

Docs obsoletas; mitigar con revisiones y ADRs.

## Fecha

2026-05-10
