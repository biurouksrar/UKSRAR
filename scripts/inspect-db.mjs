import fs from "fs";
import postgres from "postgres";

for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].trim();
}

const sql = postgres(process.env.DATABASE_URL, { max: 1 });

const schemas = await sql`
  SELECT schema_name
  FROM information_schema.schemata
  WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
  ORDER BY 1
`;
console.log("schemas:", schemas.map((r) => r.schema_name));

const tables = await sql`
  SELECT table_schema, table_name
  FROM information_schema.tables
  WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
  ORDER BY 1, 2
`;
console.log("tables:", tables);

await sql.end();
