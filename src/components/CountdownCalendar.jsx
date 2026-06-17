import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function getFirstWeekday(year, month) {
  return new Date(year, month - 1, 1).getDay();
}

function useCountdown(targetDate) {
  const [left, setLeft] = useState(() => calcLeft(targetDate));

  useEffect(() => {
    const tick = () => setLeft(calcLeft(targetDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return left;
}

function calcLeft(targetDate) {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: false };
}

export default function CountdownCalendar({ date, groomShort, brideShort }) {
  const target = new Date(date.year, date.month - 1, date.day, date.hour, date.minute, 0);
  const left = useCountdown(target);

  const daysInMonth = getDaysInMonth(date.year, date.month);
  const firstDay = getFirstWeekday(date.year, date.month);
  const blanks = Array.from({ length: firstDay });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const monthLabel = `${date.year}년 ${date.month}월`;

  return (
    <div className="save-date">
      <ScrollReveal preset="scale">
        <div className="save-date-hero">
          <span className="save-month">{String(date.month).padStart(2, "0")}</span>
          <span className="save-slash">/</span>
          <span className="save-day">{String(date.day).padStart(2, "0")}</span>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="save-sub">
          {date.year}. {String(date.month).padStart(2, "0")}. {String(date.day).padStart(2, "0")}{" "}
          ({date.weekday}) · {date.time}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="calendar">
          <div className="cal-head">
            <span className="cal-month">{monthLabel}</span>
            <span className="cal-lunar">{date.lunar}</span>
          </div>
          <div className="cal-weekdays">
            {WEEKDAYS.map((d) => (
              <span key={d} className={d === "일" ? "sun" : d === "토" ? "sat" : ""}>
                {d}
              </span>
            ))}
          </div>
          <div className="cal-grid">
            {blanks.map((_, i) => (
              <span key={`b-${i}`} className="cal-cell empty" />
            ))}
            {days.map((d) => (
              <span
                key={d}
                className={`cal-cell${d === date.day ? " wedding-day" : ""}${d === date.day ? " pulse" : ""}`}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="countdown">
          {left.done ? (
            <p className="countdown-msg done">
              오늘은 <b>{groomShort}</b> · <b>{brideShort}</b>의 결혼식 날입니다
            </p>
          ) : (
            <>
              <p className="countdown-msg">
                <b>{groomShort}</b> · <b>{brideShort}</b> 결혼식이
              </p>
              <div className="countdown-units">
                <div className="count-unit">
                  <span className="count-num">{left.days}</span>
                  <span className="count-label">일</span>
                </div>
                <div className="count-unit">
                  <span className="count-num">{String(left.hours).padStart(2, "0")}</span>
                  <span className="count-label">시간</span>
                </div>
                <div className="count-unit">
                  <span className="count-num">{String(left.minutes).padStart(2, "0")}</span>
                  <span className="count-label">분</span>
                </div>
                <div className="count-unit">
                  <span className="count-num">{String(left.seconds).padStart(2, "0")}</span>
                  <span className="count-label">초</span>
                </div>
              </div>
              <p className="countdown-tail">남았습니다</p>
            </>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
