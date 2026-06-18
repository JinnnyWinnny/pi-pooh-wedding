import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DepartureScene from './components/DepartureScene';
import PawWalkScene from './components/PawWalkScene';
import ArrivalScene from './components/ArrivalScene';
import InvitationContent from './components/InvitationContent';
import PawTrail from './components/PawTrail';
import './App.css';

const PHASES = {
  INTRO: 'intro',
  WALK: 'walk',
  ARRIVAL: 'arrival',
  INVITATION: 'invitation',
};

export default function App() {
  const [phase, setPhase] = useState(PHASES.INTRO);

  const goToInvitation = () => {
    setPhase(PHASES.INVITATION);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {phase === PHASES.INTRO && (
          <motion.div key="intro" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <DepartureScene onDepart={() => setPhase(PHASES.WALK)} />
          </motion.div>
        )}

        {phase === PHASES.WALK && (
          <motion.div key="walk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PawWalkScene onArrive={() => setPhase(PHASES.ARRIVAL)} />
          </motion.div>
        )}

        {phase === PHASES.ARRIVAL && (
          <motion.div key="arrival" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ArrivalScene onContinue={goToInvitation} />
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
