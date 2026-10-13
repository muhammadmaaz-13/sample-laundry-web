import type { Metadata } from "next";
import { BookingPageView } from "@/components/booking/BookingPageView";

export const metadata: Metadata = {
  title: "Schedule Pickup",
};

export default function BookingPage() {
  return <BookingPageView />;
}
