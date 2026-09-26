"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { navLinks, site, socialLinks } from "@/lib/content";

const iconClass: Record<string, string> = {
  instagram: "fa-brands fa-instagram",
  tiktok: "fa-brands fa-tiktok",
  facebook: "fa-brands fa-facebook-f",
};

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav-header${open ? " nav-open" : ""}`}>
      <div className="nav-inner">
        <a
          className="nav-branding"
          href="/#hero"
          onClick={() => {
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image
            className="nav-logo"
            src="/images/logo.png"
            alt={`${site.name} logo`}
            width={260}
            height={130}
            priority
          />
        </a>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-menu"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <i className={open ? "fas fa-xmark" : "fas fa-bars"} aria-hidden="true" />
          <span className="screen-reader-text">Przełącz nawigację</span>
        </button>

        <nav
          className={`navigation-area${open ? " open" : ""}`}
          id="primary-menu"
          aria-label="Nawigacja główna"
        >
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="nav-menu-cta">
              <a className="btn btn-primary" href="/#contact-form" onClick={() => setOpen(false)}>
                Kontakt
              </a>
            </li>
          </ul>

          <div className="mobile-social mobile-only">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={iconClass[social.icon]} aria-hidden="true" />
                <span className="screen-reader-text">{social.name}</span>
              </a>
            ))}
          </div>
        </nav>

        <div className="nav-social desktop-only">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={iconClass[social.icon]} style={{ fontSize: "2rem" }} aria-hidden="true" />
              <span className="screen-reader-text">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
