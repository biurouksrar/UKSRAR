import Link from "next/link";
import Image from "next/image";
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
        <Link className="footer-logo" href="/">
          <Image
            src="/images/logo.png"
            alt={`${site.name} Logo`}
            width={160}
            height={128}
            style={{ height: "8rem", width: "auto" }}
          />
        </Link>

        <div className="contact-info">
          <h3>Kontakt</h3>
          <a href={contact.emailHref}>
            <i className="fa-solid fa-envelope" style={{ fontSize: "2rem", color: "#1E212B" }} />
            <p>{contact.email}</p>
          </a>
          <a href={contact.phoneHref}>
            <i className="fa-solid fa-phone" style={{ fontSize: "2rem", color: "#1E212B" }} />
            <p>{contact.phone}</p>
          </a>
        </div>

        <div className="quick-links">
          <h3>Skróty</h3>
          {navLinks.map((link) => (
            <p key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </p>
          ))}
          <p>
            <Link href="/kontakt">Kontakt</Link>
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
