import { useCallback, useEffect, useRef, useState } from "react";
import { fetchTreatCount, incrementTreatCount } from "../utils/treatCounter";

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

const BEST_FRIEND_GOAL = 15;

export default function DogTreat() {
  const [bones, setBones] = useState([]);
  const [treatCount, setTreatCount] = useState(null);
  const [isBestFriend, setIsBestFriend] = useState(false);
  const myTreatsRef = useRef(0);
  const timerRef = useRef(null);
  const busyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function sync() {
      try {
        const n = await fetchTreatCount();
        if (!cancelled) setTreatCount(n);
      } catch {
        if (!cancelled) setTreatCount((prev) => (prev == null ? 0 : prev));
      }
    }

    sync();
    const id = setInterval(sync, 12000);
    const onVisible = () => {
      if (document.visibilityState === "visible") sync();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const giveTreat = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;

    setTreatCount((n) => (n == null ? 1 : n + 1));
    myTreatsRef.current += 1;
    if (myTreatsRef.current >= BEST_FRIEND_GOAL) setIsBestFriend(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    setBones(makeBones());
    timerRef.current = setTimeout(() => {
      setBones([]);
      timerRef.current = null;
    }, 1300);

    try {
      const n = await incrementTreatCount();
      setTreatCount((prev) => Math.max(prev ?? 0, n));
    } catch {
      // keep optimistic count; next poll will reconcile
    } finally {
      // short lock so double-taps don't double-count
      setTimeout(() => {
        busyRef.current = false;
      }, 350);
    }
  }, []);

  const display = treatCount == null ? "…" : treatCount;

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

      <p className="dog-treat-count" aria-live="polite">
        얌얌 총 <b>{display}</b>개의 간식을 받았어요!
      </p>

      {isBestFriend && (
        <div className="treat-bestie" role="status" aria-live="assertive">
          <span className="treat-bestie-badge">🐶</span>
          <p className="treat-bestie-msg">
            간식을 <b>{BEST_FRIEND_GOAL}개</b>나 줬멍! 고마워 멍멍!
            <br />
            형아 누나한텐 <b>비밀</b>로 할 테니까
            <br />
            간식 더 줘요 멍멍!! 🐾
          </p>
        </div>
      )}
    </div>
  );
}
