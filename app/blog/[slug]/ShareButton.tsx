"use client";

import { useEffect, useState } from "react";
import styles from "./ShareButton.module.css";

type Props = { title: string };

export function ShareButton({ title }: Props) {
  const [copied, setCopied] = useState(false);
  const [tweetUrl, setTweetUrl] = useState("");

  useEffect(() => {
    setTweetUrl(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`,
    );
  }, [title]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not supported — silent fail
    }
  };

  return (
    <div className={styles.row}>
      <button
        type="button"
        onClick={handleCopy}
        className={styles.button}
        aria-label="URLをコピー"
      >
        {copied ? "✓ コピーしました！" : "URLをコピー"}
      </button>
      {tweetUrl && (
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.twitterBtn}`}
          aria-label="Xでシェア"
        >
          𝕏 でシェア
        </a>
      )}
    </div>
  );
}
