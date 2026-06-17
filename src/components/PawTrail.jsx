import { useEffect, useState } from 'react';

function Paw() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <ellipse cx="32" cy="44" rx="15" ry="13" />
      <ellipse cx="14" cy="28" rx="6" ry="8" />
      <ellipse cx="26" cy="18" rx="6" ry="8" />
      <ellipse cx="38" cy="18" rx="6" ry="8" />
      <ellipse cx="50" cy="28" rx="6" ry="8" />
    </svg>
  );
}

export default function PawTrail() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setCount(Math.min(26, Math.floor(window.scrollY / 130)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="paw-trail" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="paw-print"
          style={{
            top: 460 + i * 125,
            left: i % 2 === 0 ? '8%' : '88%',
            transform: `rotate(${i % 2 === 0 ? -20 : 20}deg)`,
            opacity: 0.12 + (i % 3) * 0.04,
          }}
        >
          <Paw />
        </span>
      ))}
    </div>
  );
}
