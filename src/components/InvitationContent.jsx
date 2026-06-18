import { weddingData } from "../data/weddingData";
import { assetUrl } from "../utils/assetUrl";
import ScrollReveal from "./ScrollReveal";
import CountdownCalendar from "./CountdownCalendar";
import AboutUs from "./AboutUs";
import GalleryGrid from "./GalleryGrid";
import DogInterview from "./DogInterview";

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
  const { couple, date, venue, message, gallery, accounts, dogs, heroImage, interview } =
    weddingData;
  const dateStr = `${date.year}. ${String(date.month).padStart(2, "0")}. ${String(date.day).padStart(2, "0")} (${date.weekday})`;

  return (
    <main className="invitation">
      <section
        className="sec inv-hero"
        id="start"
        style={{ "--hero-bg": `url(${heroImage})` }}
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
        <AboutUs groom={couple.groom} bride={couple.bride} dogs={dogs} />
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
          <p className="sec-no">08 — With Heart</p>
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
