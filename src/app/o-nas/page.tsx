import type { Metadata } from "next";
import Link from "next/link";
import InstructorsSection from "@/components/InstructorsSection";

export const metadata: Metadata = {
  title: "O nas | Rudzka Akademia Rowerowa",
  description:
    "Poznaj zespół Rudzkiej Akademii Rowerowej - naszą misję, doświadczenie i instruktorów.",
};

export default function AboutPage() {
  return (
    <>
      <section
        id="hero-about"
        className="hero hero-about"
        style={{ background: "url(/images/about-hero.webp) no-repeat center center/cover" }}
        role="img"
        aria-label="Hero sekcja - Poznaj nasz zespół"
      >
        <div className="hero-content">
          <h1>POZNAJ NASZ ZESPÓŁ</h1>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="container-primary">
        <h2>Nasza misja</h2>
        <div className="container">
          <p>
            Naszym celem jest promowanie aktywności fizycznej dla dzieci, młodzieży i dorosłych
            poprzez jazdę na rowerze, wycieczki rowerowe oraz wspólne aktywności na świeżym
            powietrzu. Chcemy zachęcać do zdrowego i aktywnego stylu życia poprzez sport i
            budowanie rowerowej społeczności.
          </p>
        </div>
        <div className="container">
          <div className="inner-container facts">
            <i className="fa-solid fa-medal" style={{ fontSize: "4rem" }} />
            <p className="bold">DOŚWIADCZENIE</p>
          </div>
          <div className="inner-container facts">
            <i className="fa-solid fa-clock" style={{ fontSize: "4rem" }} />
            <p className="bold">CZAS</p>
          </div>
          <div className="inner-container facts">
            <i className="fa-solid fa-star" style={{ fontSize: "4rem" }} />
            <p className="bold">SATYSFAKCJA</p>
          </div>
        </div>
      </section>

      <div className="container-secondary">
        <div className="split-container">
          <div className="inner-container about-events">
            <h2>Dlaczego warto jeździć na rowerze?</h2>
            <p>
              Jazda na rowerze to doskonały sposób na rozwój, aktywność fizyczną i dobrą zabawę na
              świeżym powietrzu. Organizowane przez nas zajęcia rowerowe dla dzieci oraz wydarzenia
              sportowe pomagają budować pewność siebie, relacje i pasję do aktywnego stylu życia.
            </p>
            <div className="button-container">
              <Link href="/wydarzenia" className="btn btn-secondary">
                Zobacz wydarzenia
              </Link>
            </div>
          </div>
          <div
            className="image-container about-image"
            style={{ background: "url(/images/about-image.webp) no-repeat center center/cover" }}
            role="img"
            aria-label="Obraz o nas - Rudzka Akademia Rowerowa"
          />
        </div>
      </div>

      {/* Team Section */}
      <section id="team" className="team container-primary">
        <h2>NASZ ZESPÓŁ</h2>
        <InstructorsSection />
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
