# Rudzka Akademia Rowerowa - Next.js

Przepisana wersja strony [uksrar.pl](https://uksrar.pl) z WordPressa na Next.js (App Router,
TypeScript). Wygląd 1:1 z oryginałem - te same treści, zdjęcia, kolory i układ, tylko bez
WordPressa pod spodem.

## Uruchomienie lokalnie

```bash
npm install
npm run dev
```

Strona wystartuje na http://localhost:3000

## Struktura projektu

- `src/app/` - jedna strona główna (`/`); stare ścieżki (`/o-nas`, `/wydarzenia`,
  `/letnie-obozy`, `/kontakt`, `/aktualnosci/...`) przekierowują na `/`
- `src/components/` - komponenty UI (Header, Footer, formularz kontaktowy, sekcje)
- `src/lib/content.ts` - **wszystkie treści strony w jednym miejscu**: dane kontaktowe,
  opinie, instruktorzy, wpisy "Aktualności", dane obozu letniego, FAQ. To jest odpowiednik
  bazy danych WordPressa - edytuj ten plik, żeby zmienić treści na stronie.
- `src/app/globals.css` - style, przeniesione 1:1 z oryginalnego motywu WordPress
  (`style.css` z `wp-content/themes/examtheme`)
- `public/images/` - zdjęcia z biblioteki mediów WordPressa

## Jak dodać/zmienić treść

Wszystko jest w `src/lib/content.ts`:

- **Dane kontaktowe** (telefon, e-mail) -> `contact`
- **Linki społecznościowe** -> `socialLinks`
- **Opinie klientów** -> `testimonials`
- **Instruktorzy** -> `instructors`
- **Wpisy "Aktualności"** -> `newsPosts` (dodaj nowy obiekt do tablicy — treść pojawia
  się na stronie głównej jako sekcja `#post-{slug}`)
- **Dane obozu letniego** (terminy, cena, program) -> `campData`
- **FAQ** -> `faq`

Zdjęcia dodawaj do `public/images/` i odwołuj się do nich jako `/images/nazwa-pliku.webp`.

## Formularz kontaktowy

W WordPressie formularz zapisywał zgłoszenia w bazie danych i wysyłał e-mail przez
`wp_mail()`. Tutaj formularz (`src/app/api/contact/route.ts`) wysyła wiadomość przez
**Gmail SMTP** (hasło aplikacji Google).

**Żeby formularz realnie wysyłał wiadomości:**

1. Na koncie `biurouksrar@gmail.com` włącz weryfikację dwuetapową.
2. Utwórz [hasło aplikacji](https://myaccount.google.com/apppasswords) dla „Poczta”.
3. W `.env.local` (lokalnie) lub Vercel → Environment Variables ustaw:
   - `GMAIL_USER=biurouksrar@gmail.com`
   - `GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx`
   - `CONTACT_TO_EMAIL=biurouksrar@gmail.com` (opcjonalnie)
4. Zrestartuj `npm run dev` / zrób Redeploy na Vercel.

## Kalendarz wydarzeń

Kalendarz na stronie głównej to osadzony (iframe) publiczny kalendarz Google
(`biurouksrar@gmail.com`) - dokładnie ten sam kalendarz, który był podpięty przez wtyczkę
Google Calendar Events w WordPressie. Żeby dodać/zmienić wydarzenia, edytuj je bezpośrednio
w Google Calendar na koncie `biurouksrar@gmail.com` - zmiany pojawią się na stronie
automatycznie, bez potrzeby redeployu.

## Wdrożenie na Vercel

1. Wypchnij repo na GitHub (jeśli jeszcze nie jest).
2. Wejdź na [vercel.com](https://vercel.com) -> "Add New Project" -> wybierz to repo.
3. Vercel sam wykryje Next.js, nie trzeba nic konfigurować.
4. Dodaj zmienne środowiskowe (`GMAIL_USER`, `GMAIL_APP_PASSWORD`) w Project Settings -> Environment
   Variables.
5. Deploy.

Każdy kolejny `git push` na branch main będzie automatycznie wdrażał nową wersję.

## Czego brakuje / co warto jeszcze zrobić

- Podpięcie własnej domeny `uksrar.pl` w ustawieniach projektu w Vercel (Domains) i
  przekierowanie DNS.
- Skonfigurowanie Gmail (hasło aplikacji) do wysyłki maili z formularza (patrz wyżej).
- Fonty (Baloo Chettan 2, IBM Plex Sans) i ikony (Font Awesome) są ładowane z tych samych
  CDN-ów co w oryginalnej stronie WordPress - działa to od razu, bez dodatkowej konfiguracji.
