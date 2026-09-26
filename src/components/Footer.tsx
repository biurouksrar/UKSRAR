import { contact, navLinks, site, socialLinks } from "@/lib/content";

const iconClass: Record<string, string> = {
  instagram: "fa-brands fa-instagram",
  tiktok: "fa-brands fa-tiktok",
  facebook: "fa-brands fa-facebook",
};

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="contact-info">
          <h3>Kontakt</h3>
          <a href={contact.emailHref}>
            <i className="fa-solid fa-envelope" style={{ fontSize: "2rem", color: "#24343C" }} />
            <p>{contact.email}</p>
          </a>
          <div className="footer-phone footer-phone--desktop">
            <i className="fa-solid fa-phone" style={{ fontSize: "2rem", color: "#24343C" }} />
            <p>{contact.phone}</p>
          </div>
          <a href={contact.phoneHref} className="footer-phone footer-phone--mobile">
            <i className="fa-solid fa-phone" style={{ fontSize: "2rem", color: "#24343C" }} />
            <p>{contact.phone}</p>
          </a>
        </div>

        <div className="quick-links">
          <h3>Skróty</h3>
          {navLinks.map((link) => (
            <p key={link.href}>
              <a href={link.href}>{link.label}</a>
            </p>
          ))}
          <p>
            <a href="/#contact-form">Kontakt</a>
          </p>
        </div>

        <div className="social-icons">
          <h3>Zaobserwuj nas</h3>
          <div className="footer-icons">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
                <i className={iconClass[social.icon]} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="copyright">© {new Date().getFullYear()} {site.name}. Wszelkie prawa zastrzeżone.</p>
    </footer>
  );
}
