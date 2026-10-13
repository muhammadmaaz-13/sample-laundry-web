"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { LeadService } from "@/config/siteConfig";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { CommercialCalculator } from "@/components/CommercialCalculator";
import { GuideCallout } from "@/components/demo/GuideCallout";
import { useT } from "@/lib/i18n";
import { useSiteConfig } from "@/lib/useSiteConfig";
import type { DictKey } from "@/config/translations";
import { cn } from "@/lib/cn";

const catLabel: Record<LeadService, DictKey> = {
  loan: "catWashFold",
  apostille: "catDryClean",
  estate: "catIroning",
  mobile: "catEco",
  business: "catCommercial",
};

const unitLabel: Record<string, DictKey> = {
  seal: "perKg",
  document: "perPiece",
  signing: "perSuit",
  package: "perBag",
  appointment: "perSet",
  visit: "perSet",
};

export function ServicesView() {
  const { t } = useT();
  const cfg = useSiteConfig();
  const [cat, setCat] = useState<LeadService>(cfg.lead);
  const [query, setQuery] = useState("");

  const options = cfg.orderedServices.map((s) => ({
    value: s.id,
    label: t(catLabel[s.id]),
  }));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      const current = cfg.orderedServices.find((s) => s.id === cat);
      return current?.items ?? [];
    }
    return cfg.orderedServices.flatMap((s) =>
      s.items
        .filter((item) => t(item.nameKey as DictKey).toLowerCase().includes(q))
        .map((item) => ({ ...item, category: s.id, popular: s.popular }))
    );
  }, [query, cat, cfg.orderedServices, t]);

  return (
    <div className="mx-auto w-[min(1120px,calc(100%-2rem))] py-10">
      <GuideCallout id="services" />
      <div className="mb-8 text-center">
        <h1 className="font-heading text-4xl font-bold">{t("servicesTitle")}</h1>
        <p className="mt-2 text-[var(--muted)]">{t("servicesSub")}</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchItems")}
          className="focus-ring glass min-h-12 w-full rounded-full py-3 pl-11 pr-4 text-sm outline-none"
        />
      </div>

      {!query && (
        <SegmentedControl
          layoutId="svc-cats"
          value={cat}
          onChange={setCat}
          options={options}
          className="mb-8"
        />
      )}

      <div id="pricing" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => {
          const isLead =
            !query &&
            cat === cfg.lead &&
            i === 0;
          const popular =
            ("popular" in item && item.popular) ||
            (!query &&
              cfg.orderedServices.find((s) => s.id === cat)?.popular &&
              i === 0);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                "glass relative rounded-card p-5",
                popular && "ring-2 ring-[var(--primary)]"
              )}
            >
              {(popular || isLead) && (
                <span
                  className={cn(
                    "absolute -top-2 right-4 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white",
                    isLead ? "bg-[var(--secondary)]" : "bg-[var(--primary)] animate-pulse"
                  )}
                >
                  {isLead ? t("mainService") : t("popularChoice")}
                </span>
              )}
              <h3 className="font-heading text-lg font-bold">
                {t(item.nameKey as DictKey)}
              </h3>
              <p className="mt-3 font-heading text-2xl font-bold text-[var(--primary)]">
                {cfg.currency}
                {item.price.toFixed(2)}
              </p>
              <p className="text-xs text-[var(--muted)]">
                {t(unitLabel[item.unit] ?? "perPiece")}
              </p>
            </motion.div>
          );
        })}
      </div>

      {cat === "business" && !query && <CommercialCalculator />}
    </div>
  );
}
