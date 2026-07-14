import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const AUTO_MS = 4200;

export default function GalleryGrid({ items }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [paused, setPaused] = useState(false);
  const stripRef = useRef(null);
  const thumbRefs = useRef([]);

  const len = items.length;

  const goPrev = useCallback(() => {
    setIndex((i) => (i === 0 ? len - 1 : i - 1));
  }, [len]);

  const goNext = useCallback(() => {
    setIndex((i) => (i === len - 1 ? 0 : i + 1));
  }, [len]);

  const lbPrev = useCallback(() => {
    setLightbox((i) => (i === 0 ? len - 1 : i - 1));
  }, [len]);

  const lbNext = useCallback(() => {
    setLightbox((i) => (i === len - 1 ? 0 : i + 1));
  }, [len]);

  // Autoplay slideshow
  useEffect(() => {
    if (paused || lightbox !== null || len < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(goNext, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, lightbox, len, goNext]);

  // Keep active thumb in view (strip only — never scroll the page)
  useEffect(() => {
    const strip = stripRef.current;
    const el = thumbRefs.current[index];
    if (!strip || !el) return;

    const left = el.offsetLeft - (strip.clientWidth - el.clientWidth) / 2;
    strip.scrollTo({
      left: Math.max(0, left),
      behavior: "smooth",
    });
  }, [index]);

  // Lightbox keyboard + scroll lock
  useEffect(() => {
    if (lightbox === null) return;

    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, lbPrev, lbNext]);

  if (!len) return null;

  const current = items[index];

  return (
    <>
      <div
        className="gallery-carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
        }}
      >
        <div className="gallery-stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.button
              key={current.src}
              type="button"
              className="gallery-slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              onClick={() => setLightbox(index)}
              aria-label={`${index + 1}번째 사진 크게 보기`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.14}
              onDragStart={() => setPaused(true)}
              onDragEnd={(_, info) => {
                if (info.offset.x > 70) goPrev();
                else if (info.offset.x < -70) goNext();
              }}
            >
              <img
                src={current.src}
                alt={current.caption || `갤러리 사진 ${index + 1}`}
                draggable={false}
              />
            </motion.button>
          </AnimatePresence>
        </div>

        <div className="gallery-meta">
          <p className="gallery-count">
            {String(index + 1).padStart(2, "0")}
            <span> / {String(len).padStart(2, "0")}</span>
          </p>
          <p className="gallery-hint">탭하면 크게 볼 수 있어요</p>
        </div>

        <div className="gallery-strip" ref={stripRef} role="list">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              role="listitem"
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              className={`gallery-strip-thumb${i === index ? " is-active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}번째 사진으로 이동`}
              aria-current={i === index ? "true" : undefined}
            >
              <img
                src={item.src}
                alt=""
                loading="lazy"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              className="gallery-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
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
                  onClick={() => setLightbox(null)}
                  aria-label="닫기"
                >
                  ×
                </button>

                <button
                  type="button"
                  className="lb-nav lb-prev"
                  onClick={lbPrev}
                  aria-label="이전 사진"
                >
                  ‹
                </button>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={lightbox}
                    className="lb-frame"
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.25 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onDragEnd={(_, info) => {
                      const gone =
                        Math.abs(info.offset.x) > 50 ||
                        Math.abs(info.velocity.x) > 400;
                      if (!gone) return;
                      if (info.offset.x > 0 || info.velocity.x > 0) lbPrev();
                      else lbNext();
                    }}
                  >
                    <img
                      src={items[lightbox].src}
                      alt={items[lightbox].caption || `사진 ${lightbox + 1}`}
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  type="button"
                  className="lb-nav lb-next"
                  onClick={lbNext}
                  aria-label="다음 사진"
                >
                  ›
                </button>

                <div className="lb-meta">
                  {items[lightbox].caption && (
                    <p className="lb-cap">{items[lightbox].caption}</p>
                  )}
                  <p className="lb-count">
                    {String(lightbox + 1).padStart(2, "0")} /{" "}
                    {String(len).padStart(2, "0")}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
