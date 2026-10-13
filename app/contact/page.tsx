import type { Metadata } from "next";
import { ContactView } from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Locations & Contact",
};

export default function ContactPage() {
  return <ContactView />;
}
