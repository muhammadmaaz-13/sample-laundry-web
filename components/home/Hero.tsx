"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GuideCallout } from "@/components/demo/GuideCallout";
import { useT } from "@/lib/i18n";
import { useSiteConfig } from "@/lib/useSiteConfig";
import { useAppStore } from "@/store/useAppStore";
import { track } from "@/lib/track";
import type { DictKey } from "@/config/translations";

const headlineKey: Record<string, DictKey> = {
  loan: "heroHeadlineLoan",
  apostille: "heroHeadlineApostille",
  estate: "heroHeadlineEstate",
  mobile: "heroHeadlineMobile",
  business: "heroHeadlineBusiness",
};

export function Hero() {
  const { t, tList } = useT();
  const cfg = useSiteConfig();
  const openBooking = useAppStore((s) => s.openBooking);
  const words = tList("heroTypewriter");
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = words[idx % words.length] ?? "";
    const speed = deleting ? 40 : 70;
    const timer = setTimeout(() => {
      if (!deleting && text === full) {
        setTimeout(() => setDeleting(true), 1200);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setIdx((i) => (i + 1) % words.length);
        return;
      }
      setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, idx, words]);

  const primaryLabel =
    cfg.mainCta === "call"
      ? t("heroCtaCall")
      : cfg.mainCta === "quote"
        ? t("heroCtaQuote")
        : t("heroCtaBook");
  const altLabel =
    cfg.alternateCta === "call" ? t("heroAltCall") : t("heroAltQuote");

  const onPrimary = () => {
    if (cfg.mainCta === "call") {
      window.location.href = cfg.phoneHref;
      return;
    }
    if (cfg.mainCta === "quote") {
      window.location.href = "/contact#quote";
      return;
    }
    track("book_clicked");
    openBooking();
  };

  const onAlt = () => {
    if (cfg.alternateCta === "call") {
      window.location.href = cfg.phoneHref;
    } else {
      window.location.href = "/contact#quote";
    }
  };

  return (
    <section className="relative">
      <GuideCallout id="hero" />
      <div className="hero-inset relative mx-auto mt-4 w-[min(1120px,100%)] overflow-hidden">
        <div className="relative min-h-[70vh] w-full">
          <Image
            src={cfg.images.hero}
            alt="Professional document signing"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
          <div className="relative z-10 flex min-h-[70vh] flex-col justify-center px-5 py-16 md:px-12 md:py-24">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/80"
            >
              {cfg.businessName}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-heading max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl"
            >
              {t(headlineKey[cfg.lead] ?? "heroHeadlineLoan")}
            </motion.h1>
            <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
              {t("heroSub")}
            </p>
            <p className="mt-3 h-7 font-mono text-sm text-white md:text-base">
              <span className="text-white/70">· </span>
              {text}
              <span className="animate-pulse">|</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={onPrimary}>{primaryLabel}</Button>
              <Button
                variant="outline"
                onClick={onAlt}
                className="border-white/50 text-white"
              >
                {altLabel}
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white"
              >
                <Sparkles className="h-4 w-4 text-amber-300" />
                {t("heroWidgetExpress")}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                {t("heroWidgetRating")}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
