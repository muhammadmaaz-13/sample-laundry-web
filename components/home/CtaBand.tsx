"use client";

import { Button } from "@/components/ui/Button";
import { useT } from "@/lib/i18n";
import { useAppStore } from "@/store/useAppStore";
import { track } from "@/lib/track";

export function CtaBand() {
  const { t } = useT();
  const openBooking = useAppStore((s) => s.openBooking);

  return (
    <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-10">
      <div className="relative overflow-hidden rounded-card bg-[var(--primary)] px-6 py-12 text-center text-white md:px-12">
        <h2 className="font-heading text-3xl font-bold">{t("ctaBandTitle")}</h2>
        <p className="mt-2 text-white/85">{t("ctaBandSub")}</p>
        <Button
          className="mt-6 bg-white text-slate-900 hover:bg-white/90"
          style={{ background: "#fff", color: "#0f172a" }}
          onClick={() => {
            track("book_clicked");
            openBooking();
          }}
        >
          {t("navBook")}
        </Button>
      </div>
    </section>
  );
}
