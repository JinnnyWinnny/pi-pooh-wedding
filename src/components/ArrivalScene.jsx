import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

export default function ArrivalScene({ onContinue }) {
  const { couple, date, venue } = weddingData;
  const dateStr = `${date.year}년 ${date.month}월 ${date.day}일 (${date.weekday})`;

  return (
    <section className="scene arrival">
      <motion.div
        className="arrival-badge"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
      >
        🐾 도착했어요!
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {couple.groom.name}
        <span className="arrival-heart">♥</span>
        {couple.bride.name}
      </motion.h2>

      <motion.p
        className="sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        결혼식에 초대합니다
      </motion.p>

      <motion.div
        className="arrival-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        <p className="arrival-date">{dateStr}</p>
        <p className="arrival-time">{date.time}</p>
        <p className="arrival-place">
          {venue.name} · {venue.hall}
        </p>
      </motion.div>

      <motion.button
        className="scroll-cue"
        onClick={onContinue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <span>청첩장 보러 가기</span>
        <motion.span
          className="chev"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        >
          ↓
        </motion.span>
      </motion.button>
    </section>
  );
}
