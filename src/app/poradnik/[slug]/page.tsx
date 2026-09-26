import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { newsPosts } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Rudzka Akademia Rowerowa`,
    description: post.excerpt,
  };
}

export default async function PoradnikPostPage({ params }: Props) {
  const { slug } = await params;
  const post = newsPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="single-post container-primary">
      {post.image ? (
        <div className="single-post-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt={post.title} />
        </div>
      ) : null}

      <header className="single-post-header">
        <h1>{post.title}</h1>
        <p className="post-details">
          {post.displayDate} • {post.author}
        </p>
      </header>

      <div
        className="single-post-content"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <div className="button-container single-post-button">
        <Link href="/" className="btn btn-secondary">
          Powrót do strony głównej
        </Link>
      </div>
    </section>
  );
}
