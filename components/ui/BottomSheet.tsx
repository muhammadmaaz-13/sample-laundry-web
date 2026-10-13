"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
};

export function BottomSheet({
  open,
  onClose,
  title,
  children,
  className,
  wide,
}: Props) {
  const { t } = useT();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-label={title}
            className={cn(
              "fixed inset-x-0 bottom-0 z-[70] max-h-[92dvh] overflow-y-auto rounded-t-3xl glass p-5 md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[85vh] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-card md:p-6",
              wide ? "md:w-[min(720px,92vw)]" : "md:w-[min(520px,92vw)]",
              className
            )}
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="mx-auto h-1 w-10 rounded-full bg-slate-300 md:hidden dark:bg-slate-600" />
              {title && (
                <h3 className="font-heading text-lg font-bold">{title}</h3>
              )}
              <button
                type="button"
                aria-label={t("close")}
                onClick={onClose}
                className="focus-ring ml-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
