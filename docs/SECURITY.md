# SECURITY

## Principios

- Mínimo privilegio; no datos sensibles en logs ni respuestas.  
- Validar entradas en servidor.  
- Secretos solo en entorno; nunca en git.

## Datos sensibles

`DATABASE_URL`, credenciales DB, API keys → `.env` / secret manager (**TODO** política por entorno).

## Autenticación / autorización

**TODO / Pendiente de decisión** antes de cambios: modelo auth producción.

## Validación de inputs

Controllers/capa HTTP antes de negocio; alinear con OpenAPI.

## Dependencias

`npm audit` periódico (manual). Sin dependencias nuevas sin justificación en SPEC/tarea.

## Secretos

No commitear `.env`. Rotación **TODO** si filtración.

## Logging

Sin tokens ni PII completa. **TODO:** niveles por entorno.

## Checklist (merge sensible)

- [ ] Sin secretos en diff  
- [ ] Entradas nuevas validadas  
- [ ] Stack interno no expuesto al cliente en prod (**TODO** política)  
- [ ] Nuevas deps auditadas  
