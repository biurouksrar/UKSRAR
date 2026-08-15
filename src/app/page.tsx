import Link from "next/link";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="hero hero-home"
        style={{ background: "url(/images/hero-home.webp) no-repeat center center/cover" }}
        role="img"
        aria-label="Hero banner - Rudzka Akademia Rowerowa"
      >
        <div className="hero-content">
          <h1>Rudzka Akademia Rowerowa</h1>
          <p>Dla wszystkich, którzy chcą dobrze się bawić podczas jazdy na rowerze!</p>
          <div className="button-container">
            <Link href="/kontakt" className="btn btn-secondary">
              Dołącz do nas
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about container-secondary">
        <h2>Dlaczego warto nas wybrać?</h2>
        <div className="container">
          <div className="inner-container">
            <i className="fa-solid fa-bicycle" style={{ fontSize: "4rem" }} />
            <p>Kolarstwo dla każdego</p>
          </div>
          <div className="inner-container">
            <i className="fa-solid fa-user-check" style={{ fontSize: "4rem" }} />
            <p>Ponad 10 lat doświadczenia</p>
          </div>
          <div className="inner-container">
            <i className="fa-solid fa-campground" style={{ fontSize: "4rem" }} />
            <p>Niezapomniane wyjazdy i obozy</p>
          </div>
        </div>
        <Link href="/o-nas" className="btn btn-secondary">
          Dowiedz się więcej
        </Link>
      </section>

      {/* Events Section */}
      <section id="events" className="events container-primary">
        <h2>Wydarzenia</h2>
        <div className="container events-homepage">
          <Link href="/wydarzenia">
            <div
              className="image-container children"
              style={{ background: "url(/images/event-children.webp) no-repeat center center/cover" }}
              role="img"
              aria-label="Dzieci i młodzież - Wydarzenia rowerowe"
            >
              <p>Dzieci / Młodzież</p>
            </div>
          </Link>
          <Link href="/wydarzenia">
            <div
              className="image-container adults"
              style={{ background: "url(/images/event-adults.webp) no-repeat center center/cover" }}
              role="img"
              aria-label="Osoby dorosłe - Wydarzenia rowerowe"
            >
              <p>Osoby dorosłe</p>
            </div>
          </Link>
        </div>
        <Link href="/wydarzenia" className="btn btn-secondary">
          Dołącz do nas
        </Link>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container-secondary testimonials">
        <h2>CO MÓWIĄ NASI UCZESTNICY</h2>
        <TestimonialsSection />
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="contact contact-image"
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
