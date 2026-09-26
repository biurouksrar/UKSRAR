import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import postgres from "postgres";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env"));

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  console.error("Brak DATABASE_URL w .env.local");
  process.exit(1);
}

const schemaSql = fs.readFileSync(path.join(root, "sql", "schema.sql"), "utf8");
const sql = postgres(url, { max: 1 });

try {
  await sql.unsafe(schemaSql);

  const tables = await sql`
    SELECT table_schema, table_name
    FROM information_schema.tables
    WHERE table_schema IN ('app_dev', 'app_prod')
    ORDER BY 1, 2
  `;

  console.log("OK — schematy i tabele:");
  for (const row of tables) {
    console.log(`  ${row.table_schema}.${row.table_name}`);
  }
} finally {
  await sql.end({ timeout: 5 });
}
