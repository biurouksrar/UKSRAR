-- Migracja: osobne kalendarze (przyczepa / deski SUP)
-- Uruchom, jeśli tabela trailer_reservations już istnieje bez kolumny resource.

ALTER TABLE trailer_reservations
  ADD COLUMN IF NOT EXISTS resource TEXT NOT NULL DEFAULT 'trailer';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'trailer_reservations_resource_chk'
  ) THEN
    ALTER TABLE trailer_reservations
      ADD CONSTRAINT trailer_reservations_resource_chk
      CHECK (resource IN ('trailer', 'sup'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS trailer_reservations_resource_range_idx
  ON trailer_reservations (resource, start_date, end_date)
  WHERE status <> 'cancelled';
