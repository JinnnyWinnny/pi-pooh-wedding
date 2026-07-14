import { useEffect, useRef, useState } from "react";
import { assetUrl } from "../utils/assetUrl";

/** Mixkit “Wedding Music” (Arulo) — Free Stock Music License (attribution not required) */
const BGM_SRC = assetUrl("audio/bgm.mp3");

export default function BgmToggle({ autoStartToken = 0 }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(BGM_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.38;
    audioRef.current = audio;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  // Start (or resume) after user gesture from intro button
  useEffect(() => {
    if (!autoStartToken) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => {});
  }, [autoStartToken]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
    <button
      type="button"
      className={`bgm-toggle${playing ? " is-on" : ""}`}
      onClick={toggle}
      aria-label={playing ? "배경음악 끄기" : "배경음악 켜기"}
      title={playing ? "음악 끄기" : "음악 켜기"}
    >
      <span className="bgm-toggle-icon" aria-hidden="true">
        ♪
      </span>
    </button>
  );
}
