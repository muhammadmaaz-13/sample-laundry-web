"use client";

import Link from "next/link";
import { Globe, MessageCircle, Share2 } from "lucide-react";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { GuideCallout } from "@/components/demo/GuideCallout";
import { useT } from "@/lib/i18n";
import { useSiteConfig } from "@/lib/useSiteConfig";

export function Footer() {
  const { t } = useT();
  const cfg = useSiteConfig();

  return (
    <footer className="mt-20 border-t border-[var(--glass-border)]">
      <GuideCallout id="footer" />
      <div className="mx-auto grid w-[min(1120px,calc(100%-2rem))] gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-heading text-xl font-bold">{cfg.businessName}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{cfg.tagline}</p>
          <p className="mt-4 text-sm font-medium">{t("footerServing")}</p>
          <p className="mt-2 text-xs text-[var(--muted)]">{t("footerLegal")}</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wide">
            {t("footerContact")}
          </p>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li>
              <a className="focus-ring hover:text-[var(--primary)]" href={cfg.phoneHref}>
                {cfg.phone}
              </a>
            </li>
            <li>
              <a className="focus-ring hover:text-[var(--primary)]" href={cfg.emailHref}>
                {cfg.email}
              </a>
            </li>
            <li>{cfg.address}</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wide">
            {t("footerHours")}
          </p>
          <p className="text-sm text-[var(--muted)]">{cfg.hours}</p>
          <p className="mb-2 mt-6 text-sm font-bold uppercase tracking-wide">
            {t("footerFollow")}
          </p>
          <div className="flex gap-2">
            <a
              href={cfg.socials.instagram}
              className="focus-ring glass flex min-h-11 min-w-11 items-center justify-center rounded-full"
              aria-label="Instagram"
            >
              <Share2 className="h-4 w-4" />
            </a>
            <a
              href={cfg.socials.facebook}
              className="focus-ring glass flex min-h-11 min-w-11 items-center justify-center rounded-full"
              aria-label="Facebook"
            >
              <Globe className="h-4 w-4" />
            </a>
            <a
              href={cfg.socials.whatsapp}
              className="focus-ring glass flex min-h-11 min-w-11 items-center justify-center rounded-full"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-6">
            <LangSwitch />
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--glass-border)] py-5 text-center text-xs text-[var(--muted)]">
        {t("footerRights")} ·{" "}
        <Link href="/booking" className="underline">
          {t("navBook")}
        </Link>
      </div>
    </footer>
  );
}
