"use client";

import type { DictKey } from "@/config/translations";
import { useT } from "@/lib/i18n";
import { useDemoStore } from "@/store/useDemoStore";

const copyMap: Record<string, DictKey> = {
  hero: "guideHero",
  why: "guideWhy",
  estimate: "guideEstimate",
  process: "guideProcess",
  stain: "guideStain",
  testimonials: "guideTestimonials",
  services: "guideServices",
  about: "guideAbout",
  care: "guideCare",
  booking: "guideBooking",
  contact: "guideContact",
  footer: "guideFooter",
};

export function GuideCallout({ id }: { id: keyof typeof copyMap | string }) {
  const guide = useDemoStore((s) => s.guide);
  const { t } = useT();
  if (!guide) return null;
  const key = copyMap[id];
  if (!key) return null;

  return (
    <div className="guide-callout mx-auto w-[min(1120px,calc(100%-2rem))]" role="note">
      <p className="text-xs font-extrabold uppercase tracking-wide">
        {t("guideLabel")}
      </p>
      <p className="mt-1 text-sm leading-relaxed">{t(key)}</p>
    </div>
  );
}
