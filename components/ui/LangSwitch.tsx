"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useDemoStore } from "@/store/useDemoStore";
import { track } from "@/lib/track";

type Props = { className?: string; dark?: boolean };

export function LangSwitch({ className, dark }: Props) {
  const lang = useDemoStore((s) => s.lang);
  const setLang = useDemoStore((s) => s.setLang);

  return (
    <div
      className={cn(
        "relative inline-flex min-h-11 items-center rounded-full p-1 text-xs font-bold",
        dark ? "bg-white/10 text-white" : "glass",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {(["en", "es"] as const).map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => {
              setLang(l);
              track("language_changed", { lang: l });
            }}
            className={cn(
              "focus-ring relative z-0 min-h-9 min-w-10 rounded-full px-3 uppercase",
              active
                ? dark
                  ? "text-[#0B0B0F]"
                  : "text-white"
                : dark
                  ? "text-white/70"
                  : "text-[var(--muted)]"
            )}
          >
            {active && (
              <motion.span
                layoutId={dark ? "lang-pill-demo" : "lang-pill"}
                className={cn(
                  "absolute inset-0 -z-10 rounded-full",
                  dark ? "bg-[#FACC15]" : "bg-[var(--primary)]"
                )}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {l}
          </button>
        );
      })}
    </div>
  );
}
