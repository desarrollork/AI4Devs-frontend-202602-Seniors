#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export CI=true

echo "== Backend: prisma generate, tsc, jest =="
cd "$ROOT/backend"
npm ci
npx prisma generate
npm run build
npm test

echo "== Frontend: producción build (ESLint como en CI) =="
cd "$ROOT/frontend"
# npm ci puede fallar con ENOTEMPTY si node_modules está corrupto o en uso
if [ -d node_modules ]; then
  rm -rf node_modules
fi
npm ci
npm run build

echo "== OK: validación local completada =="
