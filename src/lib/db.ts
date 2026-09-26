import postgres from "postgres";

/**
 * Połączenie z PostgreSQL.
 * W .env.local / Vercel ustaw:
 *   DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require
 */
const connectionString = process.env.DATABASE_URL;

declare global {
  // eslint-disable-next-line no-var
  var __uksrarSql: ReturnType<typeof postgres> | undefined;
}

function createSql() {
  if (!connectionString) {
    throw new Error("Brak DATABASE_URL w zmiennych środowiskowych.");
  }

  return postgres(connectionString, {
    max: 5,
    idle_timeout: 20,
    connect_timeout: 10,
  });
}

export function getDb() {
  if (!globalThis.__uksrarSql) {
    globalThis.__uksrarSql = createSql();
  }
  return globalThis.__uksrarSql;
}

export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL?.trim());
}
