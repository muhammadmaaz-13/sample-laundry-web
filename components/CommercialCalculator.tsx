"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Slider } from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { useT } from "@/lib/i18n";
import { useSiteConfig } from "@/lib/useSiteConfig";
import { track } from "@/lib/track";

type Biz = "hotel" | "airbnb" | "salon" | "gym";

export function CommercialCalculator() {
  const { t } = useT();
  const cfg = useSiteConfig();
  const [biz, setBiz] = useState<Biz>("airbnb");
  const [signings, setSignings] = useState(8);
  const [seals, setSeals] = useState(40);
  const [travel, setTravel] = useState(6);
  const [requested, setRequested] = useState(false);

  const { monthly, discount } = useMemo(() => {
    const c = siteConfig.commercial;
    const weekly =
      signings * c.perSigningWeekly + seals * c.perSeal + travel * c.perTravel;
    let d = 0;
    for (const tier of c.volumeDiscounts) {
      if (signings >= tier.minSignings) d = tier.discount;
    }
    return { monthly: weekly * (1 - d) * 4.3, discount: d };
  }, [signings, seals, travel]);

  return (
    <GlassCard className="mt-6">
      <h3 className="font-heading text-xl font-bold">{t("commercialTitle")}</h3>
      <p className="mt-1 text-sm text-[var(--muted)]">{t("commercialSub")}</p>
      <SegmentedControl
        layoutId="biz-type"
        className="mt-4"
        value={biz}
        onChange={setBiz}
        options={[
          { value: "hotel", label: t("bizHotel") },
          { value: "airbnb", label: t("bizAirbnb") },
          { value: "salon", label: t("bizSalon") },
          { value: "gym", label: t("bizGym") },
        ]}
      />
      <div className="mt-6 space-y-4">
        <Slider
          label={t("bagsPerWeek")}
          value={signings}
          onChange={setSignings}
          max={40}
        />
        <Slider
          label={t("towelsPerWeek")}
          value={seals}
          onChange={setSeals}
          max={200}
          step={5}
        />
        <Slider
          label={t("sheetsPerWeek")}
          value={travel}
          onChange={setTravel}
          max={40}
        />
      </div>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--muted)]">{t("monthlyEstimate")}</p>
          <motion.p
            key={monthly}
            initial={{ scale: 0.94 }}
            animate={{ scale: 1 }}
            className="font-heading text-3xl font-bold text-[var(--primary)]"
          >
            {cfg.currency}
            {monthly.toFixed(0)}
          </motion.p>
          {discount > 0 && (
            <p className="text-xs font-semibold text-emerald-600">
              {t("discountApplied")} ({Math.round(discount * 100)}%)
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              setRequested(true);
              track("quote_submitted", { biz, signings, seals, travel });
            }}
          >
            {t("requestQuote")}
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            {t("downloadQuote")}
          </Button>
        </div>
      </div>
      {requested && (
        <p className="mt-4 text-sm font-semibold text-[var(--primary)]">
          {t("formThanks")}
        </p>
      )}
    </GlassCard>
  );
}
