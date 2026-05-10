# ARCHITECTURE

## Arquitectura propuesta

- **Frontend:** React (CRA), React Router, React Bootstrap (`frontend/src/`; router principal en `App.js`).  
- **Backend:** Express (TypeScript), capas DDD bajo `backend/src/`.  
- **Datos:** PostgreSQL via Prisma; `req.prisma` en requests.

## Stack detectado

| Capa | Tecnología |
|------|------------|
| Frontend | React 18, TypeScript, axios, Jest |
| Backend | Node, Express 4, TypeScript, Jest, Prisma 5 |
| DB | PostgreSQL (Docker) |
| API | OpenAPI `backend/api-spec.yaml` |

## Módulos

Candidatos, posiciones, aplicaciones, flujos de entrevista; subida de CV (`uploads/`, multer).

## Capas (backend)

Presentation → Application → Domain → Infrastructure (Prisma).

## Flujo de datos

Frontend `:3000` → API `:3010` → Prisma → PostgreSQL.

## Dependencias externas

PostgreSQL. **TODO:** email, storage cloud si se añaden.

## Decisiones pendientes

- **Pendiente de decisión:** auth/autorización para producción.

## Riesgos técnicos

Migraciones Prisma destructivas; secretos `.env`; auditoría de dependencias (`npm audit` manual).
