import ScrollReveal from "./ScrollReveal";

export default function AboutUs({ groom, bride }) {
  const people = [
    { role: "Groom", person: groom, preset: "left" },
    { role: "Bride", person: bride, preset: "right" },
  ];

  return (
    <div className="about-grid">
      {people.map(({ role, person, preset }, i) => (
        <ScrollReveal key={role} preset={preset} delay={i * 0.12}>
          <article className="about-card">
            <div className="about-photo">
              <img src={person.photo} alt={person.name} />
            </div>
            <div className="about-body">
              <p className="about-role">{role}</p>
              <h3 className="about-name">{person.name}</h3>
              <p className="about-bio">{person.bio}</p>
            </div>
          </article>
        </ScrollReveal>
      ))}
    </div>
  );
}
