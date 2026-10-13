"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { GuideCallout } from "@/components/demo/GuideCallout";
import { useT } from "@/lib/i18n";
import type { DictKey } from "@/config/translations";
import { cn } from "@/lib/cn";
import {
  BadgeCheck,
  ClipboardCheck,
  CreditCard,
  FileText,
  Fingerprint,
  IdCard,
  Languages,
  MapPin,
  Stamp,
  UserRound,
  Users,
  Volume2,
} from "lucide-react";

type Tab = "symbols" | "stains";

const stainStepKey: Record<string, DictKey> = {
  loan: "stainCoffeeSteps",
  apostille: "stainWineSteps",
  power: "stainInkSteps",
  deed: "stainGreaseSteps",
  affidavit: "stainGrassSteps",
  will: "stainBloodSteps",
};

const stainLabelKey: Record<string, DictKey> = {
  loan: "stainCoffee",
  apostille: "stainWine",
  power: "stainInk",
  deed: "stainGrease",
  affidavit: "stainGrass",
  will: "stainBlood",
};

const checklistIcons = [
  IdCard,
  FileText,
  Users,
  CreditCard,
  ClipboardCheck,
  Languages,
  Fingerprint,
  Stamp,
  BadgeCheck,
  FileText,
  FileText,
  Volume2,
];

export function CareGuide() {
  const { t } = useT();
  const [tab, setTab] = useState<Tab>("symbols");
  const [flipped, setFlipped] = useState<string | null>(null);
  const [doc, setDoc] = useState<string>("loan");

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
          {siteConfig.prepGuide.checklist.map((s, i) => {
            const Icon = checklistIcons[i] ?? FileText;
            return (
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
                      <Icon className="mx-auto h-8 w-8 text-[var(--primary)]" />
                      <p className="mt-2 text-xs font-semibold text-[var(--muted)]">
                        {t(s.labelKey as DictKey)}
                      </p>
                    </div>
                  )}
                </motion.div>
              </button>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {siteConfig.prepGuide.docTypes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setDoc(s)}
                className={cn(
                  "focus-ring min-h-11 rounded-full px-4 text-sm font-semibold",
                  doc === s
                    ? "bg-[var(--primary)] text-white"
                    : "glass text-[var(--muted)]"
                )}
              >
                {t(stainLabelKey[s])}
              </button>
            ))}
          </div>
          <motion.div
            key={doc}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-card p-6"
          >
            <h3 className="font-heading text-xl font-bold">
              {t(stainLabelKey[doc])}
            </h3>
            <p className="mt-3 text-sm leading-relaxed">
              <strong>{t("stainDo")}: </strong>
              {t(stainStepKey[doc])}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              <strong>{t("stainDont")}: </strong>
              {t("stainDontHot")}
            </p>
            <p className="mt-3 flex items-center gap-2 text-xs text-[var(--muted)]">
              <UserRound className="h-3.5 w-3.5" />
              <MapPin className="h-3.5 w-3.5" />
              In-person appearance required for most acts.
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
}
