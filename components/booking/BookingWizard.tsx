"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Check, FileSignature, Stamp, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { GuideCallout } from "@/components/demo/GuideCallout";
import { useT } from "@/lib/i18n";
import { useSiteConfig } from "@/lib/useSiteConfig";
import { useAppStore, type BookingPrefill } from "@/store/useAppStore";
import { track } from "@/lib/track";
import { cn } from "@/lib/cn";

const svcOptions = [
  { id: "loan", icon: FileSignature, label: "bookingSvcWash" as const },
  { id: "apostille", icon: Stamp, label: "bookingSvcDry" as const },
  { id: "estate", icon: Building2, label: "bookingSvcIron" as const },
  { id: "mobile", icon: Truck, label: "bookingSvcBedding" as const },
];

const slots = ["bookingMorning", "bookingAfternoon", "bookingEvening"] as const;

type Props = {
  prefill?: BookingPrefill | null;
  onTrack?: (code: string) => void;
};

export function BookingWizard({ prefill, onTrack }: Props) {
  const { t } = useT();
  const cfg = useSiteConfig();
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<string[]>(
    prefill?.services ?? [cfg.lead === "apostille" ? "apostille" : "loan"]
  );
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<string>("bookingMorning");
  const [street, setStreet] = useState("");
  const [apt, setApt] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const openTracker = useAppStore((s) => s.openTracker);

  const toggleSvc = (id: string) => {
    setServices((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  };

  const next = () => {
    if (step === 3) {
      const digits = phone.replace(/\D/g, "");
      if (digits.length < 10) {
        setPhoneError(t("formPhoneError"));
        return;
      }
      setPhoneError("");
      const id = `NT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      setTrackingId(id);
      track("book_clicked", { services: services.join(",") });
    }
    setStep((s) => Math.min(4, s + 1));
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <GuideCallout id="booking" />
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold">{t("bookingTitle")}</h2>
        <p className="text-sm text-[var(--muted)]">{t("bookingSub")}</p>
        {prefill?.total != null && (
          <p className="mt-2 text-sm font-semibold text-[var(--primary)]">
            Est. {cfg.currency}
            {prefill.total.toFixed(2)}
          </p>
        )}
      </div>

      <div className="mb-6 flex gap-1">
        {[0, 1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              n <= step ? "bg-[var(--primary)]" : "bg-slate-200 dark:bg-slate-700"
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {step === 0 && (
            <div className="grid grid-cols-2 gap-3">
              {svcOptions.map((s) => {
                const on = services.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSvc(s.id)}
                    className={cn(
                      "focus-ring glass flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-card p-4",
                      on && "ring-2 ring-[var(--primary)]"
                    )}
                  >
                    <s.icon className="h-6 w-6 text-[var(--primary)]" />
                    <span className="text-sm font-semibold">{t(s.label)}</span>
                    {on && <Check className="h-4 w-4 text-[var(--primary)]" />}
                  </button>
                );
              })}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <FloatingInput
                label="Date"
                type="date"
                value={date}
                onChange={setDate}
              />
              <div className="flex flex-wrap gap-2">
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    className={cn(
                      "focus-ring min-h-11 rounded-full px-4 text-sm font-semibold",
                      slot === s
                        ? "bg-[var(--primary)] text-white"
                        : "glass"
                    )}
                  >
                    {t(s)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <FloatingInput label={t("bookingStreet")} value={street} onChange={setStreet} />
              <FloatingInput label={t("bookingApt")} value={apt} onChange={setApt} />
              <FloatingInput label={t("bookingNotes")} value={notes} onChange={setNotes} textarea />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <FloatingInput label={t("bookingName")} value={name} onChange={setName} />
              <FloatingInput
                label={t("bookingPhone")}
                value={phone}
                onChange={setPhone}
                type="tel"
                error={phoneError}
              />
              <FloatingInput label={t("bookingEmail")} value={email} onChange={setEmail} type="email" />
              <p className="text-xs text-[var(--muted)]">
                {cfg.phone} · {cfg.email}
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="glass rounded-card p-6 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-xl font-bold">{t("bookingSuccess")}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{t("bookingTracking")}</p>
              <p className="mt-1 font-mono text-2xl font-bold text-[var(--primary)]">
                {trackingId}
              </p>
              <p className="mt-4 text-sm">
                {name} · {services.join(", ")} · {slot && t(slot as typeof slots[number])}
              </p>
              <Button
                className="mt-6"
                onClick={() => {
                  onTrack?.("SIGN123");
                  openTracker("SIGN123");
                }}
              >
                {t("bookingTrackIt")}
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {step < 4 && (
        <div className="mt-6 flex justify-between gap-3">
          <Button
            variant="ghost"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            {t("bookingBack")}
          </Button>
          <Button onClick={next}>
            {step === 3 ? t("bookingSubmit") : t("bookingNext")}
          </Button>
        </div>
      )}
    </div>
  );
}
