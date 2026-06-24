import { useId, useState } from "react";
import { assetUrl } from "../utils/assetUrl";
import ScrollReveal from "./ScrollReveal";
import { IMessageChat, IMessageBubble } from "./IMessageChat";

export default function DogInterview({ interview, dogs, couple }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const dogMap = Object.fromEntries(dogs.profiles.map((d) => [d.name, d]));
  const avatars = dogs.profiles.map((d) => d.src);

  return (
    <div className="dog-interview">
      <ScrollReveal>
        <p className="interview-intro">
          오늘의 인터뷰어는 <b>파이</b>와 <b>푸</b>입니다 🎤
        </p>
      </ScrollReveal>

      {!open && (
        <ScrollReveal delay={0.06}>
          <div className="interview-preview">
            <img
              src={assetUrl("dogs/pp_marriage.png")}
              alt="파이와 푸"
              className="interview-preview-img"
            />
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.08}>
        <button
          type="button"
          className={`interview-toggle${open ? " is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
        >
          <span className="interview-toggle-label">
            {open ? "인터뷰 접기" : "인터뷰 펼치기"}
          </span>
          <span className={`interview-chevron${open ? " is-open" : ""}`}>↓</span>
        </button>
      </ScrollReveal>

      <div
        id={panelId}
        className={`interview-panel${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="interview-panel-inner">
          <IMessageChat
            title="파이 · 푸"
            subtitle="Pi & Pooh Interview"
            avatars={avatars}
            className="interview-imessage"
          >
            {interview.map((item, i) => {
              const dog = dogMap[item.interviewer];
              if (!dog) return null;

              const baseDelay = i * 0.04;

              return (
                <div key={i} className="imessage-thread">
                  <IMessageBubble
                    side="left"
                    avatar={dog.src}
                    avatarAlt={dog.nameKo}
                    label={dog.nameKo}
                    text={item.question}
                    delay={baseDelay}
                  />
                  <IMessageBubble
                    side="right"
                    label={`🤵 신랑 ${couple.groom.name}`}
                    text={item.groomAnswer}
                    delay={baseDelay + 0.02}
                  />
                  <IMessageBubble
                    side="right"
                    variant="bride"
                    label={`👰 신부 ${couple.bride.name}`}
                    text={item.brideAnswer}
                    delay={baseDelay + 0.04}
                  />
                </div>
              );
            })}
          </IMessageChat>
        </div>
      </div>
    </div>
  );
}
