import type { Metadata } from "next";
import { AboutView } from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return <AboutView />;
}
