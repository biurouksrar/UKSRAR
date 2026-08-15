import { testimonials } from "@/lib/content";

export default function TestimonialsSection() {
  return (
    <div className="testimonial-area">
      {testimonials.map((t) => (
        <div className="testimonial-card" key={t.id}>
          <p>&ldquo;{t.text}&rdquo;</p>
          <h3>{t.name}</h3>
        </div>
      ))}
    </div>
  );
}
