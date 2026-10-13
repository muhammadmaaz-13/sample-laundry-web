"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  className?: string;
};

export function IOSToggle({ checked, onChange, label, className }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "focus-ring relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors duration-300",
        checked ? "bg-[var(--primary)]" : "bg-slate-300 dark:bg-slate-600",
        className
      )}
    >
      <motion.span
        className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-md"
        animate={{ x: checked ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}
