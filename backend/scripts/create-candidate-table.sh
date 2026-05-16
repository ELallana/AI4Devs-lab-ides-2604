#!/usr/bin/env bash
# Creates the candidate table in PostgreSQL (docker-compose db service).
# Run from repo root or backend/:  cd backend && npm run db:create-candidate-table

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
SQL_FILE="${SCRIPT_DIR}/sql/create_candidate_table.sql"
ENV_FILE="${BACKEND_DIR}/.env"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Error: ${ENV_FILE} not found. Copy backend/.env.example or create .env with DB_* variables." >&2
  exit 1
fi

if [[ ! -f "${SQL_FILE}" ]]; then
  echo "Error: ${SQL_FILE} not found." >&2
  exit 1
fi

# shellcheck disable=SC1090
set -a
source "${ENV_FILE}"
set +a

for var in DB_USER DB_PASSWORD DB_NAME DB_PORT; do
  if [[ -z "${!var:-}" ]]; then
    echo "Error: ${var} is not set in ${ENV_FILE}" >&2
    exit 1
  fi
done

export DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}"

cd "${BACKEND_DIR}"
echo "Applying ${SQL_FILE} to ${DB_NAME}@localhost:${DB_PORT}..."
npx prisma db execute --file "${SQL_FILE}" --schema prisma/schema.prisma
echo "Done. Table 'candidate' is ready."
