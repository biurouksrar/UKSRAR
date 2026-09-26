import { randomBytes } from "crypto";
import nodemailer from "nodemailer";
import { contact, site } from "@/lib/content";
import { dbTable, getDb, type Sql } from "@/lib/db";
import {
  rentalResourceLabels,
  type RentalResource,
  type TrailerReservationStatus,
} from "@/lib/trailer";

const TOKEN_RE = /^[A-Za-z0-9_-]{20,128}$/;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidAccessToken(token: string) {
  return TOKEN_RE.test(token);
}

export function getPublicSiteUrl(originOverride?: string | null) {
  if (originOverride?.trim()) {
    return originOverride.trim().replace(/\/$/, "");
  }
  const fromEnv =
    process.env.SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }
  return site.url.replace(/\/$/, "");
}

export function getRequestOrigin(headers: Headers) {
  const host = (headers.get("x-forwarded-host") ?? headers.get("host") ?? "")
    .split(",")[0]
    .trim();
  if (!host) return getPublicSiteUrl();
  const proto =
    headers.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`;
}

export function reservationsPortalUrl(token: string, originOverride?: string | null) {
  return `${getPublicSiteUrl(originOverride)}/moje-rezerwacje/${token}`;
}

export const rentalStatusLabels: Record<TrailerReservationStatus, string> = {
  pending: "oczekuje na potwierdzenie",
  confirmed: "potwierdzona",
  cancelled: "anulowana",
};

function createMailTransport() {
  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!gmailUser || !gmailPass) return null;

  return {
    user: gmailUser,
    transporter: nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    }),
  };
}

/** Zwraca istniejący token dla e-maila albo tworzy nowy (stały link klienta). */
export async function getOrCreateAccessToken(sql: Sql, email: string) {
  const normalized = normalizeEmail(email);
  const tokens = dbTable(sql, "rental_access_tokens");
  const token = randomBytes(32).toString("base64url");

  const rows = await sql<{ token: string }[]>`
    INSERT INTO ${tokens} (email, token)
    VALUES (${normalized}, ${token})
    ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
    RETURNING token
  `;

  return rows[0]?.token ?? token;
}

export async function findEmailByAccessToken(token: string) {
  if (!isValidAccessToken(token)) return null;
  const sql = getDb();
  const tokens = dbTable(sql, "rental_access_tokens");
  const rows = await sql<{ email: string }[]>`
    SELECT email FROM ${tokens} WHERE token = ${token} LIMIT 1
  `;
  return rows[0]?.email ?? null;
}

export async function listReservationsForEmail(email: string) {
  const sql = getDb();
  const reservations = dbTable(sql, "rental_reservations");
  const normalized = normalizeEmail(email);

  return sql<
    {
      id: number;
      resource: RentalResource;
      name: string;
      email: string;
      phone: string;
      start_date: string;
      end_date: string;
      notes: string | null;
      status: TrailerReservationStatus;
      created_at: string;
    }[]
  >`
    SELECT
      id,
      resource,
      name,
      email,
      phone,
      start_date::text,
      end_date::text,
      notes,
      status,
      created_at::text
    FROM ${reservations}
    WHERE lower(email) = ${normalized}
    ORDER BY start_date DESC, id DESC
  `;
}

export async function notifyStaffNewReservation(payload: {
  resource: RentalResource;
  name: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  notes: string;
  portalUrl: string;
}) {
  const mail = createMailTransport();
  if (!mail) return;

  const to = process.env.CONTACT_TO_EMAIL ?? contact.email;
  const itemLabel = rentalResourceLabels[payload.resource];
  const subject = `Nowa rezerwacja (${itemLabel}): ${payload.startDate} – ${payload.endDate}`;
  const text = [
    `Zasób: ${itemLabel}`,
    `Imię / nazwa: ${payload.name}`,
    `E-mail: ${payload.email}`,
    `Telefon: ${payload.phone}`,
    `Termin: ${payload.startDate} – ${payload.endDate}`,
    `Uwagi: ${payload.notes || "—"}`,
    "",
    "Status: oczekuje na potwierdzenie (pending).",
    `Panel klienta: ${payload.portalUrl}`,
  ].join("\n");

  await mail.transporter.sendMail({
    from: `"Rezerwacja — ${itemLabel}" <${mail.user}>`,
    to,
    replyTo: payload.email,
    subject,
    text,
  });
}

export async function notifyCustomerReservation(payload: {
  resource: RentalResource;
  name: string;
  email: string;
  startDate: string;
  endDate: string;
  notes: string;
  portalUrl: string;
}) {
  const mail = createMailTransport();
  if (!mail) return;

  const itemLabel = rentalResourceLabels[payload.resource];
  const subject = `Potwierdzenie rezerwacji — ${itemLabel}`;
  const text = [
    `Cześć ${payload.name},`,
    "",
    `Przyjęliśmy Twoją rezerwację: ${itemLabel}.`,
    `Termin: ${payload.startDate} – ${payload.endDate}`,
    `Uwagi: ${payload.notes || "—"}`,
    "",
    "Status: oczekuje na potwierdzenie. Skontaktujemy się, żeby ją potwierdzić.",
    "",
    "Tutaj zobaczysz wszystkie swoje rezerwacje (także wcześniejsze):",
    payload.portalUrl,
    "",
    "Nie udostępniaj tego linku innym osobom — działa bez logowania.",
    "",
    "Pozdrawiamy,",
    site.name,
    contact.phone,
  ].join("\n");

  await mail.transporter.sendMail({
    from: `"${site.name}" <${mail.user}>`,
    to: payload.email,
    subject,
    text,
  });
}
