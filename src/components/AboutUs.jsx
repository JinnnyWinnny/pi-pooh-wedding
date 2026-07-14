import ScrollReveal from "./ScrollReveal";
import DogTreat from "./DogTreat";

export default function AboutUs({ groom, bride, dogs, aboutUs }) {
  const sees = aboutUs?.sees ?? [];

  return (
    <div className="about-us">
      <ScrollReveal preset="fade">
        <figure className="about-couple">
          <img
            src={aboutUs.photo}
            alt={`${groom.name}와 ${bride.name}`}
            className="about-couple-photo"
          />
          <figcaption className="about-couple-caption">
            <p className="about-couple-label">Together</p>
            <h3 className="about-couple-names">
              {groom.name}
              <span className="about-couple-amp">&</span>
              {bride.name}
            </h3>
          </figcaption>
        </figure>
      </ScrollReveal>

      {sees.length > 0 && (
        <div className="about-sees">
          <ScrollReveal delay={0.08}>
            <p className="about-sees-label">서로를 말하는 한 줄</p>
          </ScrollReveal>
          {sees.map((item, i) => (
            <ScrollReveal
              key={`${item.from}-${item.of}`}
              delay={0.12 + i * 0.1}
            >
              <blockquote className="about-see">
                <p className="about-see-who">
                  <b>{item.from}</b>이 보는 <b>{item.of}</b>
                </p>
                <p className="about-see-line">“{item.line}”</p>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      )}

      <ScrollReveal preset="up" delay={0.22}>
        <article className="about-dogs">
          <div className="about-dogs-head">
            <p className="about-dogs-label">🐾 Our Dogs</p>
            <h3 className="about-dogs-names">{dogs.namesKo}</h3>
            <p className="about-dogs-bio">
              {dogs.breed} · {dogs.tagline}
            </p>
          </div>
          <div className="dog-avatars">
            {dogs.profiles.map((d) => (
              <figure key={d.name} className="dog-avatar">
                <img src={d.src} alt={`${d.name} (${d.nameKo})`} />
                <figcaption>
                  <b>{d.name}</b>
                  <span>
                    {d.nameKo} : {d.desc}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <DogTreat />
        </article>
      </ScrollReveal>
    </div>
  );
}
