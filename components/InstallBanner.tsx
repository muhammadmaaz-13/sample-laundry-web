"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Share, X } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}

export function InstallBanner() {
  const { t } = useT();
  const dismissed = useAppStore((s) => s.installBannerDismissed);
  const dismiss = useAppStore((s) => s.dismissInstallBanner);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua);
    setIsIos(ios);
    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", onBip);
    if (ios && !(window.navigator as Navigator & { standalone?: boolean }).standalone) {
      const tmr = setTimeout(() => setShow(true), 2500);
      return () => {
        clearTimeout(tmr);
        window.removeEventListener("beforeinstallprompt", onBip);
      };
    }
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="no-print glass fixed inset-x-3 bottom-20 z-40 rounded-2xl p-4 shadow-2xl sm:inset-x-auto sm:right-4 sm:w-96"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
              <Download className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold">{t("installTitle")}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{t("installBody")}</p>
              {isIos ? (
                <p className="mt-2 flex items-center gap-1 text-xs text-[var(--muted)]">
                  <Share className="h-3.5 w-3.5" />
                  {t("installIos")}
                </p>
              ) : (
                <Button
                  className="mt-3"
                  onClick={async () => {
                    await deferred?.prompt();
                    dismiss();
                    setShow(false);
                  }}
                >
                  {t("installAndroid")}
                </Button>
              )}
              <button
                type="button"
                className="mt-2 text-xs text-[var(--muted)] underline"
                onClick={() => {
                  dismiss();
                  setShow(false);
                }}
              >
                {t("installDismiss")}
              </button>
            </div>
            <button
              type="button"
              aria-label={t("close")}
              className="focus-ring min-h-9 min-w-9 rounded-full"
              onClick={() => {
                dismiss();
                setShow(false);
              }}
            >
              <X className="mx-auto h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
