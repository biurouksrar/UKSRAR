"use client";

import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  eachDayInclusive,
  isDateBooked,
  rangeHasConflict,
  rentalResourceLabels,
  todayIsoDate,
  type RentalResource,
  type TrailerBookingRange,
} from "@/lib/trailer";

type Status = "idle" | "sending" | "success" | "error";

type TrailerReservationProps = {
  resource: RentalResource;
};

const WEEKDAYS = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
const MONTHS = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

function toIso(year: number, monthIndex: number, day: number) {
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function monthGrid(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1);
  const startPad = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function formatRangeLabel(start: string | null, end: string | null) {
  if (!start) return "Wybierz datę początkową w kalendarzu";
  if (!end || end === start) return `Termin: ${start}`;
  return `Termin: ${start} – ${end}`;
}

export default function TrailerReservation({ resource }: TrailerReservationProps) {
  const today = todayIsoDate();
  const initial = new Date();
  const titleId = useId();
  const fieldId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const itemLabel = rentalResourceLabels[resource];

  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const [bookings, setBookings] = useState<TrailerBookingRange[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [pickHint, setPickHint] = useState<string | null>(null);
  const [confirmedRange, setConfirmedRange] = useState<string | null>(null);

  const cells = useMemo(() => monthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  useEffect(() => {
    const from = toIso(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();
    const to = toIso(viewYear, viewMonth, lastDay);

    let cancelled = false;
    setLoading(true);
    setLoadError(null);

    fetch(`/api/trailer/availability?resource=${resource}&from=${from}&to=${to}`)
      .then(async (res) => {
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setBookings([]);
          setLoadError(
            data.error ??
              "Nie udało się pobrać dostępności. Spróbuj ponownie za chwilę.",
          );
          return;
        }
        setBookings(data.bookings ?? []);
      })
      .catch(() => {
        if (!cancelled) {
          setBookings([]);
          setLoadError("Nie udało się połączyć z serwerem.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [viewYear, viewMonth, resource]);

  useEffect(() => {
    if (!modalOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  function shiftMonth(delta: number) {
    const d = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }

  function handleDayClick(day: number) {
    const iso = toIso(viewYear, viewMonth, day);
    if (iso < today) return;
    if (isDateBooked(iso, bookings)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(iso);
      setEndDate(null);
      setPickHint(null);
      return;
    }

    let from = startDate;
    let to = iso;
    if (iso < startDate) {
      from = iso;
      to = startDate;
    }

    if (rangeHasConflict(from, to, bookings)) {
      setPickHint("W wybranym zakresie są zajęte dni. Wybierz inny termin.");
      setStartDate(iso);
      setEndDate(null);
      return;
    }

    setStartDate(from);
    setEndDate(to);
    setPickHint(null);
  }

  function dayClass(day: number | null) {
    if (day === null) return "trailer-cal-cell is-empty";
    const iso = toIso(viewYear, viewMonth, day);
    const classes = ["trailer-cal-cell"];
    if (iso < today) classes.push("is-past");
    if (isDateBooked(iso, bookings)) classes.push("is-booked");

    const rangeEnd = endDate ?? startDate;
    if (startDate && rangeEnd) {
      if (iso >= startDate && iso <= rangeEnd) classes.push("is-selected");
      if (iso === startDate) classes.push("is-range-start");
      if (iso === rangeEnd) classes.push("is-range-end");
    }

    return classes.join(" ");
  }

  function openModal() {
    if (!startDate) {
      setPickHint("Najpierw wybierz termin w kalendarzu.");
      return;
    }
    const finalEnd = endDate ?? startDate;
    if (rangeHasConflict(startDate, finalEnd, bookings)) {
      setPickHint("Wybrany termin jest zajęty.");
      return;
    }
    setFormError(null);
    setStatus("idle");
    setModalOpen(true);
  }

  function closeModal() {
    if (status === "sending") return;
    setModalOpen(false);
    setFormError(null);
    setConfirmedRange(null);
    if (status === "success") {
      setStatus("idle");
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    if (!startDate) {
      setFormError("Wybierz termin w kalendarzu.");
      return;
    }

    const finalEnd = endDate ?? startDate;
    if (rangeHasConflict(startDate, finalEnd, bookings)) {
      setFormError("Wybrany termin jest zajęty.");
      return;
    }

    setStatus("sending");
    const form = e.currentTarget;
    const data = {
      resource,
      name: (form.elements.namedItem(`${fieldId}_name`) as HTMLInputElement).value,
      email: (form.elements.namedItem(`${fieldId}_email`) as HTMLInputElement).value,
      phone: (form.elements.namedItem(`${fieldId}_phone`) as HTMLInputElement).value,
      notes: (form.elements.namedItem(`${fieldId}_notes`) as HTMLTextAreaElement).value,
      startDate,
      endDate: finalEnd,
    };

    try {
      const res = await fetch("/api/trailer/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(payload.error ?? "Nie udało się zapisać rezerwacji.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setConfirmedRange(formatRangeLabel(startDate, finalEnd));
      form.reset();
      setStartDate(null);
      setEndDate(null);

      // Odśwież zajęte terminy po udanej rezerwacji
      const from = toIso(viewYear, viewMonth, 1);
      const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();
      const to = toIso(viewYear, viewMonth, lastDay);
      fetch(`/api/trailer/availability?resource=${resource}&from=${from}&to=${to}`)
        .then((r) => r.json())
        .then((dataRes) => {
          if (dataRes.bookings) setBookings(dataRes.bookings);
        })
        .catch(() => {});
    } catch {
      setFormError("Coś poszło nie tak. Spróbuj ponownie lub zadzwoń.");
      setStatus("error");
    }
  }

  const selectedDays =
    startDate && (endDate ?? startDate)
      ? eachDayInclusive(startDate, endDate ?? startDate).length
      : 0;

  return (
    <div className="trailer-reservation">
      <div className="trailer-cal">
        <div className="trailer-cal-header">
          <button
            type="button"
            className="trailer-cal-nav"
            onClick={() => shiftMonth(-1)}
            aria-label="Poprzedni miesiąc"
          >
            ‹
          </button>
          <h3>
            {MONTHS[viewMonth]} {viewYear}
          </h3>
          <button
            type="button"
            className="trailer-cal-nav"
            onClick={() => shiftMonth(1)}
            aria-label="Następny miesiąc"
          >
            ›
          </button>
        </div>

        <div className="trailer-cal-weekdays" aria-hidden="true">
          {WEEKDAYS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div className="trailer-cal-grid" role="grid" aria-label={`Kalendarz dostępności — ${itemLabel}`}>
          {cells.map((day, idx) =>
            day === null ? (
              <span key={`e-${idx}`} className={dayClass(null)} />
            ) : (
              <button
                key={toIso(viewYear, viewMonth, day)}
                type="button"
                className={dayClass(day)}
                onClick={() => handleDayClick(day)}
                disabled={
                  toIso(viewYear, viewMonth, day) < today ||
                  isDateBooked(toIso(viewYear, viewMonth, day), bookings)
                }
              >
                {day}
              </button>
            ),
          )}
        </div>

        <div className="trailer-cal-legend">
          <span>
            <i className="trailer-dot trailer-dot-free" /> wolne
          </span>
          <span>
            <i className="trailer-dot trailer-dot-booked" /> zajęte
          </span>
          <span>
            <i className="trailer-dot trailer-dot-selected" /> wybrane
          </span>
        </div>

        {loading && <p className="trailer-cal-hint">Ładowanie dostępności…</p>}
        {loadError && <p className="trailer-cal-hint trailer-cal-hint--warn">{loadError}</p>}
        {pickHint && <p className="trailer-cal-hint trailer-cal-hint--warn">{pickHint}</p>}
      </div>

      <div className="trailer-cal-cta">
        <p className="trailer-range-label">{formatRangeLabel(startDate, endDate)}</p>
        {selectedDays > 0 && (
          <p className="trailer-range-meta">
            {selectedDays === 1 ? "1 dzień" : `${selectedDays} dni`}
          </p>
        )}
        <button
          type="button"
          className="btn-primary contact-form_submit"
          onClick={openModal}
          disabled={!startDate}
        >
          Zarezerwuj
        </button>
      </div>

      {modalOpen && (
        <div
          className="trailer-modal-backdrop"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="trailer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="trailer-modal-header">
              <h3 id={titleId}>Rezerwacja — {itemLabel}</h3>
              <button
                ref={closeRef}
                type="button"
                className="trailer-modal-close"
                onClick={closeModal}
                aria-label="Zamknij"
                disabled={status === "sending"}
              >
                ×
              </button>
            </div>

            <p className="trailer-range-label trailer-modal-range">
              {status === "success"
                ? confirmedRange
                : formatRangeLabel(startDate, endDate)}
            </p>

            {status === "success" ? (
              <div className="contact-form-success">
                <p>
                  Rezerwacja wysłana! Na podany e-mail wysłaliśmy potwierdzenie z
                  linkiem do wszystkich Twoich rezerwacji. Skontaktujemy się, żeby
                  ją potwierdzić.
                </p>
                <button type="button" className="btn-primary" onClick={closeModal}>
                  Zamknij
                </button>
              </div>
            ) : (
              <form className="trailer-form contact-form_form" onSubmit={handleSubmit}>
                {(formError || status === "error") && (
                  <div className="contact-form-error">
                    <p>{formError ?? "Nie udało się zapisać rezerwacji."}</p>
                  </div>
                )}

                <div className="contact-form_fields-row">
                  <label className="contact-form_field">
                    <span>
                      Imię / nazwa <em>(wymagane)</em>
                    </span>
                    <input type="text" name={`${fieldId}_name`} required autoComplete="name" />
                  </label>
                  <label className="contact-form_field">
                    <span>
                      Telefon <em>(wymagane)</em>
                    </span>
                    <input type="tel" name={`${fieldId}_phone`} required autoComplete="tel" />
                  </label>
                </div>
                <label className="contact-form_field">
                  <span>
                    E-mail <em>(wymagane)</em>
                  </span>
                  <input type="email" name={`${fieldId}_email`} required autoComplete="email" />
                </label>
                <label className="contact-form_field">
                  <span>Uwagi</span>
                  <textarea name={`${fieldId}_notes`} rows={3} placeholder="Np. godzina odbioru" />
                </label>
                <button
                  type="submit"
                  className="btn-primary contact-form_submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Wysyłanie…" : "Zarezerwuj"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
