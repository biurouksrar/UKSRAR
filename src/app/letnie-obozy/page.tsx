import type { Metadata } from "next";
import Link from "next/link";
import { campData } from "@/lib/content";

export const metadata: Metadata = {
  title: `${campData.title} | Rudzka Akademia Rowerowa`,
  description:
    "Obóz Rowerowy VIP Pieniny 2026 - kameralne grupy, doświadczeni instruktorzy i niezapomniane trasy w Pieninach.",
};

export default function SummerCampPage() {
  return (
    <>
      <section
        id="hero-camp"
        className="hero hero-camp"
        style={{ background: "url(/images/camp-hero.webp) no-repeat center center/cover" }}
        role="img"
        aria-label="Hero sekcja - Obóz Rowerowy VIP Pieniny"
      >
        <div className="hero-content camps">
          <h1>{campData.title}</h1>
        </div>
      </section>

      {/* Camp Description Section */}
      <section id="camp-description" className="container-secondary camps">
        <h2>WAKACJE W STANDARDZIE VIP DLA TWOJEGO DZIECKA!</h2>
        <h3>
          Szukasz wakacji, które odciągną Twoje dziecko od ekranu telefonu i zaszczepią w nim
          miłość do sportu?
        </h3>
        <p>
          W Rudzkiej Akademii Rowerowej wierzymy, że najlepsza nauka odbywa się przez zabawę w
          gronie rówieśników. Nasz obóz to nie tylko kilometry na liczniku to przede wszystkim
          szkoła charakteru, techniki i bezpieczeństwa na drodze.
        </p>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="container-primary">
        <h2>Informacje i harmonogram</h2>
        <div className="container schedule-container">
          <div className="inner-container schedule">
            <h3>Co wyróżnia standard VIP?</h3>
            <p>Nie jesteśmy masową kolonią. Stawiamy na jakość i relacje:</p>
            <ul>
              {campData.vipDetails.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className="inner-container schedule">
            <h3>Program naszpikowany atrakcjami</h3>
            <p>
              Nasze trasy dobieramy tak, by cieszyły oko i rozwijały umiejętności (wymagana bardzo
              dobra umiejętność jazdy):
            </p>
            <ul>
              {campData.programDetails.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className="inner-container schedule">
            <h3>Wybierz swój termin:</h3>
            <ul>
              <li>
                <b>Turnus 1:</b> {campData.dateOne}
              </li>
              <li>
                <b>Turnus 2:</b> {campData.dateTwo}
              </li>
            </ul>
            <p>
              <b>Inwestycja w pasję Twojego dziecka:</b> {campData.price}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact-camp"
        className="contact contact-image"
        style={{ background: "url(/images/contact-bg.webp) no-repeat center center/cover" }}
        role="img"
        aria-label="Sekcja kontaktu - Pytania o obóz letni"
      >
        <div className="contact-content">
          <h2>MASZ PYTANIA?</h2>
          <p>Skontaktuj się z nami, jeśli chcesz dowiedzieć się więcej o obozie letnim.</p>
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
