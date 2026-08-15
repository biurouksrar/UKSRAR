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

- `src/app/` - strony (routing App Routera): `/`, `/o-nas`, `/wydarzenia`, `/letnie-obozy`,
  `/kontakt`, `/aktualnosci/[slug]`
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
- **Wpisy "Aktualności"** -> `newsPosts` (dodaj nowy obiekt do tablicy, żeby dodać nowy
  artykuł - strona `/aktualnosci/[slug]` wygeneruje się automatycznie)
- **Dane obozu letniego** (terminy, cena, program) -> `campData`
- **FAQ na stronie kontaktu** -> `faq`

Zdjęcia dodawaj do `public/images/` i odwołuj się do nich jako `/images/nazwa-pliku.webp`.

## Formularz kontaktowy

W WordPressie formularz zapisywał zgłoszenia w bazie danych i wysyłał e-mail przez
`wp_mail()`. Tutaj nie ma już bazy danych, więc formularz (`src/app/api/contact/route.ts`)
wysyła e-mail bezpośrednio przez [Resend](https://resend.com) (darmowy plan wystarczy w zupełności).

**Żeby formularz realnie wysyłał wiadomości:**

1. Załóż darmowe konto na [resend.com](https://resend.com).
2. Wygeneruj API key.
3. W Vercel: Project Settings -> Environment Variables -> dodaj `RESEND_API_KEY`.
4. (Opcjonalnie, po zweryfikowaniu własnej domeny w Resend) dodaj też
   `CONTACT_FROM_EMAIL`, np. `Rudzka Akademia Rowerowa <kontakt@uksrar.pl>`.

Dopóki `RESEND_API_KEY` nie jest ustawiony, zgłoszenia z formularza są tylko logowane w
konsoli (widoczne w Vercel -> Deployments -> Logs), więc formularz da się przetestować od
razu po wdrożeniu.

## Kalendarz wydarzeń

Na stronie `/wydarzenia` kalendarz to osadzony (iframe) publiczny kalendarz Google
(`biurouksrar@gmail.com`) - dokładnie ten sam kalendarz, który był podpięty przez wtyczkę
Google Calendar Events w WordPressie. Żeby dodać/zmienić wydarzenia, edytuj je bezpośrednio
w Google Calendar na koncie `biurouksrar@gmail.com` - zmiany pojawią się na stronie
automatycznie, bez potrzeby redeployu.

## Wdrożenie na Vercel

1. Wypchnij repo na GitHub (jeśli jeszcze nie jest).
2. Wejdź na [vercel.com](https://vercel.com) -> "Add New Project" -> wybierz to repo.
3. Vercel sam wykryje Next.js, nie trzeba nic konfigurować.
4. Dodaj zmienne środowiskowe (`RESEND_API_KEY` itd.) w Project Settings -> Environment
   Variables.
5. Deploy.

Każdy kolejny `git push` na branch main będzie automatycznie wdrażał nową wersję.

## Czego brakuje / co warto jeszcze zrobić

- Podpięcie własnej domeny `uksrar.pl` w ustawieniach projektu w Vercel (Domains) i
  przekierowanie DNS.
- Skonfigurowanie Resend do faktycznej wysyłki maili z formularza (patrz wyżej).
- Fonty (Baloo Chettan 2, IBM Plex Sans) i ikony (Font Awesome) są ładowane z tych samych
  CDN-ów co w oryginalnej stronie WordPress - działa to od razu, bez dodatkowej konfiguracji.
