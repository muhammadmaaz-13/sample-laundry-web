"use client";

import { BottomSheet } from "@/components/ui/BottomSheet";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { useAppStore } from "@/store/useAppStore";
import { useT } from "@/lib/i18n";

export function BookingModal() {
  const open = useAppStore((s) => s.bookingOpen);
  const close = useAppStore((s) => s.closeBooking);
  const prefill = useAppStore((s) => s.bookingPrefill);
  const { t } = useT();

  return (
    <BottomSheet open={open} onClose={close} title={t("bookingTitle")} wide>
      <BookingWizard prefill={prefill} />
    </BottomSheet>
  );
}
