import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

export default function DepartureScene({ onDepart }) {
  const { date } = weddingData;
  const flightNo = `PP ${String(date.month).padStart(2, "0")}${String(date.day).padStart(2, "0")}`;
  const dateLabel = `${date.day} ${["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][date.month - 1]} ${date.year}`;

  return (
    <section className="scene departure">
      <motion.div
        className="dep-top"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="kicker">Boarding Pass</span>
        <span className="kicker">{flightNo}</span>
      </motion.div>

      <motion.div
        className="boarding-pass"
        initial={{ opacity: 0, y: 24, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bp-main">
          <div className="bp-route">
            <div className="bp-port">
              <div className="bp-code">SAN</div>
              <div className="bp-city">San Diego</div>
            </div>
            <div className="bp-arc">
              <svg viewBox="0 0 120 34" fill="none">
                <path
                  d="M2 30 Q60 -6 118 30"
                  stroke="var(--ink)"
                  strokeWidth="1.4"
                  strokeDasharray="3 3"
                />
                <g transform="translate(60 8)">
                  <text fontSize="13" textAnchor="middle">
                    ✈
                  </text>
                </g>
              </svg>
            </div>
            <div className="bp-port to">
              <div className="bp-code">SEL</div>
              <div className="bp-city">Seoul</div>
            </div>
          </div>

          <dl className="bp-meta">
            <div>
              <dt>Date</dt>
              <dd>{dateLabel}</dd>
            </div>
            <div>
              <dt>Gate</dt>
              <dd>3PM</dd>
            </div>
            <div>
              <dt>Seat</dt>
              <dd>LOVE</dd>
            </div>
          </dl>
        </div>

        <div className="bp-perforation" />

        <div className="bp-stub">
          <div className="pax">
            <small>Passengers</small>
            Pi &amp; Pooh
          </div>
          <div className="bp-barcode">
            {[3, 1, 2, 4, 1, 3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2].map(
              (w, i) => (
                <i key={i} style={{ width: w }} />
              ),
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="dep-headline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <h1>
          샌디에고에서
          <br />
          <em>한국</em>까지
        </h1>
        <p>보더콜리 파이와 푸가 길을 안내합니다</p>
      </motion.div>

      <motion.button
        className="board-btn"
        onClick={onDepart}
        whileTap={{ scale: 0.985 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <b>파이와 푸 출발!</b>
        <span className="tag">Board now →</span>
      </motion.button>
    </section>
  );
}
