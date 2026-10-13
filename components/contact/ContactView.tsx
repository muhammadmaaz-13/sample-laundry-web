"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { GlassCard } from "@/components/ui/GlassCard";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { Button } from "@/components/ui/Button";
import { GuideCallout } from "@/components/demo/GuideCallout";
import { useT } from "@/lib/i18n";
import { useSiteConfig } from "@/lib/useSiteConfig";
import { track } from "@/lib/track";
import type { DictKey } from "@/config/translations";
import { cn } from "@/lib/cn";

export function ContactView() {
  const { t } = useT();
  const cfg = useSiteConfig();
  const [branchId, setBranchId] = useState<string>(siteConfig.branches[0].id);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const branches = useMemo(() => {
    const q = search.toLowerCase();
    return siteConfig.branches.filter(
      (b) =>
        !q ||
        t(b.nameKey as DictKey).toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q)
    );
  }, [search, t]);

  const branch =
    siteConfig.branches.find((b) => b.id === branchId) ?? siteConfig.branches[0];

  const submit = () => {
    if (honeypot) return;
    if (phone.replace(/\D/g, "").length < 10) {
      setError(t("formPhoneError"));
      return;
    }
    setError("");
    setDone(true);
    track("quote_submitted", { branch: branchId });
  };

  return (
    <div className="mx-auto w-[min(1120px,calc(100%-2rem))] py-10">
      <GuideCallout id="contact" />
      <div className="mb-8 text-center">
        <h1 className="font-heading text-4xl font-bold">{t("contactTitle")}</h1>
        <p className="mt-2 text-[var(--muted)]">{t("contactSub")}</p>
        <p className="mt-2 text-sm font-medium">{t("footerServing")}</p>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold">{t("findBranch")}</label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("selectBranch")}
          className="focus-ring glass mb-3 min-h-11 w-full rounded-full px-4 text-sm outline-none"
        />
        <div className="flex flex-wrap gap-2">
          {branches.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBranchId(b.id)}
              className={cn(
                "focus-ring min-h-11 rounded-full px-4 text-sm font-semibold",
                branchId === b.id
                  ? "bg-[var(--primary)] text-white"
                  : "glass"
              )}
            >
              {t(b.nameKey as DictKey)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <GlassCard>
          <Phone className="mb-2 h-5 w-5 text-[var(--primary)]" />
          <p className="text-xs font-bold uppercase text-[var(--muted)]">
            {t("phoneLabel")}
          </p>
          <a href={cfg.phoneHref} className="focus-ring font-semibold hover:text-[var(--primary)]">
            {cfg.phone}
          </a>
        </GlassCard>
        <GlassCard>
          <Mail className="mb-2 h-5 w-5 text-[var(--primary)]" />
          <p className="text-xs font-bold uppercase text-[var(--muted)]">
            {t("emailLabel")}
          </p>
          <a href={cfg.emailHref} className="focus-ring font-semibold hover:text-[var(--primary)]">
            {cfg.email}
          </a>
        </GlassCard>
        <GlassCard>
          <MapPin className="mb-2 h-5 w-5 text-[var(--primary)]" />
          <p className="text-xs font-bold uppercase text-[var(--muted)]">
            {t(branch.nameKey as DictKey)}
          </p>
          <p className="text-sm">{branch.address}</p>
          <p className="text-xs text-[var(--muted)]">{branch.hours}</p>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="relative min-h-[280px] overflow-hidden rounded-card border border-[var(--glass-border)] bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(-45deg,#e2e8f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e2e8f0_75%),linear-gradient(-45deg,transparent_75%,#e2e8f0_75%)] bg-[length:24px_24px] bg-[position:0_0,0_12px,12px_-12px,-12px_0] dark:bg-[linear-gradient(45deg,#1e293b_25%,transparent_25%),linear-gradient(-45deg,#1e293b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1e293b_75%),linear-gradient(-45deg,transparent_75%,#1e293b_75%)]">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-lg"
            >
              <MapPin className="h-6 w-6" />
            </motion.div>
            <p className="mt-3 glass rounded-full px-3 py-1 text-xs font-semibold">
              {t("mapPlaceholder")} · {t(branch.nameKey as DictKey)}
            </p>
          </div>
        </div>

        <GlassCard id="quote">
          {done ? (
            <motion.p
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-10 text-center text-lg font-semibold text-[var(--primary)]"
            >
              {t("formThanks")}
            </motion.p>
          ) : (
            <div className="space-y-3">
              <FloatingInput label={t("formName")} value={name} onChange={setName} />
              <FloatingInput
                label={t("formPhone")}
                value={phone}
                onChange={setPhone}
                type="tel"
                error={error}
              />
              <FloatingInput
                label={t("formMessage")}
                value={message}
                onChange={setMessage}
                textarea
              />
              <input
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute -left-[9999px] opacity-0"
                aria-hidden
              />
              <Button className="w-full" onClick={submit}>
                {t("formSend")}
              </Button>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
