import { NextRequest, NextResponse } from "next/server";
import { contact } from "@/lib/content";

// Zamiennik logiki formularza kontaktowego z contact_page.php (WordPress).
// W WordPressie formularz zapisywał zgłoszenie jako wpis (contact_form_answers)
// i wysyłał e-mail przez wp_mail(). Tutaj, ponieważ nie ma już WordPressa/bazy danych,
// wysyłamy e-mail bezpośrednio przez Resend (https://resend.com).
//
// Jak podłączyć wysyłkę maili:
// 1. Załóż darmowe konto na https://resend.com i zweryfikuj domenę (albo użyj
//    ich domeny testowej na start).
// 2. Wygeneruj API key i dodaj go w Vercel: Project Settings -> Environment
//    Variables -> RESEND_API_KEY.
// 3. Opcjonalnie ustaw CONTACT_FROM_EMAIL na adres z Twojej zweryfikowanej domeny
//    (np. formularz@uksrar.pl). Bez tego użyty zostanie adres testowy Resend.
//
// Dopóki RESEND_API_KEY nie jest ustawiony, zgłoszenia są tylko logowane
// w konsoli (widoczne w Vercel -> Deployments -> Logs), żeby formularz
// dało się przetestować zanim podłączysz właściwą wysyłkę maili.

type ContactPayload = {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const topic = (body.topic ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Uzupełnij poprawnie wymagane pola." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    // Brak konfiguracji e-mail - logujemy zgłoszenie, żeby formularz działał od razu.
    console.log("[kontakt] Nowe zgłoszenie (RESEND_API_KEY nie ustawiony):", {
      name,
      email,
      topic,
      message,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Rudzka Akademia Rowerowa <onboarding@resend.dev>",
        to: contact.email,
        reply_to: email,
        subject: `Nowa wiadomość ze strony: ${topic || "Kontakt"}`,
        text: `Imię: ${name}\nE-mail: ${email}\nTemat: ${topic}\n\nWiadomość:\n${message}`,
      }),
    });

    if (!res.ok) {
      const details = await res.text();
      console.error("[kontakt] Błąd wysyłki e-mail:", details);
      return NextResponse.json({ error: "Nie udało się wysłać wiadomości." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[kontakt] Błąd wysyłki e-mail:", err);
    return NextResponse.json({ error: "Nie udało się wysłać wiadomości." }, { status: 500 });
  }
}
