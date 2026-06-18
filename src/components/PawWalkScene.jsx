import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assetUrl } from "../utils/assetUrl";

const STEPS = [
  "이쪽이에요! 천천히 따라와 주세요",
  "발자국 보이시죠? 이대로 오시면 돼요",
  "조금만 더 가면 청첩장이에요!",
];

const PAW_PATH = [
  { left: "4%", top: "72%", rotate: -28 },
  { left: "14%", top: "48%", rotate: 16 },
  { left: "26%", top: "66%", rotate: -22 },
  { left: "38%", top: "38%", rotate: 20 },
  { left: "50%", top: "58%", rotate: -18 },
  { left: "62%", top: "34%", rotate: 24 },
  { left: "74%", top: "52%", rotate: -14 },
  { left: "86%", top: "28%", rotate: 18 },
];

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
        {PAW_PATH.map((paw, i) => (
          <motion.span
            key={i}
            className="walk-paw"
            style={{ left: paw.left, top: paw.top }}
            initial={{ opacity: 0, scale: 0.4, rotate: paw.rotate }}
            animate={{ opacity: 1, scale: 1, rotate: paw.rotate }}
            transition={{ delay: 0.2 + i * 0.35, duration: 0.35 }}
          >
            🐾
          </motion.span>
        ))}

        <motion.div
          className="walk-leaders"
          initial={{ left: "2%", top: "72%" }}
          animate={{
            left: ["2%", "38%", "86%"],
            top: ["72%", "38%", "28%"],
          }}
          transition={{ duration: 3.8, ease: "easeInOut" }}
        >
          <img src={assetUrl("dogs/pp.png")} alt="파이와 푸" />
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
