import ContactForm from "@/components/ContactForm";
import GallerySection from "@/components/GallerySection";
import NewsSection from "@/components/NewsSection";
import RentalSection from "@/components/RentalSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { contact, instructors } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* Hero: full-bleed photo, CTA strip below */}
      <section id="hero" className="hero-home-block">
        <div
          className="hero hero-home"
          style={{ background: "url(/images/front.png) no-repeat center center/cover" }}
          role="img"
          aria-label="Zdjęcie grupowe - Rudzka Akademia Rowerowa"
        />
      </section>

      {/* About + Mission + Team */}
      <section id="about" className="about about-mission container-primary">
        <h2>Dlaczego warto nas wybrać?</h2>
        <div className="about-mission-block">
          <p className="about-mission-label">Nasza misja</p>
          <div className="about-mission-row">
            <p className="about-mission-text">
              Naszym celem jest promowanie aktywności fizycznej dla dzieci, młodzieży i dorosłych
              poprzez jazdę na rowerze, wycieczki rowerowe oraz wspólne aktywności na świeżym
              powietrzu. Chcemy zachęcać do zdrowego i aktywnego stylu życia poprzez sport i
              budowanie rowerowej społeczności.
            </p>
            <div className="about-mission-points">
              <div className="about-point">
                <i className="fa-solid fa-bicycle" aria-hidden="true" />
                <p>Kolarstwo dla każdego</p>
              </div>
              <div className="about-point">
                <i className="fa-solid fa-user-check" aria-hidden="true" />
                <p>Ponad 10 lat doświadczenia</p>
              </div>
              <div className="about-point">
                <i className="fa-solid fa-campground" aria-hidden="true" />
                <p>Niezapomniane wyjazdy i obozy</p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-team">
          <p className="about-mission-label">Nasz zespół</p>
          <div className="about-team-grid">
            {instructors.map((person) => (
              <article className="about-team-card" key={person.id}>
                <h3>{person.name}</h3>
                <p>{person.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="oferta" className="oferta events container-secondary">
        <h2>Oferta dla dzieci i młodzieży</h2>
        <div className="split-container">
          <div
            className="image-container events-image"
            style={{ background: "url(/images/events-image.webp) no-repeat center center/cover" }}
            role="img"
            aria-label="Aktywnie razem - obozy i wycieczki rowerowe"
          />
          <div className="inner-container events-intro">
            <h3>Aktywnie razem - obozy i wycieczki rowerowe</h3>
            <p>
              Organizujemy wycieczki rowerowe oraz obozy letnie dla dzieci pełne sportu,
              aktywności fizycznej i dobrej zabawy. To idealna okazja, aby rozwijać pasję do jazdy
              na rowerze i spędzać aktywnie czas na świeżym powietrzu.
            </p>
          </div>
        </div>
      </section>

      <GallerySection />

      <NewsSection className="container-secondary" />

      <RentalSection />

      {/* ========== KONTAKT ========== */}
      <div id="contact" className="contact-split">
        <section id="contact-form" className="contact-form contact-split-form">
          <h2>Wyślij do nas wiadomość</h2>
          <ContactForm />
        </section>

        <section id="contact-us" className="contact-us contact-split-info">
          <div className="contact-info-card">
            <h2>Masz jakieś pytania?</h2>
            <p>Skontaktuj się z nami — wybierz najwygodniejszy sposób.</p>
            <div className="contact-split-details">
              <div className="contact-channel contact-channel-phone contact-channel-phone--desktop">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                <span className="contact-channel-label">Zadzwoń</span>
                <span className="contact-channel-value">{contact.phone}</span>
              </div>
              <a
                href={contact.phoneHref}
                className="contact-channel contact-channel-phone contact-channel-phone--mobile"
              >
                <i className="fa-solid fa-phone" aria-hidden="true" />
                <span className="contact-channel-label">Zadzwoń</span>
                <span className="contact-channel-value">{contact.phone}</span>
              </a>
              <a href={contact.emailHref} className="contact-channel">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <span className="contact-channel-label">Napisz e-mail</span>
                <span className="contact-channel-value">{contact.email}</span>
              </a>
              <div className="contact-channel contact-channel-plain">
                <i className="fa-solid fa-pen-to-square" aria-hidden="true" />
                <span className="contact-channel-label">Formularz</span>
                <span className="contact-channel-value">Skorzystaj z formularza na stronie</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Testimonials — na końcu, przed stopką / belką copyright */}
      <section id="testimonials" className="container-primary testimonials">
        <h2>CO MÓWIĄ NASI UCZESTNICY</h2>
        <TestimonialsSection />
      </section>
    </>
  );
}
