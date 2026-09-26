import Link from "next/link";
import { newsPosts } from "@/lib/content";

type NewsSectionProps = {
  title?: string;
  className?: string;
};

export default function NewsSection({
  title = "Poradnik rowerowy",
  className = "container-primary",
}: NewsSectionProps) {
  return (
    <section id="news" className={`news ${className}`}>
      <h2>{title}</h2>
      {newsPosts.length === 0 ? (
        <p>Brak wpisów do wyświetlenia.</p>
      ) : (
        <ul className="news-list">
          {newsPosts.map((post) => (
            <li key={post.slug}>
              <Link className="news-list-item" href={`/poradnik/${post.slug}`}>
                <span className="news-list-meta">
                  {post.displayDate} • {post.author}
                </span>
                <span className="news-list-title">{post.title}</span>
                <span className="news-list-more">Czytaj</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
