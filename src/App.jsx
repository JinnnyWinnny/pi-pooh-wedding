import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DepartureScene from "./components/DepartureScene";
import PawWalkScene from "./components/PawWalkScene";
import InvitationContent from "./components/InvitationContent";
import PawTrail from "./components/PawTrail";
import BgmToggle from "./components/BgmToggle";
import "./App.css";

const PHASES = {
  INTRO: "intro",
  WALK: "walk",
  INVITATION: "invitation",
};

function resetScroll() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.querySelector(".phase-intro")?.scrollTo(0, 0);
}

export default function App() {
  const [phase, setPhase] = useState(PHASES.INTRO);
  const [bgmStartToken, setBgmStartToken] = useState(0);

  useLayoutEffect(() => {
    resetScroll();
  }, [phase]);

  const startJourney = () => {
    setBgmStartToken((n) => n + 1);
    setPhase(PHASES.WALK);
  };

  return (
    <div className={`app${phase === PHASES.INTRO ? " is-intro" : ""}`}>
      <BgmToggle autoStartToken={bgmStartToken} />

      <AnimatePresence mode="wait">
        {phase === PHASES.INTRO && (
          <motion.div
            key="intro"
            className="phase-intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <DepartureScene onDepart={startJourney} />
          </motion.div>
        )}

        {phase === PHASES.WALK && (
          <motion.div
            key="walk"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PawWalkScene onArrive={() => setPhase(PHASES.INVITATION)} />
          </motion.div>
        )}
      </AnimatePresence>

      {phase === PHASES.INVITATION && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <PawTrail />
          <InvitationContent />
        </motion.div>
      )}
    </div>
  );
}
