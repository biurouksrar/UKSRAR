import type { Metadata } from "next";
import Link from "next/link";
import NewsSection from "@/components/NewsSection";
import { contact, googleCalendarEmbedSrc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Wydarzenia | Rudzka Akademia Rowerowa",
  description:
    "Wycieczki rowerowe, obozy letnie i aktualności Rudzkiej Akademii Rowerowej. Zobacz kalendarz najbliższych wydarzeń.",
};

export default function EventsPage() {
  return (
    <>
      <div className="container-primary">
        <div className="split-container">
          <div
            className="image-container events-image"
            style={{ background: "url(/images/events-image.webp) no-repeat center center/cover" }}
            role="img"
            aria-label="Aktywnie razem - Wydarzenia rowerowe"
          />
          <div className="inner-container events-intro">
            <h2>Aktywnie razem - obozy i wycieczki rowerowe</h2>
            <p>
              Organizujemy wycieczki rowerowe oraz obozy letnie dla dzieci pełne sportu,
              aktywności fizycznej i dobrej zabawy. To idealna okazja, aby rozwijać pasję do jazdy
              na rowerze i spędzać aktywnie czas na świeżym powietrzu.
            </p>
            <div className="button-container">
              <a href="#calendar" className="btn btn-secondary">
                ZOBACZ KALENDARZ
              </a>
            </div>
          </div>
        </div>
      </div>

      <NewsSection />

      {/* Summer Camps Section */}
      <section id="summer-camps" className="summer-camps container-primary">
        <h2>LETNIE OBOZY</h2>
        <div className="container-camps">
          <div className="inner-container">
            <p>
              Nasze obozy letnie dla dzieci łączą sport, przygodę i wspólne aktywności na świeżym
              powietrzu. Każdy wyjazd to połączenie jazdy na rowerze, nauki nowych umiejętności i
              budowania niezapomnianych wspomnień.
            </p>
            <div
              className="image-container camps-image"
              style={{ background: "url(/images/camp-image.webp) no-repeat center center/cover" }}
              role="img"
              aria-label="Letnie obozy - Wakacje w standardzie VIP"
            >
              <p>Wakacje w standardzie VIP dla Twojego dziecka!</p>
            </div>
            <div className="button-container">
              <a href="#calendar" className="btn btn-secondary">
                Zobacz kalendarz
              </a>
              <Link href="/letnie-obozy" className="btn btn-primary">
                Zobacz obóz letni
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section id="calendar" className="calendar container-secondary calendar-section">
        <h2>Kalendarz</h2>
        <p>Zobacz nasze nadchodzące wyjazdy w poniższym kalendarzu.</p>
        <p>
          Aby zapisać się na obóz letni lub zajęcia, prosimy o przesłanie maila na adres{" "}
          <a href={contact.emailHref}>{contact.email}</a>
        </p>
        <div className="calendar-content">
          <iframe
            src={googleCalendarEmbedSrc}
            width="100%"
            height="600"
            title="Kalendarz wydarzeń Rudzkiej Akademii Rowerowej"
            loading="lazy"
          />
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="contact"
        style={{ background: "url(/images/contact-bg.webp) no-repeat center center/cover" }}
        role="img"
        aria-label="Sekcja kontaktu - Skontaktuj się z nami"
      >
        <div className="contact-content">
          <h2>NADAL MASZ WĄTPLIWOŚCI?</h2>
          <p>Skontaktuj się z nami, jeśli masz pytania.</p>
          <div className="button-container">
            <Link href="/kontakt" className="btn btn-primary">
              Zadzwoń do nas
            </Link>
            <Link href="/kontakt#contact-form" className="btn btn-light">
              Wyślij wiadomość
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
