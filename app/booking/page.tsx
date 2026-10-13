import type { Metadata } from "next";
import { BookingPageView } from "@/components/booking/BookingPageView";

export const metadata: Metadata = {
  title: "Schedule Appointment",
};

export default function BookingPage() {
  return <BookingPageView />;
}
