"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Mode = "light" | "dark";

export interface BookingPrefill {
  kg?: number;
  suits?: number;
  comforters?: number;
  services?: string[];
  total?: number;
}

interface AppState {
  mode: Mode;
  bookingOpen: boolean;
  bookingPrefill: BookingPrefill | null;
  trackerOpen: boolean;
  trackerCode: string;
  quickContactOpen: boolean;
  installBannerDismissed: boolean;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
  openTracker: (code?: string) => void;
  setQuickContactOpen: (open: boolean) => void;
  dismissInstallBanner: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      mode: "light",
      bookingOpen: false,
      bookingPrefill: null,
      trackerOpen: false,
      trackerCode: "",
      quickContactOpen: false,
      installBannerDismissed: false,
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set({ mode: get().mode === "light" ? "dark" : "light" }),
      openBooking: (prefill) =>
        set({ bookingOpen: true, bookingPrefill: prefill ?? null }),
      closeBooking: () => set({ bookingOpen: false }),
      openTracker: (code) =>
        set({ trackerOpen: true, trackerCode: code ?? "CLEAN123" }),
      setQuickContactOpen: (open) => set({ quickContactOpen: open }),
      dismissInstallBanner: () => set({ installBannerDismissed: true }),
    }),
    {
      name: "laundry-app",
      partialize: (s) => ({
        mode: s.mode,
        installBannerDismissed: s.installBannerDismissed,
      }),
    }
  )
);
