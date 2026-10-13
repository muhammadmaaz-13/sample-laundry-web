"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import type { LeadService, MainCta } from "@/config/siteConfig";
import { accentSwatches } from "@/config/themes";
import { useDemoStore } from "@/store/useDemoStore";
import { useT } from "@/lib/i18n";
import { contrastText } from "@/lib/contrast";
import { trackNameTypedDebounced } from "@/lib/track";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

const leads: {
  id: LeadService;
  labelKey: "catWashFold" | "catDryClean" | "catIroning" | "catCommercial";
}[] = [
  { id: "loan", labelKey: "catWashFold" },
  { id: "apostille", labelKey: "catDryClean" },
  { id: "estate", labelKey: "catIroning" },
  { id: "business", labelKey: "catCommercial" },
];

const ctas: { id: MainCta; labelKey: "navBook" | "navCall" | "navQuote" }[] = [
  { id: "book", labelKey: "navBook" },
  { id: "call", labelKey: "navCall" },
  { id: "quote", labelKey: "navQuote" },
];

export function CustomizeDrawer() {
  const { t } = useT();
  const open = useDemoStore((s) => s.drawerOpen);
  const setDrawerOpen = useDemoStore((s) => s.setDrawerOpen);
  const name = useDemoStore((s) => s.name);
  const city = useDemoStore((s) => s.city);
  const tagline = useDemoStore((s) => s.tagline);
  const lead = useDemoStore((s) => s.lead);
  const mainCta = useDemoStore((s) => s.mainCta);
  const accent = useDemoStore((s) => s.accent);
  const setName = useDemoStore((s) => s.setName);
  const setCity = useDemoStore((s) => s.setCity);
  const setTagline = useDemoStore((s) => s.setTagline);
  const setLead = useDemoStore((s) => s.setLead);
  const setMainCta = useDemoStore((s) => s.setMainCta);
  const setAccent = useDemoStore((s) => s.setAccent);
  const setSendDesignOpen = useDemoStore((s) => s.setSendDesignOpen);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setDrawerOpen]);

  if (process.env.NEXT_PUBLIC_DEMO === "false") return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[95] bg-black/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[100] flex w-full max-w-md flex-col bg-[#121218] text-white shadow-2xl sm:w-[420px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            role="dialog"
            aria-label={t("demoDrawerTitle")}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="text-lg font-bold">{t("demoDrawerTitle")}</h2>
              <button
                type="button"
                className="focus-ring min-h-11 min-w-11 rounded-full"
                onClick={() => setDrawerOpen(false)}
                aria-label={t("close")}
              >
                <X className="mx-auto h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              <Field
                label={t("demoName")}
                value={name}
                onChange={(v) => {
                  setName(v);
                  trackNameTypedDebounced(v);
                }}
              />
              <Field label={t("demoCity")} value={city} onChange={setCity} />
              <Field
                label={t("demoTagline")}
                value={tagline}
                onChange={setTagline}
              />

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-white/60">
                  {t("demoLead")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {leads.map((l) => (
                    <Chip
                      key={l.id}
                      active={lead === l.id}
                      onClick={() => setLead(l.id)}
                    >
                      {t(l.labelKey)}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-white/60">
                  {t("demoMainCta")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {ctas.map((c) => (
                    <Chip
                      key={c.id}
                      active={mainCta === c.id}
                      onClick={() => setMainCta(c.id)}
                    >
                      {t(c.labelKey)}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-white/60">
                  {t("demoAccent")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Chip active={accent === null} onClick={() => setAccent(null)}>
                    {t("demoAccentDefault")}
                  </Chip>
                  {accentSwatches.map((sw) => (
                    <button
                      key={sw}
                      type="button"
                      aria-label={sw}
                      onClick={() => setAccent(sw)}
                      className={cn(
                        "focus-ring min-h-11 min-w-11 rounded-full border-2",
                        accent === sw ? "border-white" : "border-transparent"
                      )}
                      style={{ background: sw, color: contrastText(sw) }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-5">
              <Button
                className="w-full"
                onClick={() => {
                  setDrawerOpen(false);
                  setSendDesignOpen(true);
                }}
              >
                {t("demoSendDesign")}
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-white/60">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus-ring min-h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white outline-none focus:border-[#FACC15]"
      />
    </label>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "focus-ring min-h-11 rounded-full px-4 text-sm font-semibold",
        active
          ? "bg-[#FACC15] text-[#0B0B0F]"
          : "border border-white/20 text-white/80 hover:bg-white/5"
      )}
    >
      {children}
    </button>
  );
}
