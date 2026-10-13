"use client";

import { useEffect } from "react";
import { themes } from "@/config/themes";
import { useAppStore } from "@/store/useAppStore";
import { useDemoStore } from "@/store/useDemoStore";
import { track } from "@/lib/track";

export function ThemeSync({ children }: { children: React.ReactNode }) {
  const mode = useAppStore((s) => s.mode);
  const themeIndex = useDemoStore((s) => s.themeIndex);
  const accent = useDemoStore((s) => s.accent);
  const lang = useDemoStore((s) => s.lang);

  useEffect(() => {
    track("demo_opened");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const theme = themes[themeIndex]?.id ?? "aqua";
    root.dataset.theme = theme;
    root.classList.toggle("dark", mode === "dark");
    root.lang = lang;
    if (accent) {
      root.dataset.accent = "true";
      root.style.setProperty("--accent-override", accent);
      root.style.setProperty("--primary", accent);
    } else {
      delete root.dataset.accent;
      root.style.removeProperty("--accent-override");
      root.style.removeProperty("--primary");
    }
  }, [mode, themeIndex, accent, lang]);

  return <>{children}</>;
}
