export type TrailerReservationStatus = "pending" | "confirmed" | "cancelled";

export type RentalResource = "trailer" | "sup";

export const RENTAL_RESOURCES: RentalResource[] = ["trailer", "sup"];

export const rentalResourceLabels: Record<RentalResource, string> = {
  trailer: "przyczepa rowerowa",
  sup: "deski SUP",
};

export function isRentalResource(value: string): value is RentalResource {
  return RENTAL_RESOURCES.includes(value as RentalResource);
}

export type TrailerReservation = {
  id: number;
  resource: RentalResource;
  name: string;
  email: string;
  phone: string;
  start_date: string; // YYYY-MM-DD
  end_date: string;
  notes: string | null;
  status: TrailerReservationStatus;
  created_at: string;
};

export type TrailerBookingRange = {
  start_date: string;
  end_date: string;
  status: Exclude<TrailerReservationStatus, "cancelled">;
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatLocalDate(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function isValidIsoDate(value: string) {
  if (!DATE_RE.test(value)) return false;
  const [y, m, day] = value.split("-").map(Number);
  const d = new Date(y, m - 1, day);
  return (
    d.getFullYear() === y &&
    d.getMonth() === m - 1 &&
    d.getDate() === day
  );
}

export function todayIsoDate() {
  return formatLocalDate(new Date());
}

export function compareIsoDates(a: string, b: string) {
  return a.localeCompare(b);
}

/** Inclusive range: each day from start through end as YYYY-MM-DD */
export function eachDayInclusive(start: string, end: string): string[] {
  const days: string[] = [];
  const [sy, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  const cursor = new Date(sy, sm - 1, sd);
  const last = new Date(ey, em - 1, ed);
  while (cursor <= last) {
    days.push(formatLocalDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export function rangesOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
) {
  return compareIsoDates(aStart, bEnd) <= 0 && compareIsoDates(bStart, aEnd) <= 0;
}

export function isDateBooked(date: string, ranges: TrailerBookingRange[]) {
  return ranges.some(
    (r) => compareIsoDates(date, r.start_date) >= 0 && compareIsoDates(date, r.end_date) <= 0,
  );
}

export function rangeHasConflict(
  start: string,
  end: string,
  ranges: TrailerBookingRange[],
) {
  return ranges.some((r) => rangesOverlap(start, end, r.start_date, r.end_date));
}
