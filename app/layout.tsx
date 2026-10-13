import type { Metadata, Viewport } from "next";
import {
  DM_Sans,
  Inter,
  Nunito,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { ThemeSync } from "@/components/providers/ThemeSync";
import { DemoToolbar } from "@/components/demo/DemoToolbar";
import { CustomizeDrawer } from "@/components/demo/CustomizeDrawer";
import { SendDesignSummary } from "@/components/demo/SendDesignSummary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ThemedBackground } from "@/components/layout/ThemedBackground";
import { BookingModal } from "@/components/booking/BookingModal";
import { FloatingQuickContact } from "@/components/FloatingQuickContact";
import { InstallBanner } from "@/components/InstallBanner";
import { ServiceWorkerRegister } from "@/components/providers/ServiceWorkerRegister";
import { siteConfig } from "@/config/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  fallback: ["ui-rounded", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.businessName} | Notary Services`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.tagline,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.businessName,
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeBoot = `
(function(){
  try {
    var app = JSON.parse(localStorage.getItem('notary-app')||'{}');
    var demo = JSON.parse(localStorage.getItem('notary-demo')||'{}');
    var stateApp = app.state || app;
    var stateDemo = demo.state || demo;
    var mode = stateApp.mode || 'light';
    var themes = ['aqua','mint','midnight','warm'];
    var idx = typeof stateDemo.themeIndex === 'number' ? stateDemo.themeIndex : 0;
    var theme = themes[idx] || 'aqua';
    var root = document.documentElement;
    root.dataset.theme = theme;
    if (mode === 'dark') root.classList.add('dark');
    if (stateDemo.accent) {
      root.dataset.accent = 'true';
      root.style.setProperty('--accent-override', stateDemo.accent);
      root.style.setProperty('--primary', stateDemo.accent);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body
        className={`${inter.variable} ${dmSans.variable} ${playfair.variable} ${nunito.variable} antialiased`}
      >
        <ThemeSync>
          <ThemedBackground />
          <DemoToolbar />
          <CustomizeDrawer />
          <SendDesignSummary />
          <Navbar />
          <main className="min-h-[60vh]">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <BookingModal />
          <FloatingQuickContact />
          <InstallBanner />
          <ServiceWorkerRegister />
        </ThemeSync>
      </body>
    </html>
  );
}
