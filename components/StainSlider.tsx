"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { GuideCallout } from "@/components/demo/GuideCallout";
import { useT } from "@/lib/i18n";

export function StainSlider() {
  const { t } = useT();
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const box = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const el = box.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, pct)));
  }, []);

  return (
    <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-12">
      <GuideCallout id="stain" />
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-bold">{t("stainTitle")}</h2>
        <p className="mt-2 text-[var(--muted)]">{t("stainSub")}</p>
      </div>
      <div
        ref={box}
        className="relative aspect-[16/10] w-full touch-none overflow-hidden rounded-card select-none"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) update(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-label={t("stainTitle")}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 3));
          if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 3));
        }}
      >
        <Image
          src={siteConfig.images.folded}
          alt="Clean laundry after"
          fill
          className="object-cover"
          sizes="(max-width: 1120px) 100vw, 1120px"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={siteConfig.images.machines}
            alt="Laundry before"
            fill
            className="object-cover brightness-75 saturate-50 contrast-125"
            sizes="(max-width: 1120px) 100vw, 1120px"
          />
        </div>
        <div
          className="absolute inset-y-0 z-10 w-1 bg-white shadow-lg"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-800 shadow-md">
            ↔
          </div>
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white">
          {t("stainBefore")}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white">
          {t("stainAfter")}
        </span>
      </div>
    </section>
  );
}
