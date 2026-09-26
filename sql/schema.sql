-- UKSRAR — schemat bazy (PostgreSQL / Neon)
-- Jedna baza, dwa środowiska jako osobne schematy Postgres:
--   app_dev  → lokalny development (APP_ENV=dev)
--   app_prod → produkcja www.uksrar.pl (APP_ENV=prod)
--
-- Aktualnie: wypożyczenia (przyczepa, deski SUP).
-- W przyszłości: kolejne zasoby w rental_reservations.resource
-- oraz osobna tabela rezerwacji obozów w tych samych schematach.

CREATE SCHEMA IF NOT EXISTS app_dev;
CREATE SCHEMA IF NOT EXISTS app_prod;

-- ---------------------------------------------------------------------------
-- Rezerwacje wypożyczalni (przyczepa / SUP / …)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS app_dev.rental_reservations (
  id            BIGSERIAL PRIMARY KEY,
  resource      TEXT NOT NULL
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
  CONSTRAINT rental_reservations_dates_chk CHECK (end_date >= start_date)
);

CREATE TABLE IF NOT EXISTS app_prod.rental_reservations (
  id            BIGSERIAL PRIMARY KEY,
  resource      TEXT NOT NULL
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
  CONSTRAINT rental_reservations_dates_chk CHECK (end_date >= start_date)
);

CREATE INDEX IF NOT EXISTS rental_reservations_resource_range_idx
  ON app_dev.rental_reservations (resource, start_date, end_date)
  WHERE status <> 'cancelled';

CREATE INDEX IF NOT EXISTS rental_reservations_resource_range_idx
  ON app_prod.rental_reservations (resource, start_date, end_date)
  WHERE status <> 'cancelled';

CREATE INDEX IF NOT EXISTS rental_reservations_email_idx
  ON app_dev.rental_reservations (lower(email));

CREATE INDEX IF NOT EXISTS rental_reservations_email_idx
  ON app_prod.rental_reservations (lower(email));

-- ---------------------------------------------------------------------------
-- Stały link klienta do listy rezerwacji (bez logowania)
-- Jeden token na adres e-mail — kolejne rezerwacje trafiają pod ten sam link.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS app_dev.rental_access_tokens (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT NOT NULL,
  token       TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT rental_access_tokens_email_uq UNIQUE (email),
  CONSTRAINT rental_access_tokens_token_uq UNIQUE (token)
);

CREATE TABLE IF NOT EXISTS app_prod.rental_access_tokens (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT NOT NULL,
  token       TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT rental_access_tokens_email_uq UNIQUE (email),
  CONSTRAINT rental_access_tokens_token_uq UNIQUE (token)
);
