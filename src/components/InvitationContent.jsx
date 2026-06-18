import { useState } from "react";
import { weddingData } from "../data/weddingData";
import ScrollReveal from "./ScrollReveal";
import CountdownCalendar from "./CountdownCalendar";
import AboutUs from "./AboutUs";

function copyText(text) {
  navigator.clipboard?.writeText(text);
}

function ParentsLine({ father, mother, relation }) {
  return (
    <div className="parents">
      <span className="parents-names">
        {father} · {mother}
      </span>
      <span className="parents-relation">의 {relation}</span>
    </div>
  );
}

export default function InvitationContent() {
  const [idx, setIdx] = useState(0);
  const { couple, date, venue, message, gallery, accounts, dogs } = weddingData;
  const dateStr = `${date.year}. ${String(date.month).padStart(2, "0")}. ${String(date.day).padStart(2, "0")} (${date.weekday})`;

  const prev = () => setIdx((i) => (i === 0 ? gallery.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === gallery.length - 1 ? 0 : i + 1));

  return (
    <main className="invitation">
      <section className="sec inv-hero" id="start">
        <ScrollReveal preset="fade">
          <p className="kicker" style={{ color: "var(--accent)" }}>
            🐾 Follow PI &amp; Pooh
          </p>
        </ScrollReveal>

        <ScrollReveal preset="scale" delay={0.08}>
          <div className="names">
            {couple.groom.name}
            <span className="amp">and</span>
            {couple.bride.name}
          </div>
        </ScrollReveal>

        <ScrollReveal preset="up" delay={0.2}>
          <p className="when">
            {dateStr} · {date.time}
          </p>
          <p className="where">
            {venue.name} {venue.hall}
          </p>
        </ScrollReveal>
      </section>

      <section className="sec">
        <ScrollReveal>
          <p className="sec-no">01 — Greeting</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="message-body">{message}</p>
        </ScrollReveal>
      </section>

      <section className="sec">
        <ScrollReveal>
          <p className="sec-no">02 — Save the Date</p>
        </ScrollReveal>
        <CountdownCalendar
          date={date}
          groomShort={couple.groom.shortName}
          brideShort={couple.bride.shortName}
        />
      </section>

      <section className="sec">
        <ScrollReveal>
          <p className="sec-no">03 — Bride &amp; Groom</p>
        </ScrollReveal>
        <div className="bento">
          <div className="cell">
            <ScrollReveal preset="left">
              <p className="role">Groom</p>
              <p className="nm">{couple.groom.name}</p>
              <ParentsLine
                father={couple.groom.father}
                mother={couple.groom.mother}
                relation={couple.groom.relation}
              />
            </ScrollReveal>
          </div>
          <div className="cell">
            <ScrollReveal preset="right">
              <p className="role">Bride</p>
              <p className="nm">{couple.bride.name}</p>
              <ParentsLine
                father={couple.bride.father}
                mother={couple.bride.mother}
                relation={couple.bride.relation}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="sec sec-about">
        <ScrollReveal>
          <p className="sec-no">04 — About Us</p>
        </ScrollReveal>
        <AboutUs groom={couple.groom} bride={couple.bride} dogs={dogs} />
      </section>

      <section className="sec">
        <ScrollReveal>
          <p className="sec-no">05 — Gallery</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="carousel">
            <div className="frame">
              <img src={gallery[idx].src} alt={gallery[idx].caption} />
              <div className="cap">
                <span>{gallery[idx].caption}</span>
                <span>
                  {String(idx + 1).padStart(2, "0")} /{" "}
                  {String(gallery.length).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div className="car-nav">
              <button type="button" onClick={prev} aria-label="이전 사진">
                ‹
              </button>
              <button type="button" onClick={next} aria-label="다음 사진">
                ›
              </button>
            </div>
          </div>
          <div className="car-dots">
            {gallery.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === idx ? "on" : ""}
                onClick={() => setIdx(i)}
                aria-label={`사진 ${i + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="sec">
        <ScrollReveal>
          <p className="sec-no">06 — Location</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="venue">
            <p className="vn">{venue.name}</p>
            <p className="vh">{venue.hall}</p>
            <p className="va">{venue.address}</p>
            <p className="vt">T. {venue.tel}</p>
          </div>
          <div className="map-box">
            <span>MAP</span>
            <span>카카오 / 네이버 지도 연결 영역</span>
          </div>
          <div className="map-links">
            <a href={venue.mapUrl} target="_blank" rel="noreferrer">
              카카오맵
            </a>
            <a href={venue.naverMapUrl} target="_blank" rel="noreferrer">
              네이버지도
            </a>
          </div>
        </ScrollReveal>
      </section>

      <section className="sec">
        <ScrollReveal>
          <p className="sec-no">07 — With Heart</p>
        </ScrollReveal>
        {accounts.map((acc, i) => (
          <ScrollReveal key={acc.label} delay={0.08 * i}>
            <div className="acct">
              <div>
                <p className="lab">
                  {acc.label} · {acc.bank}
                </p>
                <p className="num">{acc.number}</p>
                <p className="hd">{acc.holder}</p>
              </div>
              <button type="button" onClick={() => copyText(acc.number)}>
                복사
              </button>
            </div>
          </ScrollReveal>
        ))}
      </section>

      <section className="sec closing">
        <ScrollReveal preset="scale">
          <div className="paws">🐾 🐾 🐾</div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p>
            소중한 분들과 함께하는 날,
            <br />
            기다리고 있겠습니다.
          </p>
          <p className="sign">
            {couple.groom.name} · {couple.bride.name} · {dogs.names}
          </p>
        </ScrollReveal>
      </section>
    </main>
  );
}
