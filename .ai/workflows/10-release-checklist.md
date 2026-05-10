# Checklist de release

## Objetivo

Validar salida de versión con riesgo controlado.

## Precondiciones

Candidate release definido; changelog o notas internas acordadas.

## Pasos

1. `docs/TESTING_STRATEGY.md` — comandos completos verdes.  
2. `scripts/validate-local.sh` o CI verde en rama de release.  
3. Revisar seguridad: secretos, vars entorno, migraciones aplicadas planificadas.  
4. Plantilla `.ai/templates/release-checklist-template.md`.

## Archivos afectados

Etiquetas git / notas — fuera de automatización aquí.

## Criterios de aceptación

Lista checklist cerrada sin ítems críticos abiertos.

## Checklist final

- [ ] Migraciones y orden conocidos  
- [ ] Rollback conocido **TODO** si aplica  

## Errores comunes

Release con migración sin backup.

## Cuándo detenerse

Incidente abierto en prod — no release.
