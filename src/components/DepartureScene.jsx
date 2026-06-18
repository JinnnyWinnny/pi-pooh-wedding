import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

function SpeechBubble({ from, text, delay }) {
  return (
    <motion.div
      className={`speech-bubble${from === "파이" ? " pi" : " pooh"}`}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="speech-from">{from}</span>
      <p>{text}</p>
    </motion.div>
  );
}

export default function DepartureScene({ onDepart }) {
  const { couple } = weddingData;

  const speeches = [
    { from: "파이", text: "잠깐만요! 여기 좀 보세요!" },
    {
      from: "푸",
      text: `형 ${couple.groom.shortName}, 누나 ${couple.bride.shortName}이 드디어 결혼한대요!`,
    },
    { from: "파이", text: "우리가 안내해 드릴게요." },
    { from: "푸", text: "저희 따라오세요 🐾" },
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
          src="/dogs/pp_marriage.png"
          alt="파이, 푸, 석준, 지은"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        />
      </motion.div>

      <div className="speech-list">
        {speeches.map((s, i) => (
          <SpeechBubble
            key={i}
            from={s.from}
            text={s.text}
            delay={0.35 + i * 0.45}
          />
        ))}
      </div>

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
