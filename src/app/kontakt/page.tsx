import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { contact, faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kontakt | Rudzka Akademia Rowerowa",
  description: "Skontaktuj się z Rudzką Akademią Rowerową - telefon, e-mail lub formularz kontaktowy.",
};

export default function ContactPage() {
  return (
    <>
      <section id="contact-us" className="contact-us container-secondary">
        <h2>Masz jakieś pytania?</h2>
        <p>Zadbamy, abyśmy dostarczyli odpowiedzi, które potrzebujesz, tak szybko, jak to możliwe.</p>
        <div className="container">
          <div className="inner-container contact-icon">
            <i className="fa-solid fa-phone" style={{ fontSize: "3rem" }} />
            <a href={contact.phoneHref}>
              <p>{contact.phone}</p>
            </a>
          </div>
          <div className="inner-container contact-icon">
            <i className="fa-solid fa-envelope" style={{ fontSize: "3rem" }} />
            <a href={contact.emailHref}>
              <p>{contact.email}</p>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="contact-form container-primary">
        <h2>Wyślij do nas wiadomość</h2>
        <ContactForm />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container-primary faq-section">
        <h2>Najczęściej zadawane pytania</h2>
        {faq.map((item) => (
          <div className="faq-box" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </section>
    </>
  );
}
