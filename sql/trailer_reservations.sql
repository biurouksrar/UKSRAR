-- Schemat rezerwacji wypożyczalni (PostgreSQL)
-- Uruchom raz na bazie po otrzymaniu credentials.

CREATE TABLE IF NOT EXISTS trailer_reservations (
  id            BIGSERIAL PRIMARY KEY,
  resource      TEXT NOT NULL DEFAULT 'trailer'
                  CHECK (resource IN ('trailer', 'sup')),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT NOT NULL,
  start_date    DATE NOT NULL,
  end_date      DATE NOT NULL,
  notes         TEXT,
  status        TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT trailer_reservations_dates_chk CHECK (end_date >= start_date)
);

-- Szybkie sprawdzanie kolizji zakresów dat w ramach zasobu
CREATE INDEX IF NOT EXISTS trailer_reservations_resource_range_idx
  ON trailer_reservations (resource, start_date, end_date)
  WHERE status <> 'cancelled';
