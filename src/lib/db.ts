import { AsyncLocalStorage } from "node:async_hooks";
import postgres from "postgres";

/**
 * Połączenie z PostgreSQL (Neon).
 *
 * Jedna baza, dwa środowiska jako schematy:
 *   app_dev  — lokalnie, *.vercel.app (np. uksrar-two.vercel.app)
 *   app_prod — tylko domeny z PROD_HOSTS (domyślnie www.uksrar.pl, uksrar.pl)
 *
 * W .env.local / Vercel:
 *   DATABASE_URL=postgresql://…?sslmode=require
 *   PROD_HOSTS=www.uksrar.pl,uksrar.pl
 *   APP_ENV=dev|prod  (fallback, gdy nie da się rozpoznać hosta)
 */
const connectionString = process.env.DATABASE_URL;

export type AppEnv = "dev" | "prod";
export type Sql = ReturnType<typeof postgres>;

const appEnvAls = new AsyncLocalStorage<AppEnv>();

declare global {
  // eslint-disable-next-line no-var
  var __uksrarSql: Sql | undefined;
}

function normalizeHost(hostHeader?: string | null) {
  return (hostHeader ?? "")
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "");
}

function getProdHosts() {
  return (process.env.PROD_HOSTS ?? "www.uksrar.pl,uksrar.pl")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function resolveAppEnvFromProcess(): AppEnv {
  const raw = (process.env.APP_ENV ?? "dev").trim().toLowerCase();
  if (raw === "prod" || raw === "production") return "prod";
  return "dev";
}

/** Wybór schematu na podstawie Host (domena produkcyjna vs test). */
export function resolveAppEnvFromHost(hostHeader?: string | null): AppEnv {
  const host = normalizeHost(hostHeader);
  if (!host) return resolveAppEnvFromProcess();

  if (getProdHosts().includes(host)) return "prod";

  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".vercel.app")
  ) {
    return "dev";
  }

  return resolveAppEnvFromProcess();
}

export function getRequestHost(headers: Headers) {
  return headers.get("x-forwarded-host") ?? headers.get("host");
}

/** Uruchamia kod w kontekście wybranego środowiska (dev/prod). */
export function withAppEnv<T>(env: AppEnv, fn: () => T): T {
  return appEnvAls.run(env, fn);
}

export function getAppEnv(): AppEnv {
  return appEnvAls.getStore() ?? resolveAppEnvFromProcess();
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
  if (!globalThis.__uksrarSql) {
    globalThis.__uksrarSql = createSql();
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
