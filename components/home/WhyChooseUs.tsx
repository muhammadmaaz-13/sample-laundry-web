"use client";

import { Leaf, ShieldCheck, Timer, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { GuideCallout } from "@/components/demo/GuideCallout";
import { useT } from "@/lib/i18n";

const items = [
  { icon: Leaf, title: "whyEco", desc: "whyEcoDesc" },
  { icon: ShieldCheck, title: "whyGuarantee", desc: "whyGuaranteeDesc" },
  { icon: Timer, title: "whyExpress", desc: "whyExpressDesc" },
  { icon: MessageSquare, title: "whySms", desc: "whySmsDesc" },
] as const;

export function WhyChooseUs() {
  const { t } = useT();

  return (
    <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-12">
      <GuideCallout id="why" />
      <div className="mb-10 text-center">
        <h2 className="font-heading text-3xl font-bold">{t("whyTitle")}</h2>
        <p className="mt-2 text-[var(--muted)]">{t("whySub")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{
              rotateX: 4,
              rotateY: -4,
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            style={{ transformPerspective: 800 }}
            className="glass rounded-card p-5"
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary)]/15 text-[var(--primary)]">
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="font-heading font-bold">{t(item.title)}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{t(item.desc)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
