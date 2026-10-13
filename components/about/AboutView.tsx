"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { Counter } from "@/components/ui/Counter";
import { GlassCard } from "@/components/ui/GlassCard";
import { CareGuide } from "@/components/CareGuide";
import { GuideCallout } from "@/components/demo/GuideCallout";
import { useT } from "@/lib/i18n";
import type { DictKey } from "@/config/translations";

const statLabels: DictKey[] = ["statBags", "statOnTime", "statEco", "statBranches"];

export function AboutView() {
  const { t } = useT();

  return (
    <div className="py-10">
      <GuideCallout id="about" />
      <div className="mx-auto grid w-[min(1120px,calc(100%-2rem))] items-center gap-8 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card">
          <Image
            src={siteConfig.images.machines}
            alt="European washing machines"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 560px"
          />
        </div>
        <div>
          <h1 className="font-heading text-4xl font-bold">{t("aboutTitle")}</h1>
          <p className="mt-2 text-[var(--muted)]">{t("aboutSub")}</p>
          <GlassCard className="mt-6" tilt>
            <p className="text-sm leading-relaxed">{t("aboutMission")}</p>
          </GlassCard>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <GlassCard>
              <p className="text-sm leading-relaxed">{t("aboutMachines")}</p>
            </GlassCard>
            <GlassCard>
              <p className="text-sm leading-relaxed">{t("aboutFabric")}</p>
            </GlassCard>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 w-[min(1120px,calc(100%-2rem))]">
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
          {t("aboutStatsSample")}
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {siteConfig.stats.map((s, i) => (
            <GlassCard key={s.key} className="text-center">
              <Counter
                value={s.value}
                suffix={s.suffix}
                decimals={s.decimals}
                className="font-heading text-3xl font-bold text-[var(--primary)]"
              />
              <p className="mt-1 text-xs font-semibold text-[var(--muted)]">
                {t(statLabels[i])}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      <CareGuide />

      <div className="mx-auto w-[min(1120px,calc(100%-2rem))] py-8">
        <GlassCard className="flex flex-col items-start gap-4 md:flex-row md:items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)] text-white">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold">{t("guaranteeTitle")}</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">{t("guaranteeDesc")}</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
