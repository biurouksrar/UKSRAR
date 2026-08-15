"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks, site, socialLinks } from "@/lib/content";

const iconClass: Record<string, string> = {
  instagram: "fa-brands fa-instagram",
  tiktok: "fa-brands fa-tiktok",
  facebook: "fa-brands fa-facebook-f",
};

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={`nav-header${open ? " nav-open" : ""}`}>
      <div className="nav-inner">
        <Link className="nav-branding desktop-only" href="/">
          <Image
            className="nav-logo"
            src="/images/logo.png"
            alt={`${site.name} logo`}
            width={200}
            height={100}
            priority
          />
        </Link>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-menu"
          aria-label="Otwórz menu"
          onClick={() => setOpen((v) => !v)}
        >
          <i className={open ? "fas fa-xmark" : "fas fa-bars"} aria-hidden="true" />
          <span className="screen-reader-text">Przełącz nawigację</span>
        </button>

        <nav className={`navigation-area${open ? " open" : ""}`} aria-label="Nawigacja główna">
          <div className="mobile-nav-header mobile-only">
            <Link className="nav-branding mobile-branding" href="/">
              <Image
                className="nav-logo mobile-logo"
                src="/images/logo.png"
                alt={`${site.name} logo`}
                width={160}
                height={80}
              />
            </Link>
          </div>

          <ul className="nav-menu" id="primary-menu">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <Link className="btn-primary" href="/kontakt">
              kontakt
            </Link>
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
                <i className={iconClass[social.icon]} style={{ fontSize: "1.5rem" }} aria-hidden="true" />
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
              <i className={iconClass[social.icon]} style={{ fontSize: "1.5rem" }} aria-hidden="true" />
              <span className="screen-reader-text">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
