import ScrollReveal from "./ScrollReveal";

export default function AboutUs({ groom, bride, dogs }) {
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

      <ScrollReveal preset="up" delay={0.24}>
        <article className="about-card about-dogs-card">
          <div className="about-body about-dogs-head">
            <p className="about-role">🐾 Our Guide Dogs</p>
            <h3 className="about-name">{dogs.namesKo}</h3>
            <p className="about-bio">{dogs.breed} · {dogs.tagline}</p>
          </div>
          <div className="dog-avatars">
            {dogs.profiles.map((d) => (
              <figure key={d.name} className="dog-avatar">
                <img src={d.src} alt={`${d.name} (${d.nameKo})`} />
                <figcaption>
                  <b>{d.name}</b>
                  <span>
                    {d.nameKo} · {d.desc}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </article>
      </ScrollReveal>
    </div>
  );
}
