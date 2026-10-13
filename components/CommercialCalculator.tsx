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
  const [bags, setBags] = useState(8);
  const [towels, setTowels] = useState(40);
  const [sheets, setSheets] = useState(10);
  const [requested, setRequested] = useState(false);

  const { monthly, discount } = useMemo(() => {
    const c = siteConfig.commercial;
    const weekly =
      bags * c.perBagWeekly + towels * c.perTowel + sheets * c.perSheetSet;
    let d = 0;
    for (const tier of c.volumeDiscounts) {
      if (bags >= tier.minBags) d = tier.discount;
    }
    const after = weekly * (1 - d) * 4.3;
    return { monthly: after, discount: d };
  }, [bags, towels, sheets]);

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
        <Slider label={t("bagsPerWeek")} value={bags} onChange={setBags} max={60} />
        <Slider label={t("towelsPerWeek")} value={towels} onChange={setTowels} max={200} step={5} />
        <Slider label={t("sheetsPerWeek")} value={sheets} onChange={setSheets} max={80} />
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
              track("quote_submitted", { biz, bags, towels, sheets });
            }}
          >
            {t("requestQuote")}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              window.print();
            }}
          >
            {t("downloadQuote")}
          </Button>
        </div>
      </div>
      {requested && (
        <p className="mt-4 text-sm font-semibold text-[var(--primary)]">
          {t("formThanks")}
        </p>
      )}
      <div className="hidden print:block">
        <h1>{cfg.businessName} — Quote</h1>
        <p>
          {biz}: {bags} bags, {towels} towels, {sheets} sheets / week
        </p>
        <p>
          Monthly: {cfg.currency}
          {monthly.toFixed(2)}
        </p>
      </div>
    </GlassCard>
  );
}
