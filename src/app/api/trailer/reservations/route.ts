import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contact } from "@/lib/content";
import { getDb, isDbConfigured } from "@/lib/db";
import {
  compareIsoDates,
  isRentalResource,
  isValidIsoDate,
  rentalResourceLabels,
  todayIsoDate,
  type RentalResource,
} from "@/lib/trailer";

type ReservationPayload = {
  resource?: string;
  name?: string;
  email?: string;
  phone?: string;
  startDate?: string;
  endDate?: string;
  notes?: string;
};

const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? contact.email;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function notifyNewReservation(payload: {
  resource: RentalResource;
  name: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  notes: string;
}) {
  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!gmailUser || !gmailPass) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

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
  ].join("\n");

  await transporter.sendMail({
    from: `"Rezerwacja — ${itemLabel}" <${gmailUser}>`,
    to: CONTACT_TO,
    replyTo: payload.email,
    subject,
    text,
  });
}

/**
 * POST /api/trailer/reservations
 * Tworzy rezerwację (status: pending), jeśli termin wolny dla danego zasobu.
 */
export async function POST(request: NextRequest) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "Baza danych nie jest jeszcze skonfigurowana." },
      { status: 503 },
    );
  }

  let body: ReservationPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  }

  const resourceParam = (body.resource ?? "trailer").trim();
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const startDate = (body.startDate ?? "").trim();
  const endDate = (body.endDate ?? "").trim();
  const notes = (body.notes ?? "").trim();

  if (!isRentalResource(resourceParam)) {
    return NextResponse.json({ error: "Nieprawidłowy zasób wypożyczenia." }, { status: 400 });
  }

  if (!name || !email || !isValidEmail(email) || !phone) {
    return NextResponse.json(
      { error: "Uzupełnij poprawnie imię, e-mail i telefon." },
      { status: 400 },
    );
  }

  if (!isValidIsoDate(startDate) || !isValidIsoDate(endDate)) {
    return NextResponse.json({ error: "Nieprawidłowy termin." }, { status: 400 });
  }

  if (compareIsoDates(endDate, startDate) < 0) {
    return NextResponse.json(
      { error: "Data końcowa nie może być wcześniejsza niż początkowa." },
      { status: 400 },
    );
  }

  if (compareIsoDates(startDate, todayIsoDate()) < 0) {
    return NextResponse.json(
      { error: "Nie można rezerwować terminów z przeszłości." },
      { status: 400 },
    );
  }

  try {
    const sql = getDb();

    const conflicts = await sql`
      SELECT id
      FROM trailer_reservations
      WHERE resource = ${resourceParam}
        AND status IN ('pending', 'confirmed')
        AND start_date <= ${endDate}::date
        AND end_date >= ${startDate}::date
      LIMIT 1
    `;

    if (conflicts.length > 0) {
      return NextResponse.json(
        { error: "Wybrany termin jest już zajęty. Wybierz inne daty." },
        { status: 409 },
      );
    }

    const inserted = await sql<{ id: number }[]>`
      INSERT INTO trailer_reservations (resource, name, email, phone, start_date, end_date, notes, status)
      VALUES (
        ${resourceParam},
        ${name},
        ${email},
        ${phone},
        ${startDate}::date,
        ${endDate}::date,
        ${notes || null},
        'pending'
      )
      RETURNING id
    `;

    try {
      await notifyNewReservation({
        resource: resourceParam,
        name,
        email,
        phone,
        startDate,
        endDate,
        notes,
      });
    } catch (mailErr) {
      console.error("[trailer/reservations] powiadomienie e-mail:", mailErr);
    }

    return NextResponse.json({ ok: true, id: inserted[0]?.id });
  } catch (err) {
    console.error("[trailer/reservations]", err);
    return NextResponse.json(
      { error: "Nie udało się zapisać rezerwacji." },
      { status: 500 },
    );
  }
}
