# Prompts Iniciales — LTI E10

Este archivo recoge los prompts utilizados para generar la documentación inicial del proyecto antes de comenzar a codificar (spec-driven development).

---

## Prompt 1 — Análisis del repositorio e inicialización de Claude Code

```
/init
```

Resultado: Generación del archivo `CLAUDE.md` con la arquitectura del proyecto, comandos de desarrollo y estructura de carpetas.

---

## Prompt 2 — Generación de la documentación inicial completa (spec)

```
Objetivo
Crear la documentación inicial completa de un proyecto de software antes de empezar a programar.

La documentación debe servir como base para desarrollo con IA usando Cursor, Claude Code o Codex, siguiendo un enfoque spec-driven development.

Contexto del proyecto
Proyecto: LTI — Talent Tracking System (AI4Devs Frontend 202602 — Seniors)

[...descripción completa del proyecto, stack, endpoints de E10, usuarios, entregables...]

Tarea
Genera una documentación inicial profesional del proyecto en formato Markdown con las siguientes secciones:
1. Resumen ejecutivo
2. Objetivos del proyecto
3. Alcance del MVP
4. Usuarios y roles
5. Requisitos funcionales
6. Requisitos no funcionales
7. Reglas de negocio
8. Entidades principales del dominio
9. Arquitectura inicial recomendada
10. Estructura inicial de carpetas
11. Epics
```

Resultado: Archivo `docs/especificacion-inicial.md` generado a partir del análisis real del código backend (schema Prisma, controladores, api-spec.yaml) y frontend (componentes existentes, patrones de código).

---

## Prompt 3 — Plan de implementación

```
/plan haz un plan para generar la especificacion 
'docs/especificacion-inicial.md', utiliza los skills, workflows, 
herramientas etc... para que se desarrolle el proyecto
```

Resultado: Plan de implementación detallado por fases (Epics 1-4) con contratos API verificados, archivos a crear/modificar y verificación end-to-end.
