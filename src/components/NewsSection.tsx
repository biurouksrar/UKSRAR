"use client";

import { useState } from "react";
import Link from "next/link";
import { newsPosts } from "@/lib/content";

export default function NewsSection() {
  const [showAll, setShowAll] = useState(false);
  const visiblePosts = showAll ? newsPosts : newsPosts.slice(0, 2);
  const showButton = newsPosts.length > 2 && !showAll;

  return (
    <section id="news" className="news container-secondary">
      <h2>Aktualności</h2>
      <div className="news-container">
        {visiblePosts.length === 0 ? (
          <p>Brak aktualności do wyświetlenia.</p>
        ) : (
          visiblePosts.map((post) => (
            <article className="news-card" key={post.slug}>
              <Link className="news-card-link" href={`/aktualnosci/${post.slug}`}>
                <div
                  className="news-card-image"
                  style={{ background: `url(${post.image}) no-repeat center center/cover` }}
                  role="img"
                  aria-label={`${post.title} - artykuł wiadomości`}
                />
                <div className="news-card-content">
                  <div className="news-card-details">
                    {post.displayDate} • {post.author}
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
              </Link>
            </article>
          ))
        )}
      </div>
      {showButton && (
        <div className="button-container">
          <button type="button" className="btn btn-secondary nb" onClick={() => setShowAll(true)}>
            Więcej
          </button>
        </div>
      )}
    </section>
  );
}
