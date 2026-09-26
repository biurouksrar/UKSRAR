import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contact } from "@/lib/content";

// Formularz kontaktowy – wysyłka przez Gmail SMTP.
//
// W .env.local / Vercel Environment Variables ustaw:
//   GMAIL_USER=biurouksrar@gmail.com
//   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   (hasło aplikacji z Google)
//   CONTACT_TO_EMAIL=biurouksrar@gmail.com   (opcjonalnie)
//
// Hasło aplikacji: konto Google → bezpieczeństwo → weryfikacja 2-etapowa
// → hasła aplikacji → Poczta.

type ContactPayload = {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
};

const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? contact.email;

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

  if (!name || !email || !isValidEmail(email) || !message) {
    return NextResponse.json({ error: "Uzupełnij poprawnie wymagane pola." }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");

  if (!gmailUser || !gmailPass) {
    console.error("[kontakt] Brak GMAIL_USER lub GMAIL_APP_PASSWORD w zmiennych środowiskowych.");
    return NextResponse.json(
      { error: "Formularz nie jest skonfigurowany. Brakuje danych skrzynki Gmail." },
      { status: 503 },
    );
  }

  const subject = `Nowa wiadomość ze strony: ${topic || "Kontakt"}`;
  const text = `Imię: ${name}\nE-mail: ${email}\nTemat: ${topic || "—"}\n\nWiadomość:\n${message}`;

  const copySubject = `Kopia Twojej wiadomości: ${topic || "Kontakt"}`;
  const copyText = [
    `Cześć ${name},`,
    "",
    "Otrzymaliśmy Twoją wiadomość wysłaną przez formularz na stronie uksrar.pl.",
    "Poniżej znajduje się jej kopia:",
    "",
    `Temat: ${topic || "—"}`,
    "",
    message,
    "",
    "—",
    "Rudzka Akademia Rowerowa",
    contact.email,
    contact.phone,
  ].join("\n");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: `"Wiadomość z formularza" <${gmailUser}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject,
      text,
    });

    await transporter.sendMail({
      from: `"Rudzka Akademia Rowerowa" <${gmailUser}>`,
      to: email,
      subject: copySubject,
      text: copyText,
    });

    return NextResponse.json({ ok: true, delivered: true, via: "gmail" });
  } catch (err) {
    console.error("[kontakt] Błąd wysyłki Gmail:", err);
    return NextResponse.json({ error: "Nie udało się wysłać wiadomości." }, { status: 500 });
  }
}
