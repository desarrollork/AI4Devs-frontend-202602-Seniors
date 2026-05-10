# Crear arquitectura

## Objetivo

Definir vista técnica coherente con SPEC suficiente.

## Precondiciones

SPEC revisada (workflow 02); sin bloqueos críticos.

## Pasos

1. Confirmar stack actual vs necesidades.  
2. Capas y límites entre módulos.  
3. Flujo de datos y dependencias externas.  
4. Riesgos y decisiones pendientes → ADR si aplica.

## Archivos afectados

`docs/ARCHITECTURE.md`, opcionalmente `docs/adr/*`.

## Criterios de aceptación

Arquitectura trazable desde SPEC; riesgos nombrados.

## Checklist final

- [ ] Sin tecnología nueva sin decisión  
- [ ] Diagrama o lista capas clara  

## Errores comunes

Diseñar antes de SPEC estable.

## Cuándo detenerse

SPEC insuficiente — volver a workflow 01–02.
