import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

function MomentLightbox({ photos, title, index, onClose, onChange }) {
  const goPrev = useCallback(() => {
    onChange(index === 0 ? photos.length - 1 : index - 1);
  }, [index, onChange, photos.length]);

  const goNext = useCallback(() => {
    onChange(index === photos.length - 1 ? 0 : index + 1);
  }, [index, onChange, photos.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [goPrev, goNext, onClose]);

  return (
    <motion.div
      className="gallery-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="gallery-lightbox-inner"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="lb-close"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>

        {photos.length > 1 && (
          <button
            type="button"
            className="lb-nav lb-prev"
            onClick={goPrev}
            aria-label="이전 사진"
          >
            ‹
          </button>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            className="lb-frame"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.25 }}
            drag={photos.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (photos.length <= 1) return;
              if (info.offset.x > 80) goPrev();
              else if (info.offset.x < -80) goNext();
            }}
          >
            <img src={photos[index]} alt={`${title} ${index + 1}`} />
          </motion.div>
        </AnimatePresence>

        {photos.length > 1 && (
          <button
            type="button"
            className="lb-nav lb-next"
            onClick={goNext}
            aria-label="다음 사진"
          >
            ›
          </button>
        )}

        <div className="lb-meta">
          <p className="lb-cap">{title}</p>
          {photos.length > 1 && (
            <p className="lb-count">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(photos.length).padStart(2, "0")}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MemoryMomentCard({ moment, showYear }) {
  const [lightbox, setLightbox] = useState(null);
  const photos = moment.images ?? (moment.image ? [moment.image] : []);
  const cover = moment.cover ?? photos[0];
  const lines = moment.lines ?? (moment.body ? [moment.body].flat() : []);
  const extraCount = photos.length - 1;

  if (!cover) return null;

  return (
    <li className="timeline-item">
      <div className="timeline-marker">
        <span className="timeline-year">
          {showYear && moment.year ? moment.year : ""}
        </span>
        <span className="timeline-dot" aria-hidden="true" />
      </div>
      <article className="timeline-card">
        <button
          type="button"
          className="timeline-photo-trigger"
          onClick={() => setLightbox(0)}
          aria-label={
            photos.length > 1
              ? `${moment.title} 사진 ${photos.length}장 보기`
              : `${moment.title} 사진 보기`
          }
        >
          <img src={cover} alt={moment.title} loading="lazy" />
          {extraCount > 0 && (
            <span className="timeline-photo-badge">+{extraCount}</span>
          )}
        </button>

        {photos.length > 1 && (
          <button
            type="button"
            className="timeline-photo-more"
            onClick={() => setLightbox(0)}
          >
            사진 {photos.length}장 보기
          </button>
        )}

        <div className="timeline-body">
          <h3 className="timeline-title">{moment.title}</h3>
          {lines.map(
            (line, j) =>
              line && (
                <p key={j} className="timeline-text">
                  {line}
                </p>
              ),
          )}
        </div>
      </article>

      {createPortal(
        <AnimatePresence>
          {lightbox !== null && (
            <MomentLightbox
              photos={photos}
              title={moment.title}
              index={lightbox}
              onClose={() => setLightbox(null)}
              onChange={setLightbox}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </li>
  );
}

export default function MemoriesTimeline({ memories }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="memories">
      <ScrollReveal>
        <div className="memories-head">
          <p className="memories-kicker">{memories.title}</p>
          <h2 className="memories-title">{memories.subtitle}</h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <button
          type="button"
          className={`memories-cover${open ? " is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
        >
          <img src={memories.coverImage} alt="" className="memories-cover-img" />
          <span className="memories-cover-overlay" aria-hidden="true" />
          <span className="memories-cover-cta">
            <span className="memories-cover-label">
              {open ? "추억 접기" : "추억 펼치기"}
            </span>
            <span className={`memories-chevron${open ? " is-open" : ""}`}>
              ↓
            </span>
          </span>
        </button>
      </ScrollReveal>

      <div
        id={panelId}
        className={`memories-panel${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="memories-panel-inner">
          <ol className="timeline">
            {memories.moments.map((moment, i) => {
              const prevYear =
                i > 0 ? memories.moments[i - 1].year : undefined;
              const showYear = moment.year && moment.year !== prevYear;

              return (
                <MemoryMomentCard
                  key={i}
                  moment={moment}
                  showYear={showYear}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
