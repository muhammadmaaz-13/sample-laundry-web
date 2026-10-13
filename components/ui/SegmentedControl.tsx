"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

type Props<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
  layoutId?: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  layoutId = "segment-pill",
}: Props<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        "glass flex flex-wrap gap-1 rounded-full p-1.5",
        className
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "focus-ring relative z-0 min-h-11 flex-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              active ? "text-white" : "text-[var(--muted)] hover:text-[var(--text)]"
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 -z-10 rounded-full bg-[var(--primary)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
