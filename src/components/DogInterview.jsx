import ScrollReveal from "./ScrollReveal";

export default function DogInterview({ interview, dogs, couple }) {
  const dogMap = Object.fromEntries(dogs.profiles.map((d) => [d.name, d]));

  return (
    <div className="dog-interview">
      <ScrollReveal>
        <p className="interview-intro">
          오늘의 인터뷰어는 <b>파이</b>와 <b>푸</b>입니다 🎤
        </p>
      </ScrollReveal>

      {interview.map((item, i) => {
        const dog = dogMap[item.interviewer];
        if (!dog) return null;

        return (
          <ScrollReveal key={i} delay={0.06 * i}>
            <article className={`interview-item ${dog.name.toLowerCase()}`}>
              <div className="interview-q">
                <img
                  src={dog.src}
                  alt={dog.nameKo}
                  className="interview-avatar"
                />
                <div className="interview-bubble q">
                  <span className="interview-label">{dog.nameKo}의 질문</span>
                  <p>{item.question}</p>
                </div>
              </div>

              <div className="interview-answers">
                <div className="interview-a groom">
                  <div className="interview-bubble a">
                    <span className="interview-label">
                      🤵 신랑 {couple.groom.name}
                    </span>
                    <p>{item.groomAnswer}</p>
                  </div>
                </div>
                <div className="interview-a bride">
                  <div className="interview-bubble a">
                    <span className="interview-label">
                      👰 신부 {couple.bride.name}
                    </span>
                    <p>{item.brideAnswer}</p>
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
