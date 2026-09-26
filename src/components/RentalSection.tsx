"use client";

import { useEffect, useState } from "react";
import TrailerReservation from "@/components/TrailerReservation";
import { contact } from "@/lib/content";
import type { RentalResource } from "@/lib/trailer";

type RentalItem = {
  id: string;
  resource: RentalResource;
  title: string;
  description: string;
};

const rentalItems: RentalItem[] = [
  {
    id: "przyczepa",
    resource: "trailer",
    title: "Przyczepa rowerowa",
    description:
      "Potrzebujesz przyczepy rowerowej? Możesz ją od nas wypożyczyć. Sprawdź dostępność w kalendarzu i złóż rezerwację.",
  },
  {
    id: "deski-sup",
    resource: "sup",
    title: "Deski SUP",
    description:
      "Chcesz wypożyczyć deski SUP? Sprawdź wolne terminy w kalendarzu i zarezerwuj wypożyczenie online.",
  },
];

function itemIdFromHash(hash: string) {
  const id = hash.replace(/^#/, "");
  return rentalItems.some((item) => item.id === id) ? id : null;
}

export default function RentalSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    function syncFromHash() {
      const id = itemIdFromHash(window.location.hash);
      if (id) setOpenId(id);
    }

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section id="wypozyczalnia" className="trailer-section">
      <div className="rental-section-header">
        <h2>Wypożyczalnia</h2>
        <p>
          Sprawdź dostępność w kalendarzu i zarezerwuj termin. Masz pytania? Napisz lub zadzwoń —
          pomożemy.
        </p>
      </div>

      <div className="rental-accordion">
        {rentalItems.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `${item.id}-panel`;
          const triggerId = `${item.id}-trigger`;

          return (
            <div
              key={item.id}
              id={item.id}
              className={`rental-accordion-item${isOpen ? " is-open" : ""}`}
            >
              <button
                type="button"
                id={triggerId}
                className="rental-accordion-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span className="rental-accordion-title">{item.title}</span>
                <span className="rental-accordion-chevron" aria-hidden="true" />
              </button>

              {isOpen ? (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="rental-accordion-panel"
                >
                  <div className="trailer-split rental-subsection">
                    <div className="trailer-split-info">
                      <p>{item.description}</p>
                      <div className="button-container trailer-actions">
                        <a href={contact.phoneHref} className="btn btn-primary">
                          Zadzwoń
                        </a>
                        <a href="/#contact-form" className="btn btn-secondary">
                          Wyślij wiadomość
                        </a>
                      </div>
                    </div>
                    <div className="trailer-split-calendar">
                      <TrailerReservation resource={item.resource} />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
