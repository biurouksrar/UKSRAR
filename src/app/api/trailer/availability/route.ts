import { NextRequest, NextResponse } from "next/server";
import { getDb, isDbConfigured } from "@/lib/db";
import {
  isRentalResource,
  isValidIsoDate,
  todayIsoDate,
  type TrailerBookingRange,
} from "@/lib/trailer";

/**
 * GET /api/trailer/availability?resource=trailer|sup&from=YYYY-MM-DD&to=YYYY-MM-DD
 * Zwraca zajęte zakresy dat (pending + confirmed) dla wybranego zasobu.
 */
export async function GET(request: NextRequest) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "Baza danych nie jest jeszcze skonfigurowana.", bookings: [] as TrailerBookingRange[] },
      { status: 503 },
    );
  }

  const { searchParams } = request.nextUrl;
  const resourceParam = searchParams.get("resource") ?? "trailer";
  const from = searchParams.get("from") ?? todayIsoDate();
  const to = searchParams.get("to");

  if (!isRentalResource(resourceParam)) {
    return NextResponse.json({ error: "Nieprawidłowy zasób wypożyczenia." }, { status: 400 });
  }

  if (!isValidIsoDate(from) || (to && !isValidIsoDate(to))) {
    return NextResponse.json({ error: "Nieprawidłowy zakres dat." }, { status: 400 });
  }

  try {
    const sql = getDb();
    const rows = to
      ? await sql<TrailerBookingRange[]>`
          SELECT start_date::text, end_date::text, status
          FROM trailer_reservations
          WHERE resource = ${resourceParam}
            AND status IN ('pending', 'confirmed')
            AND start_date <= ${to}::date
            AND end_date >= ${from}::date
          ORDER BY start_date ASC
        `
      : await sql<TrailerBookingRange[]>`
          SELECT start_date::text, end_date::text, status
          FROM trailer_reservations
          WHERE resource = ${resourceParam}
            AND status IN ('pending', 'confirmed')
            AND end_date >= ${from}::date
          ORDER BY start_date ASC
        `;

    return NextResponse.json({ bookings: rows });
  } catch (err) {
    console.error("[trailer/availability]", err);
    return NextResponse.json(
      { error: "Nie udało się pobrać dostępności." },
      { status: 500 },
    );
  }
}
