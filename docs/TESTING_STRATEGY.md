# TESTING_STRATEGY

## Estrategia

- **Unitarios:** Jest — `backend/` → `npm test`; `frontend/` → `npm test` (`jest.config.js`).  
- **Integración:** API + Prisma en tests backend; **TODO:** ampliar según SPEC.  
- **E2E:** **TODO:** sin suite detectada.  
- **Seguridad:** `SECURITY.md` + revisión manual.  
- **Regresión:** CI `.github/workflows/ci.yml` + `bash scripts/validate-local.sh`.

## Comandos (desde la raíz de este repo)

| Ámbito | Comando |
|--------|---------|
| Backend build | `cd backend && npm run build` |
| Backend tests | `cd backend && npm test` |
| Frontend tests | `cd frontend && npm test` |
| Frontend build (CI) | `cd frontend && CI=true npm run build` |
| Validación conjunta | `bash scripts/validate-local.sh` |

## Typecheck / lint

- Backend: sin script `typecheck`; `npm run build` (`tsc`) verifica tipos.  
- Backend: ESLint en devDeps; **sin** script `lint` en `package.json` — **TODO:** script cuando exista comando estable.  
- Frontend: ESLint en `npm run build` con `CI=true`.

## Gaps

- Sin `test:unit` separado.  
- Sin `format:check` en scripts (Prettier en backend devDeps).  
- **TODO:** cobertura mínima si el curso la exige.
