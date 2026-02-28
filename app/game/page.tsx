"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";

const GAME_SECONDS = 30;
const FIELD_WIDTH = 560;
const FIELD_HEIGHT = 340;
const TARGET_SIZE = 52;

function randomPosition() {
  return {
    x: Math.floor(Math.random() * (FIELD_WIDTH - TARGET_SIZE)),
    y: Math.floor(Math.random() * (FIELD_HEIGHT - TARGET_SIZE)),
  };
}

export default function GamePage() {
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [target, setTarget] = useState(randomPosition);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) {
      return;
    }

    tickRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (tickRef.current) {
        clearInterval(tickRef.current);
      }
    };
  }, [playing]);

  const statusText = useMemo(() => {
    if (!playing && timeLeft === 0) {
      return `終了！スコア: ${score}`;
    }
    if (!playing) {
      return "スタートで開始";
    }
    return "ターゲットをクリック！";
  }, [playing, score, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_SECONDS);
    setTarget(randomPosition());
    setPlaying(true);
  };

  const hitTarget = () => {
    if (!playing) {
      return;
    }
    setScore((prev) => prev + 1);
    setTarget(randomPosition());
  };

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>BROWSER GAME</p>
        <h1>Reflex Click</h1>
        <p className={styles.description}>
          30秒以内にターゲットを何回クリックできるかを競う、シンプルな反射神経ゲームです。
        </p>

        <div className={styles.infoRow}>
          <p>Time: {timeLeft}s</p>
          <p>Score: {score}</p>
          <button type="button" onClick={startGame} className={styles.button}>
            {playing ? "リスタート" : "スタート"}
          </button>
        </div>

        <p className={styles.status}>{statusText}</p>

        <div className={styles.field} role="application" aria-label="ゲームエリア">
          <button
            type="button"
            onClick={hitTarget}
            className={styles.target}
            style={{ transform: `translate(${target.x}px, ${target.y}px)` }}
            disabled={!playing}
            aria-label="ターゲット"
          />
        </div>
      </section>
    </main>
  );
}
