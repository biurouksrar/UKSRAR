import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-primary">
      <h1>Nie znaleziono strony</h1>
      <p>Sprawdź adres lub wróć do strony głównej.</p>
      <div className="button-container">
        <Link href="/" className="btn btn-secondary">
          Strona główna
        </Link>
      </div>
    </section>
  );
}
