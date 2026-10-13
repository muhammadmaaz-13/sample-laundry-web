"use client";

import { useMemo } from "react";
import { siteConfig, type LeadService, type MainCta } from "@/config/siteConfig";
import { themes } from "@/config/themes";
import { useDemoStore } from "@/store/useDemoStore";
import { useAppStore } from "@/store/useAppStore";

export function useSiteConfig() {
  const name = useDemoStore((s) => s.name);
  const city = useDemoStore((s) => s.city);
  const tagline = useDemoStore((s) => s.tagline);
  const lead = useDemoStore((s) => s.lead);
  const mainCta = useDemoStore((s) => s.mainCta);
  const accent = useDemoStore((s) => s.accent);
  const themeIndex = useDemoStore((s) => s.themeIndex);
  const lang = useDemoStore((s) => s.lang);
  const mode = useAppStore((s) => s.mode);

  return useMemo(() => {
    const theme = themes[themeIndex] ?? themes[0];
    const orderedServices = [...siteConfig.services].sort((a, b) => {
      if (a.id === lead) return -1;
      if (b.id === lead) return 1;
      return 0;
    });

    const primaryCta: MainCta = mainCta;
    const alternateCta: MainCta =
      primaryCta === "quote" ? "call" : "quote";

    return {
      ...siteConfig,
      businessName: name || siteConfig.businessName,
      city: city || siteConfig.city,
      tagline: tagline || siteConfig.tagline,
      lead: lead as LeadService,
      mainCta: primaryCta,
      alternateCta,
      accent,
      theme,
      themeIndex,
      lang,
      mode,
      orderedServices,
      phoneHref: `tel:${siteConfig.phone.replace(/[^\d+]/g, "") || "+15550000000"}`,
      emailHref: `mailto:${siteConfig.email}`,
    };
  }, [name, city, tagline, lead, mainCta, accent, themeIndex, lang, mode]);
}
