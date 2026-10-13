"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { GlassCard } from "@/components/ui/GlassCard";
import { Slider } from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";
import { GuideCallout } from "@/components/demo/GuideCallout";
import { useT } from "@/lib/i18n";
import { useSiteConfig } from "@/lib/useSiteConfig";
import { useAppStore } from "@/store/useAppStore";
import { track } from "@/lib/track";

export function PriceCalculator() {
  const { t } = useT();
  const cfg = useSiteConfig();
  const openBooking = useAppStore((s) => s.openBooking);
  const [kg, setKg] = useState(5);
  const [suits, setSuits] = useState(1);
  const [comforters, setComforters] = useState(0);

  const total = useMemo(() => {
    const e = siteConfig.estimator;
    return kg * e.perKg + suits * e.perSuit + comforters * e.perComforter;
  }, [kg, suits, comforters]);

  return (
    <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-10">
      <GuideCallout id="estimate" />
      <GlassCard>
        <h2 className="font-heading text-2xl font-bold">{t("estimateTitle")}</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">{t("estimateSub")}</p>
        <div className="mt-6 space-y-5">
          <Slider label={t("estimateKg")} value={kg} onChange={setKg} max={30} unit="kg" />
          <Slider label={t("estimateSuits")} value={suits} onChange={setSuits} max={10} />
          <Slider
            label={t("estimateComforters")}
            value={comforters}
            onChange={setComforters}
            max={8}
          />
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-[var(--muted)]">{t("estimateTotal")}</p>
            <motion.p
              key={total}
              initial={{ scale: 0.92, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-heading text-3xl font-bold text-[var(--primary)]"
            >
              {cfg.currency}
              {total.toFixed(2)}
            </motion.p>
          </div>
          <Button
            onClick={() => {
              track("book_clicked");
              openBooking({ kg, suits, comforters, total });
            }}
          >
            {t("estimateOrder")}
          </Button>
        </div>
      </GlassCard>
    </section>
  );
}
