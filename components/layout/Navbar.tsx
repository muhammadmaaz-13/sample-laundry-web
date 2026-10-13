"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Shirt, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { IOSToggle } from "@/components/ui/IOSToggle";
import { useT } from "@/lib/i18n";
import { useSiteConfig } from "@/lib/useSiteConfig";
import { useAppStore } from "@/store/useAppStore";
import { track } from "@/lib/track";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", key: "navHome" as const },
  { href: "/services", key: "navServices" as const },
  { href: "/about", key: "navAbout" as const },
  { href: "/services#pricing", key: "navPricing" as const },
  { href: "/contact", key: "navLocations" as const },
];

export function Navbar() {
  const { t } = useT();
  const cfg = useSiteConfig();
  const pathname = usePathname();
  const mode = useAppStore((s) => s.mode);
  const setMode = useAppStore((s) => s.setMode);
  const openBooking = useAppStore((s) => s.openBooking);
  const [open, setOpen] = useState(false);

  const ctaLabel =
    cfg.mainCta === "call"
      ? t("navCall")
      : cfg.mainCta === "quote"
        ? t("navQuote")
        : t("navBook");

  const onCta = () => {
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

  return (
    <header className="sticky top-3 z-40 mx-auto w-[min(1120px,calc(100%-1.5rem))]">
      <nav className="glass flex items-center gap-3 rounded-full px-3 py-2 md:px-5">
        <Link
          href="/"
          className="focus-ring flex min-h-11 items-center gap-2 rounded-full px-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)] text-white">
            <Shirt className="h-4 w-4" />
          </span>
          <span className="hidden max-w-[140px] truncate text-sm font-bold text-[var(--secondary)] sm:block">
            {cfg.logoText}
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "focus-ring rounded-full px-3 py-2 text-sm font-medium transition-colors",
                pathname === l.href.split("#")[0]
                  ? "text-[var(--primary)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              )}
            >
              {t(l.key)}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <LangSwitch className="hidden sm:inline-flex" />
          <div className="hidden items-center gap-2 sm:flex" title="Dark mode">
            <IOSToggle
              checked={mode === "dark"}
              onChange={(v) => setMode(v ? "dark" : "light")}
              label="Dark mode"
            />
          </div>
          <Button onClick={onCta} className="hidden sm:inline-flex">
            {ctaLabel}
          </Button>
          <button
            type="button"
            className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-full lg:hidden"
            aria-label={t("openMenu")}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="glass fixed inset-x-3 top-3 z-50 rounded-3xl p-5"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-heading font-bold">{cfg.businessName}</span>
                <button
                  type="button"
                  className="focus-ring min-h-11 min-w-11 rounded-full"
                  onClick={() => setOpen(false)}
                  aria-label={t("close")}
                >
                  <X className="mx-auto h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="focus-ring rounded-2xl px-4 py-3 text-base font-medium hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    {t(l.key)}
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <LangSwitch />
                <IOSToggle
                  checked={mode === "dark"}
                  onChange={(v) => setMode(v ? "dark" : "light")}
                  label="Dark mode"
                />
              </div>
              <Button onClick={onCta} className="mt-4 w-full">
                {ctaLabel}
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
