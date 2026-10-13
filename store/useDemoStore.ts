"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LeadService, MainCta } from "@/config/siteConfig";
import { siteConfig } from "@/config/siteConfig";
import { themes } from "@/config/themes";
import type { Lang } from "@/config/translations";

interface DemoState {
  themeIndex: number;
  lang: Lang;
  name: string;
  city: string;
  tagline: string;
  lead: LeadService;
  mainCta: MainCta;
  accent: string | null;
  guide: boolean;
  demoVisible: boolean;
  firstThemePress: boolean;
  drawerOpen: boolean;
  sendDesignOpen: boolean;
  setThemeIndex: (i: number) => void;
  nextTheme: () => void;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  setName: (name: string) => void;
  setCity: (city: string) => void;
  setTagline: (tagline: string) => void;
  setLead: (lead: LeadService) => void;
  setMainCta: (cta: MainCta) => void;
  setAccent: (accent: string | null) => void;
  setGuide: (guide: boolean) => void;
  toggleGuide: () => void;
  setDemoVisible: (v: boolean) => void;
  setDrawerOpen: (open: boolean) => void;
  setSendDesignOpen: (open: boolean) => void;
  markThemePressed: () => void;
}

const d = siteConfig.defaults;

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      themeIndex: d.themeIndex,
      lang: d.lang,
      name: siteConfig.businessName,
      city: siteConfig.city,
      tagline: siteConfig.tagline,
      lead: d.lead,
      mainCta: d.mainCta,
      accent: null,
      guide: false,
      demoVisible: true,
      firstThemePress: false,
      drawerOpen: false,
      sendDesignOpen: false,
      setThemeIndex: (i) =>
        set({
          themeIndex: ((i % themes.length) + themes.length) % themes.length,
          accent: null,
        }),
      nextTheme: () => {
        const next = (get().themeIndex + 1) % themes.length;
        set({ themeIndex: next, accent: null, firstThemePress: true });
      },
      setLang: (lang) => set({ lang }),
      toggleLang: () => set({ lang: get().lang === "en" ? "es" : "en" }),
      setName: (name) => set({ name }),
      setCity: (city) => set({ city }),
      setTagline: (tagline) => set({ tagline }),
      setLead: (lead) => set({ lead }),
      setMainCta: (mainCta) => set({ mainCta }),
      setAccent: (accent) => set({ accent }),
      setGuide: (guide) => set({ guide }),
      toggleGuide: () => set({ guide: !get().guide }),
      setDemoVisible: (demoVisible) => set({ demoVisible }),
      setDrawerOpen: (drawerOpen) => set({ drawerOpen }),
      setSendDesignOpen: (sendDesignOpen) => set({ sendDesignOpen }),
      markThemePressed: () => set({ firstThemePress: true }),
    }),
    {
      name: "laundry-demo",
      partialize: (s) => ({
        themeIndex: s.themeIndex,
        lang: s.lang,
        name: s.name,
        city: s.city,
        tagline: s.tagline,
        lead: s.lead,
        mainCta: s.mainCta,
        accent: s.accent,
        demoVisible: s.demoVisible,
        firstThemePress: s.firstThemePress,
      }),
    }
  )
);
