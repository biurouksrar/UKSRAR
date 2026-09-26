"use client";

import { useState, useEffect, FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status !== "success" && status !== "error") return;

    const ms = status === "success" ? 5_000 : 8_000;
    const timer = setTimeout(() => setStatus("idle"), ms);
    return () => clearTimeout(timer);
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("contact_name") as HTMLInputElement).value,
      email: (form.elements.namedItem("contact_email") as HTMLInputElement).value,
      topic: (form.elements.namedItem("contact_topic") as HTMLInputElement).value,
      message: (form.elements.namedItem("contact_message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="contact-form-card">
      {status === "success" && (
        <div className="contact-form-toast" role="status" aria-live="polite">
          <p>Dziękujemy za wiadomość! Skontaktujemy się wkrótce.</p>
        </div>
      )}
      {status === "error" && (
        <div className="contact-form-error">
          <p>
            Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na nasz adres e-mail.
          </p>
        </div>
      )}
      <form className="contact-form_form" onSubmit={handleSubmit}>
        <div className="contact-form_fields-row">
          <label className="contact-form_field">
            <span>
              Nazwa <em>(wymagane)</em>
            </span>
            <input type="text" name="contact_name" required />
          </label>
          <label className="contact-form_field">
            <span>
              Adres e-mail <em>(wymagane)</em>
            </span>
            <input type="email" name="contact_email" required />
          </label>
        </div>
        <label className="contact-form_field">
          <span>Temat</span>
          <input type="text" name="contact_topic" />
        </label>
        <label className="contact-form_field">
          <span>
            Wiadomość <em>(wymagane)</em>
          </span>
          <textarea name="contact_message" rows={6} required />
        </label>
        <button type="submit" className="btn-primary contact-form_submit" disabled={status === "sending"}>
          {status === "sending" ? "Wysyłanie..." : "Wyślij"}
        </button>
      </form>
    </div>
  );
}
