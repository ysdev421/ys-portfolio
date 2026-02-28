"use client";

import { useEffect, useRef } from "react";

type Props = {
  term: string;
};

export function Comments({ term }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
    const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
    const mapping = process.env.NEXT_PUBLIC_GISCUS_MAPPING || "specific";

    if (!repo || !repoId || !category || !categoryId || !containerRef.current) {
      return;
    }

    containerRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", mapping);
    script.setAttribute("data-term", term);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "ja");
    script.setAttribute("data-loading", "lazy");

    containerRef.current.appendChild(script);
  }, [term]);

  return <div ref={containerRef} />;
}
