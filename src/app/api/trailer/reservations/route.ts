import { NextRequest, NextResponse } from "next/server";
import {
  dbTable,
  getDb,
  getRequestHost,
  isDbConfigured,
  resolveAppEnvFromHost,
  withAppEnv,
} from "@/lib/db";
import {
  getOrCreateAccessToken,
  getRequestOrigin,
  notifyCustomerReservation,
  notifyStaffNewReservation,
  reservationsPortalUrl,
} from "@/lib/rental-access";
import {
  compareIsoDates,
  isRentalResource,
  isValidIsoDate,
  todayIsoDate,
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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  const appEnv = resolveAppEnvFromHost(getRequestHost(request.headers));

  return withAppEnv(appEnv, async () => {
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
      const reservations = dbTable(sql, "rental_reservations");

      const conflicts = await sql`
        SELECT id
        FROM ${reservations}
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
        INSERT INTO ${reservations} (resource, name, email, phone, start_date, end_date, notes, status)
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

      const accessToken = await getOrCreateAccessToken(sql, email);
      const portalUrl = reservationsPortalUrl(
        accessToken,
        getRequestOrigin(request.headers),
      );

      try {
        await Promise.all([
          notifyStaffNewReservation({
            resource: resourceParam,
            name,
            email,
            phone,
            startDate,
            endDate,
            notes,
            portalUrl,
          }),
          notifyCustomerReservation({
            resource: resourceParam,
            name,
            email,
            startDate,
            endDate,
            notes,
            portalUrl,
          }),
        ]);
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
  });
}
