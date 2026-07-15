/**
 * Warm the browser image cache without blocking UI.
 * Uses a small concurrency pool so mobile networks aren't flooded.
 */
export function preloadImages(urls, { concurrency = 3 } = {}) {
  const unique = [...new Set(urls.filter(Boolean))];
  if (!unique.length) return Promise.resolve();

  let cursor = 0;
  let active = 0;
  let resolved = 0;

  return new Promise((resolve) => {
    const pump = () => {
      while (active < concurrency && cursor < unique.length) {
        const url = unique[cursor++];
        active += 1;

        const img = new Image();
        img.decoding = "async";

        const finish = () => {
          active -= 1;
          resolved += 1;
          if (resolved >= unique.length) resolve();
          else pump();
        };

        img.onload = finish;
        img.onerror = finish;
        img.src = url;
      }
    };

    pump();
  });
}

export function scheduleIdle(fn, timeout = 2000) {
  if (typeof window === "undefined") return;
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(fn, { timeout });
  } else {
    window.setTimeout(fn, Math.min(timeout, 1200));
  }
}
