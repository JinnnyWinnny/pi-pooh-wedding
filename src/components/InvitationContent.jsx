import { useEffect, useState } from "react";
import { weddingData } from "../data/weddingData";
import { assetUrl } from "../utils/assetUrl";
import ScrollReveal from "./ScrollReveal";
import CountdownCalendar from "./CountdownCalendar";
import AboutUs from "./AboutUs";
import GalleryGrid from "./GalleryGrid";
import DogInterview from "./DogInterview";
import AccountSection from "./AccountSection";

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
  const { couple, date, venue, message, gallery, accounts, dogs, heroImage, interview, aboutUs } =
    weddingData;
  const dateStr = `${date.year}. ${String(date.month).padStart(2, "0")}. ${String(date.day).padStart(2, "0")} (${date.weekday})`;
  const [heroHeight, setHeroHeight] = useState(null);

  useEffect(() => {
    // Lock once so mobile URL-bar show/hide doesn't resize the hero
    setHeroHeight(`${window.innerHeight}px`);
  }, []);

  return (
    <main className="invitation">
      <section
        className="sec inv-hero"
        id="start"
        style={{
          "--hero-bg": `url(${heroImage})`,
          ...(heroHeight ? { "--hero-height": heroHeight } : {}),
        }}
      >
        <div className="hero-bg">
          <div className="hero-content">
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
          </div>
        </div>
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
          venue={venue}
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
        <AboutUs groom={couple.groom} bride={couple.bride} dogs={dogs} aboutUs={aboutUs} />
      </section>

      <section className="sec">
        <ScrollReveal>
          <p className="sec-no">05 — Gallery</p>
        </ScrollReveal>
        <GalleryGrid items={gallery} />
      </section>

      <section className="sec">
        <ScrollReveal>
          <p className="sec-no">06 — Pi &amp; Pooh Interview</p>
        </ScrollReveal>
        <DogInterview interview={interview} dogs={dogs} couple={couple} />
      </section>

      <section className="sec">
        <ScrollReveal>
          <p className="sec-no">07 — Location</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="venue">
            <p className="vn">{venue.name}</p>
            <p className="vh">{venue.hall}</p>
            <p className="va">{venue.address}</p>
          </div>
          <a
            className="map-box"
            href={venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${venue.name} 카카오맵으로 열기`}
          >
            <img
              className="map-preview"
              src={`https://map2.daum.net/map/mapservice?FORMAT=PNG&SCALE=${venue.mapPreview?.scale ?? 2.5}&MX=${venue.mapPreview.x}&MY=${venue.mapPreview.y}&CX=${venue.mapPreview.x}&CY=${venue.mapPreview.y}&IW=1280&IH=720&COORDST=2`}
              alt={`${venue.name} 지도`}
              loading="lazy"
            />
          </a>
          <div className="map-links">
            <a href={venue.mapUrl} target="_blank" rel="noreferrer">
              카카오맵
            </a>
            <a href={venue.naverMapUrl} target="_blank" rel="noreferrer">
              네이버지도
            </a>
          </div>

          {venue.parking?.length > 0 && (
            <div className="parking">
              <p className="parking-title">주차 안내</p>
              <ul className="parking-list">
                {venue.parking.map((lot) => (
                  <li key={lot.label} className="parking-item">
                    <p className="parking-label">{lot.label}</p>
                    <p className="parking-name">{lot.name}</p>
                    <p className="parking-address">{lot.address}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </ScrollReveal>
      </section>

      {venue.shuttle?.length > 0 && (
        <section className="sec">
          <ScrollReveal>
            <p className="sec-no">08 — Shuttle Bus</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="shuttle">
              <p className="shuttle-title">버스 시간 안내</p>
              <p className="shuttle-note">
                군산·익산에서 출발하는 대절 버스입니다.
              </p>
              <ul className="shuttle-list">
                {venue.shuttle.map((bus) => (
                  <li key={bus.label} className="shuttle-item">
                    <p className="shuttle-city">{bus.label}</p>
                    <p className="shuttle-place">{bus.name}</p>
                    <p className="shuttle-time">{bus.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </section>
      )}

      <section className="sec">
        <ScrollReveal>
          <p className="sec-no">09 — With Heart</p>
        </ScrollReveal>
        <AccountSection accounts={accounts} onCopy={copyText} />
      </section>

      <section className="sec closing">
        <ScrollReveal preset="scale">
          <div className="paws">🐾 🐾 🐾</div>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <img
            src={assetUrl("dogs/fourofus.png")}
            alt="파이, 푸, 신랑, 신부"
            className="closing-photo"
          />
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
