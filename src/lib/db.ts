import postgres from "postgres";

/**
 * Połączenie z PostgreSQL (Neon).
 *
 * Jedna baza, dwa środowiska jako schematy:
 *   APP_ENV=dev  → app_dev  (lokalnie)
 *   APP_ENV=prod → app_prod (www.uksrar.pl / Vercel)
 *
 * Tabele są adresowane jako app_dev.* / app_prod.* (Neon pooler
 * nie pozwala ustawić search_path w parametrach startowych).
 *
 * W .env.local / Vercel:
 *   DATABASE_URL=postgresql://…?sslmode=require
 *   APP_ENV=dev|prod
 */
const connectionString = process.env.DATABASE_URL;

export type AppEnv = "dev" | "prod";
export type Sql = ReturnType<typeof postgres>;

declare global {
  // eslint-disable-next-line no-var
  var __uksrarSql: Sql | undefined;
  // eslint-disable-next-line no-var
  var __uksrarSqlEnv: AppEnv | undefined;
}

export function getAppEnv(): AppEnv {
  const raw = (process.env.APP_ENV ?? "dev").trim().toLowerCase();
  if (raw === "prod" || raw === "production") return "prod";
  return "dev";
}

export function getDbSchema(env: AppEnv = getAppEnv()) {
  return env === "prod" ? "app_prod" : "app_dev";
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
  const env = getAppEnv();

  if (!globalThis.__uksrarSql || globalThis.__uksrarSqlEnv !== env) {
    if (globalThis.__uksrarSql) {
      void globalThis.__uksrarSql.end({ timeout: 5 });
    }
    globalThis.__uksrarSql = createSql();
    globalThis.__uksrarSqlEnv = env;
  }

  return globalThis.__uksrarSql;
}

/** Identyfikator schema.tabela dla aktywnego środowiska (dev/prod). */
export function dbTable(sql: Sql, name: string) {
  return sql`${sql(getDbSchema())}.${sql(name)}`;
}

export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL?.trim());
}
