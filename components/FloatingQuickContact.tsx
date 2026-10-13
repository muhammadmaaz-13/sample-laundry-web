"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin, MessageCircle, Phone, Plus } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { useSiteConfig } from "@/lib/useSiteConfig";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function FloatingQuickContact() {
  const open = useAppStore((s) => s.quickContactOpen);
  const setOpen = useAppStore((s) => s.setQuickContactOpen);
  const cfg = useSiteConfig();
  const { t } = useT();

  const actions = [
    {
      id: "call",
      href: cfg.phoneHref,
      icon: Phone,
      label: t("phoneLabel"),
    },
    {
      id: "wa",
      href: cfg.socials.whatsapp,
      icon: MessageCircle,
      label: "WhatsApp",
    },
    {
      id: "branch",
      href: "/contact",
      icon: MapPin,
      label: t("findBranch"),
    },
  ];

  return (
    <div className="no-print fixed bottom-5 right-4 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open &&
          actions.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 360, damping: 24 }}
            >
              <Link
                href={a.href}
                className="glass focus-ring flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold shadow-lg"
              >
                <a.icon className="h-4 w-4 text-[var(--primary)]" />
                {a.label}
              </Link>
            </motion.div>
          ))}
      </AnimatePresence>
      <motion.button
        type="button"
        aria-expanded={open}
        aria-label="Quick contact"
        onClick={() => setOpen(!open)}
        className={cn(
          "focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-xl"
        )}
        whileTap={{ scale: 0.94 }}
        animate={{ rotate: open ? 45 : 0 }}
      >
        <Plus className="h-6 w-6" />
      </motion.button>
    </div>
  );
}
