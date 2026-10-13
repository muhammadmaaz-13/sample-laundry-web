"use client";

import { BookingWizard } from "@/components/booking/BookingWizard";
import { GlassCard } from "@/components/ui/GlassCard";

export function BookingPageView() {
  return (
    <div className="mx-auto w-[min(720px,calc(100%-2rem))] py-10">
      <GlassCard>
        <BookingWizard />
      </GlassCard>
    </div>
  );
}
