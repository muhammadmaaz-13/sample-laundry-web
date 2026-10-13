"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { GuideCallout } from "@/components/demo/GuideCallout";
import { useT } from "@/lib/i18n";
import type { DictKey } from "@/config/translations";

export function Testimonials() {
  const { t } = useT();
  const [i, setI] = useState(0);
  const list = siteConfig.testimonials;

  useEffect(() => {
    const tmr = setInterval(() => setI((x) => (x + 1) % list.length), 4500);
    return () => clearInterval(tmr);
  }, [list.length]);

  const item = list[i];

  return (
    <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-12">
      <GuideCallout id="testimonials" />
      <div className="mb-8 text-center">
        <h2 className="font-heading text-3xl font-bold">{t("testimonialsTitle")}</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">{t("testimonialsSub")}</p>
        <span className="mt-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
          {t("testimonialsSample")}
        </span>
      </div>
      <div className="relative mx-auto min-h-[200px] max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass rounded-card p-8 text-center"
          >
            <div className="mb-3 flex justify-center gap-1">
              {Array.from({ length: item.rating }).map((_, n) => (
                <Star key={n} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-lg leading-relaxed">
              “{t(item.textKey as DictKey)}”
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold">
              {item.name}
              {item.verified && (
                <span className="inline-flex items-center gap-1 text-[var(--primary)]">
                  <BadgeCheck className="h-4 w-4" />
                  {t("verified")}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-4 flex justify-center gap-2">
          {list.map((x, n) => (
            <button
              key={x.id}
              type="button"
              aria-label={`Review ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-2.5 w-2.5 rounded-full ${n === i ? "bg-[var(--primary)]" : "bg-slate-300 dark:bg-slate-600"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
