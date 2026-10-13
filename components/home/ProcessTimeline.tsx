"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, CheckCircle2, PenLine, PhoneCall } from "lucide-react";
import { GuideCallout } from "@/components/demo/GuideCallout";
import { useT } from "@/lib/i18n";

const steps = [
  { icon: PhoneCall, title: "step1Title", desc: "step1Desc" },
  { icon: Calendar, title: "step2Title", desc: "step2Desc" },
  { icon: PenLine, title: "step3Title", desc: "step3Desc" },
  { icon: CheckCircle2, title: "step4Title", desc: "step4Desc" },
] as const;

export function ProcessTimeline() {
  const { t } = useT();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-12" ref={ref}>
      <GuideCallout id="process" />
      <div className="mb-10 text-center">
        <h2 className="font-heading text-3xl font-bold">{t("processTitle")}</h2>
        <p className="mt-2 text-[var(--muted)]">{t("processSub")}</p>
      </div>
      <div className="relative">
        <div className="absolute left-0 right-0 top-8 hidden h-1 bg-slate-200 md:block dark:bg-slate-700">
          <motion.div
            className="h-full origin-left bg-[var(--primary)]"
            style={{ scaleX }}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass relative rounded-card p-5 text-center"
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                <s.icon className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-[var(--primary)]">0{i + 1}</p>
              <h3 className="font-heading mt-1 text-lg font-bold">{t(s.title)}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{t(s.desc)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
