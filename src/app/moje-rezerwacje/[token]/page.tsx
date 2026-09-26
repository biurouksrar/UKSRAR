import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import {
  getRequestHost,
  isDbConfigured,
  resolveAppEnvFromHost,
  withAppEnv,
} from "@/lib/db";
import {
  findEmailByAccessToken,
  isValidAccessToken,
  listReservationsForEmail,
  rentalStatusLabels,
  type CustomerReservationRow,
} from "@/lib/rental-access";
import { rentalResourceLabels } from "@/lib/trailer";

type Props = {
  params: Promise<{ token: string }>;
};

export const metadata: Metadata = {
  title: "Moje rezerwacje | Rudzka Akademia Rowerowa",
  robots: { index: false, follow: false },
};

function formatDisplayDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y}`;
}

export default async function MyReservationsPage({ params }: Props) {
  const { token } = await params;
  const headerList = await headers();
  const appEnv = resolveAppEnvFromHost(getRequestHost(headerList));

  return withAppEnv(appEnv, async () => {
    if (!isDbConfigured() || !isValidAccessToken(token)) {
      return (
        <section className="my-reservations container-primary">
          <header className="my-reservations-header">
            <h1>Moje rezerwacje</h1>
            <p>Ten link jest nieprawidłowy.</p>
          </header>
          <div className="button-container">
            <Link href="/#wypozyczalnia" className="btn btn-secondary">
              Wróć do wypożyczalni
            </Link>
          </div>
        </section>
      );
    }

    let email: string | null = null;
    let rows: CustomerReservationRow[] = [];
    let loadError = false;

    try {
      email = await findEmailByAccessToken(token);
      if (email) {
        rows = await listReservationsForEmail(email);
      }
    } catch (err) {
      console.error("[moje-rezerwacje]", err);
      loadError = true;
    }

    if (loadError) {
      return (
        <section className="my-reservations container-primary">
          <header className="my-reservations-header">
            <h1>Moje rezerwacje</h1>
            <p>Nie udało się wczytać rezerwacji. Spróbuj ponownie za chwilę.</p>
          </header>
        </section>
      );
    }

    if (!email) {
      return (
        <section className="my-reservations container-primary">
          <header className="my-reservations-header">
            <h1>Moje rezerwacje</h1>
            <p>Ten link jest nieprawidłowy lub już nieaktywny.</p>
          </header>
          <div className="button-container">
            <Link href="/#wypozyczalnia" className="btn btn-secondary">
              Wróć do wypożyczalni
            </Link>
          </div>
        </section>
      );
    }

    return (
      <section className="my-reservations container-primary">
        <header className="my-reservations-header">
          <h1>Moje rezerwacje</h1>
          <p>
            Lista rezerwacji dla <strong>{email}</strong>. Link działa bez logowania —
            nie udostępniaj go innym.
          </p>
        </header>

        {rows.length === 0 ? (
          <p className="my-reservations-empty">Brak zapisanych rezerwacji.</p>
        ) : (
          <ul className="my-reservations-list">
            {rows.map((row) => (
              <li key={row.id} className={`my-reservation-item status-${row.status}`}>
                <div className="my-reservation-item-top">
                  <h2>{rentalResourceLabels[row.resource]}</h2>
                  <span className={`my-reservation-status status-${row.status}`}>
                    {rentalStatusLabels[row.status]}
                  </span>
                </div>
                <p className="my-reservation-dates">
                  {formatDisplayDate(row.start_date)}
                  {row.start_date !== row.end_date
                    ? ` – ${formatDisplayDate(row.end_date)}`
                    : ""}
                </p>
                <dl className="my-reservation-meta">
                  <div>
                    <dt>Imię / nazwa</dt>
                    <dd>{row.name}</dd>
                  </div>
                  <div>
                    <dt>Telefon</dt>
                    <dd>{row.phone}</dd>
                  </div>
                  {row.notes ? (
                    <div>
                      <dt>Uwagi</dt>
                      <dd>{row.notes}</dd>
                    </div>
                  ) : null}
                </dl>
              </li>
            ))}
          </ul>
        )}

        <div className="button-container my-reservations-actions">
          <Link href="/#wypozyczalnia" className="btn btn-secondary">
            Nowa rezerwacja
          </Link>
        </div>
      </section>
    );
  });
}
