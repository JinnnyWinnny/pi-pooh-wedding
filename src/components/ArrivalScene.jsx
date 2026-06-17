import { motion } from 'framer-motion';

export default function ArrivalScene({ onContinue }) {
  return (
    <section className="scene arrival">
      <motion.div
        className="stamp"
        initial={{ scale: 1.6, opacity: 0, rotate: -24 }}
        animate={{ scale: 1, opacity: 1, rotate: -9 }}
        transition={{ type: 'spring', stiffness: 220, damping: 12 }}
      >
        Arrived · ICN
        <small>Incheon, Seoul</small>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        드디어 <em>도착</em>했어요!
      </motion.h2>

      <motion.p
        className="sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        이제 파이와 푸를 따라 내려가 주세요 🐾
      </motion.p>

      <motion.button
        className="scroll-cue"
        onClick={onContinue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span>청첩장 시작</span>
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
