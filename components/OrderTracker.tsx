"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Package,
  Shirt,
  Sparkles,
  Truck,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const icons = [Package, Shirt, Sparkles, Truck];
const stepKeys = [
  "trackerStepPickedUp",
  "trackerStepWashing",
  "trackerStepIroning",
  "trackerStepDelivery",
] as const;

export function OrderTracker({
  forcedCode,
}: {
  forcedCode?: string;
}) {
  const { t } = useT();
  const [code, setCode] = useState("");
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (forcedCode) {
      setCode(forcedCode);
      start(forcedCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forcedCode]);

  useEffect(() => {
    if (!active) return;
    if (step >= 3) return;
    const tmr = setTimeout(() => setStep((s) => s + 1), 1800);
    return () => clearTimeout(tmr);
  }, [active, step]);

  const start = (raw?: string) => {
    const value = (raw ?? code).trim().toUpperCase();
    if (value !== siteConfig.tracker.demoCode) {
      setShake(true);
      setError(t("trackerInvalid"));
      setActive(false);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setError("");
    setStep(0);
    setActive(true);
  };

  return (
    <GlassCard className="overflow-hidden">
      <div className="mb-4">
        <h3 className="font-heading text-xl font-bold">{t("trackerTitle")}</h3>
        <p className="text-sm text-[var(--muted)]">{t("trackerSub")}</p>
      </div>

      <motion.div
        animate={shake ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={t("trackerPlaceholder")}
          className="focus-ring min-h-11 flex-1 rounded-btn border border-[var(--glass-border)] bg-[var(--surface)] px-4 text-sm outline-none focus:border-[var(--primary)]"
        />
        <Button onClick={() => start()}>{t("trackerDemo").split(" ")[0]}</Button>
        <Button variant="outline" onClick={() => start("CLEAN123")}>
          {t("trackerDemo")}
        </Button>
      </motion.div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

      <AnimatePresence>
        {active && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-6"
          >
            <div className="glass mx-auto flex max-w-md items-center gap-3 rounded-full px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wide">
                {t("trackerLive")}
              </span>
              <span className="ml-auto text-xs text-[var(--muted)]">
                {t("trackerEta")}
              </span>
            </div>

            <div className="relative mt-6 px-2">
              <div className="absolute left-8 right-8 top-5 h-1 rounded-full bg-slate-200 dark:bg-slate-700">
                <motion.div
                  className="h-full rounded-full bg-[var(--primary)]"
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
              <div className="relative grid grid-cols-4 gap-2">
                {stepKeys.map((key, i) => {
                  const Icon = icons[i];
                  const on = i <= step;
                  return (
                    <div key={key} className="flex flex-col items-center gap-2 text-center">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                          on
                            ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                            : "border-slate-300 bg-[var(--surface)] text-[var(--muted)]"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-semibold leading-tight md:text-xs">
                        {t(key)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
