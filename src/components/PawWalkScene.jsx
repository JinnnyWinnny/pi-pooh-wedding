import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  "이쪽이에요! 천천히 따라와 주세요",
  "발자국 보이시죠? 이대로 오시면 돼요",
  "조금만 더 가면 청첩장이에요!",
];

const PAWS = Array.from({ length: 8 }, (_, i) => i);

export default function PawWalkScene({ onArrive }) {
  const [step, setStep] = useState(0);
  const onArriveRef = useRef(onArrive);
  onArriveRef.current = onArrive;

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1400),
      setTimeout(() => setStep(2), 2800),
      setTimeout(() => onArriveRef.current(), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="scene paw-walk">
      <motion.p
        className="walk-kicker"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🐾 파이와 푸가 길을 안내하고 있어요
      </motion.p>

      <div className="walk-path">
        {PAWS.map((i) => (
          <motion.span
            key={i}
            className="walk-paw"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.35, duration: 0.35 }}
          >
            🐾
          </motion.span>
        ))}

        <motion.div
          className="walk-leaders"
          initial={{ left: "4%" }}
          animate={{ left: "78%" }}
          transition={{ duration: 3.8, ease: "easeInOut" }}
        >
          <img src="/dogs/pp.png" alt="파이와 푸" />
        </motion.div>
      </div>

      <div className="walk-msg-wrap">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            className="walk-msg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {STEPS[step]}
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.div
        className="walk-progress"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />
    </section>
  );
}
