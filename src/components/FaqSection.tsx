"use client";

import { useState } from "react";
import { faq } from "@/lib/content";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <div className="faq-panel">
      <header className="faq-header">
        <h2>Najczęściej zadawane pytania</h2>
        <p>Odpowiedzi na pytania o obozy, wycieczki i wypożyczenie przyczepy</p>
      </header>

      <div className="faq-list">
        {faq.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              className={`faq-item${isOpen ? " is-open" : ""}`}
              key={item.question}
            >
              <button
                type="button"
                className="faq-trigger"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                onClick={() => toggle(index)}
              >
                <span>{item.question}</span>
                <span className="faq-chevron" aria-hidden="true" />
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className="faq-answer"
                hidden={!isOpen}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
