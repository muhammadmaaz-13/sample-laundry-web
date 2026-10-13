"use client";

import { useMemo } from "react";
import { useDemoStore } from "@/store/useDemoStore";
import { themes } from "@/config/themes";

export function ThemedBackground() {
  const themeIndex = useDemoStore((s) => s.themeIndex);
  const theme = themes[themeIndex]?.id ?? "aqua";

  const bubbles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: `${(i * 11 + 5) % 95}%`,
        size: 12 + (i % 5) * 10,
        duration: 12 + (i % 6) * 3,
        delay: i * 1.4,
      })),
    []
  );

  if (theme === "mint") return <div className="bg-blobs" aria-hidden />;
  if (theme === "midnight") return <div className="bg-aurora" aria-hidden />;
  if (theme === "warm") return <div className="bg-confetti" aria-hidden />;

  return (
    <div className="bg-mesh" aria-hidden>
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
