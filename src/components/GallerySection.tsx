"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { galleryImages } from "@/lib/content";

export default function GallerySection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function scrollByDir(dir: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.max(track.clientWidth * 0.8, 280);
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((i) => (i === null ? null : (i + 1) % galleryImages.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((i) =>
          i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  const active = activeIndex !== null ? galleryImages[activeIndex] : null;

  return (
    <section id="galeria" className="gallery container-primary">
      <h2>Galeria</h2>
      <p className="gallery-lead">Chwile z treningów, wycieczek i wspólnych wyjazdów.</p>

      <div className="gallery-slider">
        <button
          type="button"
          className="gallery-slider-nav gallery-slider-prev"
          aria-label="Poprzednie zdjęcia"
          onClick={() => scrollByDir(-1)}
        >
          <i className="fas fa-chevron-left" aria-hidden="true" />
        </button>

        <div className="gallery-track" ref={trackRef}>
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className="gallery-item"
              onClick={() => setActiveIndex(index)}
              aria-label={`Powiększ: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 80vw, 320px"
                className="gallery-image"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="gallery-slider-nav gallery-slider-next"
          aria-label="Następne zdjęcia"
          onClick={() => scrollByDir(1)}
        >
          <i className="fas fa-chevron-right" aria-hidden="true" />
        </button>
      </div>

      {active && activeIndex !== null ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            aria-label="Zamknij"
            onClick={() => setActiveIndex(null)}
          >
            <i className="fas fa-xmark" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-prev"
            aria-label="Poprzednie zdjęcie"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) =>
                i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length,
              );
            }}
          >
            <i className="fas fa-chevron-left" aria-hidden="true" />
          </button>
          <div className="gallery-lightbox-frame" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.src} alt={active.alt} />
          </div>
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-next"
            aria-label="Następne zdjęcie"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => (i === null ? null : (i + 1) % galleryImages.length));
            }}
          >
            <i className="fas fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
