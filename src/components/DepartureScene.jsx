import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";
import { assetUrl } from "../utils/assetUrl";
import { IMessageChat, IMessageBubble } from "./IMessageChat";

export default function DepartureScene({ onDepart }) {
  const { couple, dogs } = weddingData;
  const piSrc = dogs.profiles.find((d) => d.name === "Pi")?.src;
  const poohSrc = dogs.profiles.find((d) => d.name === "Pooh")?.src;

  const speeches = [
    {
      from: "파이",
      side: "left",
      variant: "pi",
      text: "잠깐만요! 여기 좀 보세요!",
      avatar: piSrc,
    },
    {
      from: "푸",
      side: "right",
      variant: "pooh",
      text: `형 ${couple.groom.shortName}, 누나 ${couple.bride.shortName}이 드디어 결혼한대요!`,
      avatar: poohSrc,
    },
    {
      from: "파이",
      side: "left",
      variant: "pi",
      text: "우리가 안내해 드릴게요.",
      avatar: piSrc,
    },
    {
      from: "푸",
      side: "right",
      variant: "pooh",
      text: "저희 따라오세요 🐾",
      avatar: poohSrc,
    },
  ];

  return (
    <section className="scene intro">
      <motion.div
        className="intro-dogs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.img
          className="intro-family"
          src={assetUrl("dogs/pp_marriage.png")}
          alt="파이, 푸, 석준, 지은"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        />
      </motion.div>

      <IMessageChat
        title="파이 · 푸"
        subtitle="보더콜리 · 청첩장 안내견"
        avatars={[piSrc, poohSrc].filter(Boolean)}
        className="intro-imessage"
      >
        {speeches.map((s, i) => (
          <IMessageBubble
            key={i}
            side={s.side}
            variant={s.variant}
            avatar={s.avatar}
            avatarAlt={s.from}
            label={s.from}
            text={s.text}
            delay={0.35 + i * 0.45}
          />
        ))}
      </IMessageChat>

      <motion.button
        className="intro-btn"
        onClick={onDepart}
        whileTap={{ scale: 0.985 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <b>파이 · 푸 따라가기</b>
        <span className="tag">청첩장으로 →</span>
      </motion.button>
    </section>
  );
}
