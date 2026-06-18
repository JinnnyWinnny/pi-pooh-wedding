import { useCallback, useRef, useState } from "react";

function makeBones() {
  return Array.from({ length: 14 }, (_, i) => ({
    id: `${Date.now()}-${i}`,
    tx: `${(Math.random() - 0.5) * 380}px`,
    ty: `${-(Math.random() * 200 + 40)}px`,
    rot: `${Math.random() * 540 - 270}deg`,
    sc: 1.1 + Math.random() * 0.8,
    delay: `${Math.random() * 0.1}s`,
  }));
}

export default function DogTreat() {
  const [bones, setBones] = useState([]);
  const timerRef = useRef(null);

  const giveTreat = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setBones(makeBones());
    timerRef.current = setTimeout(() => {
      setBones([]);
      timerRef.current = null;
    }, 1300);
  }, []);

  return (
    <div className="dog-treat">
      <p className="dog-treat-msg">저희가 귀엽다면 아래 간식을 주세요!</p>

      <div className="dog-treat-btn-wrap">
        <div className="treat-bone-layer" aria-hidden={bones.length === 0}>
          {bones.map((bone) => (
            <span
              key={bone.id}
              className="treat-bone treat-bone--burst"
              style={{
                "--tx": bone.tx,
                "--ty": bone.ty,
                "--rot": bone.rot,
                "--sc": bone.sc,
                "--bd": bone.delay,
              }}
            >
              🦴
            </span>
          ))}
        </div>

        <button
          type="button"
          className="dog-treat-btn"
          onClick={giveTreat}
          aria-label="간식 주기"
        >
          🦴
        </button>
      </div>
    </div>
  );
}
