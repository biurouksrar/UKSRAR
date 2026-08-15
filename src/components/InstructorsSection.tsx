import { instructors } from "@/lib/content";

export default function InstructorsSection() {
  return (
    <div className="container">
      {instructors.map((instructor) => (
        <div className="image-container instructor-card" key={instructor.id}>
          <div className="instructor-card-inner instructor">
            <div
              className="instructor_front"
              style={{
                background: `url(${instructor.photo}) no-repeat center center/cover`,
              }}
              role="img"
              aria-label={`${instructor.name} - członek zespołu`}
            >
              <h3>
                <i className="fa-solid fa-hand-pointer" style={{ fontSize: "3rem" }} />
                <br /> Kliknij po więcej!
              </h3>
            </div>
            <div className="instructor_back">
              <h3>{instructor.name}</h3>
              <p>{instructor.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
