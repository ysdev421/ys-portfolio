"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type TocItem = {
  id: string;
  heading: string;
};

type Props = {
  items: TocItem[];
};

export function TocNav({ items }: Props) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  const validItems = useMemo(
    () => items.filter((item) => item.id.trim().length > 0),
    [items],
  );

  useEffect(() => {
    if (validItems.length === 0) {
      return;
    }

    const elements = validItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: [0, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [validItems]);

  return (
    <nav className={styles.toc} aria-label="目次">
      <p className={styles.tocTitle}>目次</p>
      <ol className={styles.tocList}>
        {validItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={activeId === item.id ? styles.tocActive : ""}
            >
              {item.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

