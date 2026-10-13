"use client";

import { useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { Button } from "@/components/ui/Button";
import { themes } from "@/config/themes";
import { useDemoStore } from "@/store/useDemoStore";
import { useT } from "@/lib/i18n";
import { track } from "@/lib/track";

export function SendDesignSummary() {
  const { t, lang } = useT();
  const open = useDemoStore((s) => s.sendDesignOpen);
  const setOpen = useDemoStore((s) => s.setSendDesignOpen);
  const themeIndex = useDemoStore((s) => s.themeIndex);
  const lead = useDemoStore((s) => s.lead);
  const mainCta = useDemoStore((s) => s.mainCta);
  const accent = useDemoStore((s) => s.accent);
  const name = useDemoStore((s) => s.name);

  const [phone, setPhone] = useState("");
  const [contactName, setContactName] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const theme = themes[themeIndex];
  const digits = phone.replace(/\D/g, "");

  const submit = () => {
    if (honeypot) return;
    if (digits.length < 10) {
      setError(t("formPhoneError"));
      return;
    }
    setError("");
    setDone(true);
    track("design_submitted", {
      theme: theme.id,
      lead,
      mainCta,
      accent: accent ?? "default",
      lang,
    });
  };

  return (
    <BottomSheet
      open={open}
      onClose={() => {
        setOpen(false);
        setDone(false);
      }}
      title={t("demoSummaryTitle")}
    >
      {done ? (
        <p className="py-8 text-center text-lg font-semibold text-[var(--primary)]">
          {t("demoSummaryThanks")}
        </p>
      ) : (
        <div className="space-y-4">
          <ul className="glass rounded-card space-y-1 p-4 text-sm">
            <li>
              <strong>{lang === "es" ? theme.nameEs : theme.name}</strong>
            </li>
            <li>
              {lead} · {mainCta}
            </li>
            <li>
              {lang.toUpperCase()}
              {accent ? ` · ${accent}` : ""}
            </li>
            <li>{name}</li>
          </ul>
          <FloatingInput
            label={t("demoSummaryName")}
            value={contactName}
            onChange={setContactName}
          />
          <FloatingInput
            label={t("demoSummaryPhone")}
            value={phone}
            onChange={setPhone}
            type="tel"
            error={error}
          />
          {/* honeypot */}
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            aria-hidden
          />
          <Button className="w-full" onClick={submit}>
            {t("demoSummarySubmit")}
          </Button>
        </div>
      )}
    </BottomSheet>
  );
}
