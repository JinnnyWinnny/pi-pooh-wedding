import { useId, useState } from "react";
import { assetUrl } from "../utils/assetUrl";
import ScrollReveal from "./ScrollReveal";

export default function DogInterview({ interview, dogs, couple }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const dogMap = Object.fromEntries(dogs.profiles.map((d) => [d.name, d]));

  return (
    <div className="dog-interview">
      <ScrollReveal>
        <p className="interview-intro">
          오늘의 인터뷰어는 <b>파이</b>와 <b>푸</b>입니다 🎤
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.06}>
        <button
          type="button"
          className={`interview-cover${open ? " is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
        >
          <img
            src={assetUrl("dogs/pp_marriage.png")}
            alt="파이와 푸"
            className="interview-cover-img"
          />
          <span className="interview-cover-cta">
            <span className="interview-cover-label">
              {open ? "인터뷰 접기" : "인터뷰 펼치기"}
            </span>
            <span className={`interview-chevron${open ? " is-open" : ""}`}>
              ↓
            </span>
          </span>
        </button>
      </ScrollReveal>

      <div
        id={panelId}
        className={`interview-panel${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="interview-panel-inner">
          {interview.map((item, i) => {
            const dog = dogMap[item.interviewer];
            if (!dog) return null;

            return (
              <article
                key={i}
                className={`interview-item ${dog.name.toLowerCase()}`}
              >
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
