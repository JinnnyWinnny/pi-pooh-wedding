import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function GalleryGrid({ items }) {
  const [open, setOpen] = useState(null);

  const goPrev = useCallback(() => {
    setOpen((i) => (i === 0 ? items.length - 1 : i - 1));
  }, [items.length]);

  const goNext = useCallback(() => {
    setOpen((i) => (i === items.length - 1 ? 0 : i + 1));
  }, [items.length]);

  useEffect(() => {
    if (open === null) return;

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, goPrev, goNext]);

  return (
    <>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <ScrollReveal key={item.src} delay={0.04 * (i % 9)} preset="fade">
            <button
              type="button"
              className="gallery-thumb"
              onClick={() => setOpen(i)}
              aria-label={item.caption || `사진 ${i + 1} 보기`}
            >
              <img
                src={item.src}
                alt={item.caption || `사진 ${i + 1}`}
                loading="lazy"
              />
            </button>
          </ScrollReveal>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
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
                onClick={() => setOpen(null)}
                aria-label="닫기"
              >
                ×
              </button>

              <button
                type="button"
                className="lb-nav lb-prev"
                onClick={goPrev}
                aria-label="이전 사진"
              >
                ‹
              </button>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open}
                  className="lb-frame"
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.25 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 80) goPrev();
                    else if (info.offset.x < -80) goNext();
                  }}
                >
                  <img
                    src={items[open].src}
                    alt={items[open].caption || `사진 ${open + 1}`}
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                className="lb-nav lb-next"
                onClick={goNext}
                aria-label="다음 사진"
              >
                ›
              </button>

              <div className="lb-meta">
                {items[open].caption && (
                  <p className="lb-cap">{items[open].caption}</p>
                )}
                <p className="lb-count">
                  {String(open + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
