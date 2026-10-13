"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { GuideCallout } from "@/components/demo/GuideCallout";
import { useT } from "@/lib/i18n";
import type { DictKey } from "@/config/translations";
import { cn } from "@/lib/cn";

type Tab = "symbols" | "stains";

const stainStepKey: Record<string, DictKey> = {
  coffee: "stainCoffeeSteps",
  wine: "stainWineSteps",
  ink: "stainInkSteps",
  grease: "stainGreaseSteps",
  grass: "stainGrassSteps",
  blood: "stainBloodSteps",
};

const stainLabelKey: Record<string, DictKey> = {
  coffee: "stainCoffee",
  wine: "stainWine",
  ink: "stainInk",
  grease: "stainGrease",
  grass: "stainGrass",
  blood: "stainBlood",
};

export function CareGuide() {
  const { t } = useT();
  const [tab, setTab] = useState<Tab>("symbols");
  const [flipped, setFlipped] = useState<string | null>(null);
  const [stain, setStain] = useState<string>("coffee");

  return (
    <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-12">
      <GuideCallout id="care" />
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-bold">{t("careTitle")}</h2>
        <p className="mt-2 text-[var(--muted)]">{t("careSub")}</p>
      </div>
      <SegmentedControl
        layoutId="care-tab"
        value={tab}
        onChange={setTab}
        options={[
          { value: "symbols", label: t("careSymbols") },
          { value: "stains", label: t("careStains") },
        ]}
        className="mx-auto mb-8 max-w-md"
      />

      {tab === "symbols" ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {siteConfig.careGuide.symbols.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setFlipped(flipped === s.id ? null : s.id)}
              className="focus-ring glass min-h-[120px] rounded-card p-4 text-center"
            >
              <motion.div
                animate={{ rotateY: flipped === s.id ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {flipped === s.id ? (
                  <p
                    className="text-sm font-medium"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    {t(s.labelKey as DictKey)}
                  </p>
                ) : (
                  <div>
                    <CareSymbol id={s.id} />
                    <p className="mt-2 text-xs font-semibold text-[var(--muted)]">
                      {t(s.labelKey as DictKey)}
                    </p>
                  </div>
                )}
              </motion.div>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {siteConfig.careGuide.stains.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStain(s)}
                className={cn(
                  "focus-ring min-h-11 rounded-full px-4 text-sm font-semibold",
                  stain === s
                    ? "bg-[var(--primary)] text-white"
                    : "glass text-[var(--muted)]"
                )}
              >
                {t(stainLabelKey[s])}
              </button>
            ))}
          </div>
          <motion.div
            key={stain}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-card p-6"
          >
            <h3 className="font-heading text-xl font-bold">
              {t(stainLabelKey[stain])}
            </h3>
            <p className="mt-3 text-sm leading-relaxed">
              <strong>{t("stainDo")}: </strong>
              {t(stainStepKey[stain])}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              <strong>{t("stainDont")}: </strong>
              {t("stainDontHot")}
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
}

function CareSymbol({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 48 48" className="mx-auto h-10 w-10 stroke-[var(--secondary)]" fill="none" strokeWidth="2">
      {id === "wash30" && (
        <>
          <rect x="8" y="12" width="32" height="24" rx="2" />
          <text x="24" y="28" textAnchor="middle" fontSize="10" fill="currentColor" stroke="none">
            30°
          </text>
        </>
      )}
      {id === "noBleach" && (
        <>
          <path d="M10 36 L24 10 L38 36 Z" />
          <line x1="12" y1="12" x2="36" y2="36" />
        </>
      )}
      {id === "tumbleLow" && (
        <>
          <circle cx="24" cy="24" r="14" />
          <circle cx="24" cy="24" r="6" />
        </>
      )}
      {id === "dryClean" && <circle cx="24" cy="24" r="14" />}
      {id === "ironMed" && (
        <>
          <path d="M8 30 h28 l4-10 H18 l-4 10" />
          <line x1="16" y1="34" x2="20" y2="34" />
          <line x1="24" y1="34" x2="28" y2="34" />
        </>
      )}
      {id === "noTumble" && (
        <>
          <circle cx="24" cy="24" r="14" />
          <line x1="12" y1="12" x2="36" y2="36" />
        </>
      )}
      {id === "handWash" && (
        <>
          <path d="M14 28 c0-8 6-12 10-12 s10 4 10 12" />
          <path d="M18 28 h12" />
        </>
      )}
      {id === "lineDry" && (
        <>
          <line x1="10" y1="14" x2="38" y2="14" />
          <path d="M18 14 v20 M30 14 v20" />
        </>
      )}
      {id === "noIron" && (
        <>
          <path d="M8 30 h28 l4-10 H18 l-4 10" />
          <line x1="12" y1="12" x2="36" y2="36" />
        </>
      )}
      {id === "doNotWash" && (
        <>
          <rect x="8" y="12" width="32" height="24" rx="2" />
          <line x1="12" y1="12" x2="36" y2="36" />
        </>
      )}
      {id === "gentle" && (
        <>
          <rect x="8" y="12" width="32" height="24" rx="2" />
          <path d="M14 28 q10 -12 20 0" />
        </>
      )}
      {id === "anySolvent" && (
        <>
          <circle cx="24" cy="24" r="14" />
          <text x="24" y="28" textAnchor="middle" fontSize="12" fill="currentColor" stroke="none">
            A
          </text>
        </>
      )}
    </svg>
  );
}
