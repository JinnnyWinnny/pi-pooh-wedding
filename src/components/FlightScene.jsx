import { motion } from 'framer-motion';

const PATH = 'M 50 240 Q 170 40 290 90';

const nodes = [
  { x: 50, y: 240, nm: 'San Diego', cd: 'SAN' },
  { x: 170, y: 103, nm: 'Pacific Ocean', cd: 'PAC' },
  { x: 290, y: 90, nm: 'Seoul', cd: 'SEL' },
];

export default function FlightScene({ onArrive }) {
  return (
    <section className="scene flight">
      <div className="stars" />

      <div className="flight-stage">
        <svg viewBox="0 0 340 300" fill="none">
          <motion.path
            d={PATH}
            stroke="rgba(243,239,230,0.55)"
            strokeWidth="1.6"
            strokeDasharray="5 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3.6, ease: 'easeInOut' }}
          />
        </svg>

        {nodes.map((n, i) => (
          <motion.div
            key={n.cd}
            className="flight-node"
            style={{ left: n.x, top: n.y }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 1.5, duration: 0.5 }}
          >
            <div className="dot" />
            <div className="nm">{n.nm}</div>
            <div className="cd">{n.cd}</div>
          </motion.div>
        ))}

        <motion.div
          className="flight-plane"
          style={{ offsetPath: `path('${PATH}')` }}
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 3.8, ease: 'easeInOut' }}
          onAnimationComplete={onArrive}
        >
          ✈️
        </motion.div>
      </div>

      <motion.div
        className="flight-readout"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span>ALT<b>38,000 ft</b></span>
        <span>SPD<b>904 km/h</b></span>
        <span>STATUS<b>IN FLIGHT</b></span>
      </motion.div>
    </section>
  );
}
