"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import { themes } from "@/config/themes";
import { useDemoStore } from "@/store/useDemoStore";
import { useAppStore } from "@/store/useAppStore";
import { useT } from "@/lib/i18n";
import { track } from "@/lib/track";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { cn } from "@/lib/cn";

const DEMO_ENABLED = process.env.NEXT_PUBLIC_DEMO !== "false";

export function DemoToolbar() {
  const barRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useT();
  const themeIndex = useDemoStore((s) => s.themeIndex);
  const nextTheme = useDemoStore((s) => s.nextTheme);
  const firstThemePress = useDemoStore((s) => s.firstThemePress);
  const guide = useDemoStore((s) => s.guide);
  const toggleGuide = useDemoStore((s) => s.toggleGuide);
  const drawerOpen = useDemoStore((s) => s.drawerOpen);
  const setDrawerOpen = useDemoStore((s) => s.setDrawerOpen);
  const demoVisible = useDemoStore((s) => s.demoVisible);
  const setDemoVisible = useDemoStore((s) => s.setDemoVisible);
  const mode = useAppStore((s) => s.mode);
  const toggleMode = useAppStore((s) => s.toggleMode);
  const [wiping, setWiping] = useState(false);

  useEffect(() => {
    if (!DEMO_ENABLED || !demoVisible) {
      document.documentElement.style.setProperty("--demo-bar-h", "0px");
      return;
    }
    const el = barRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        "--demo-bar-h",
        `${el.offsetHeight}px`
      );
    });
    ro.observe(el);
    document.documentElement.style.setProperty(
      "--demo-bar-h",
      `${el.offsetHeight}px`
    );
    return () => ro.disconnect();
  }, [demoVisible]);

  if (!DEMO_ENABLED) return null;

  if (!demoVisible) {
    return (
      <button
        type="button"
        onClick={() => setDemoVisible(true)}
        className="fixed left-3 top-[max(0.75rem,env(safe-area-inset-top))] z-[90] rounded-full bg-[#0B0B0F] px-4 py-2 text-xs font-bold text-white shadow-lg"
      >
        {t("demoShow")}
      </button>
    );
  }

  const theme = themes[themeIndex];
  const instruction = firstThemePress
    ? t("demoThemeLine", {
        n: themeIndex + 1,
        name: lang === "es" ? theme.nameEs : theme.name,
      })
    : t("demoInstruction");

  const onTheme = () => {
    setWiping(true);
    nextTheme();
    track("theme_changed", {
      theme: themes[(themeIndex + 1) % themes.length].id,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setWiping(false), 450);
  };

  return (
    <>
      <div
        ref={barRef}
        className="fixed inset-x-0 top-0 z-[90] border-b border-white/10 bg-[#0B0B0F] text-white"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex w-[min(1200px,100%)] flex-wrap items-center gap-2 px-3 py-2.5">
          <p className="min-w-[180px] flex-1 text-xs leading-snug text-white/80 md:text-sm">
            {instruction}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onTheme}
              className={cn(
                "focus-ring min-h-11 rounded-full bg-[#FACC15] px-4 text-xs font-extrabold text-[#0B0B0F] md:text-sm",
                !firstThemePress && "demo-pulse"
              )}
            >
              {t("demoChangeTheme")}
            </button>
            <button
              type="button"
              onClick={() => {
                setDrawerOpen(!drawerOpen);
                if (!drawerOpen) track("customize_opened");
              }}
              className={cn(
                "focus-ring min-h-11 rounded-full border border-white/20 px-4 text-xs font-semibold md:text-sm",
                drawerOpen && "bg-white/10"
              )}
            >
              {t("demoCustomize")}
            </button>
            <button
              type="button"
              onClick={() => {
                toggleGuide();
                track("guide_toggled", { guide: !guide });
              }}
              className={cn(
                "focus-ring min-h-11 rounded-full border border-white/20 px-4 text-xs font-semibold md:text-sm",
                guide && "bg-[#FACC15] text-[#0B0B0F]"
              )}
            >
              {t("demoWhy")}
            </button>
            <LangSwitch dark />
            <button
              type="button"
              onClick={toggleMode}
              className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20"
              aria-label={mode === "dark" ? t("demoLight") : t("demoDark")}
            >
              {mode === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setDemoVisible(false)}
              className="focus-ring inline-flex min-h-11 items-center gap-1 rounded-full border border-white/20 px-3 text-xs"
            >
              <EyeOff className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t("demoHide")}</span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {wiping && (
          <motion.div
            className="theme-wipe"
            initial={{ opacity: 0.5, scaleY: 0, originY: 0 }}
            animate={{ opacity: 0.35, scaleY: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          />
        )}
      </AnimatePresence>

      {!demoVisible && (
        <span className="sr-only">
          <Eye />
        </span>
      )}
    </>
  );
}
