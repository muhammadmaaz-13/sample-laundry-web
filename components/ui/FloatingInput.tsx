"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  textarea?: boolean;
  className?: string;
  name?: string;
  autoComplete?: string;
  required?: boolean;
};

export function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  error,
  textarea,
  className,
  name,
  autoComplete,
  required,
}: Props) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  const fieldClass = cn(
    "peer w-full rounded-card border bg-[var(--surface)] px-4 pb-2.5 pt-6 text-[var(--text)] outline-none transition-colors",
    error
      ? "border-red-400 focus:border-red-500"
      : "border-[var(--glass-border)] focus:border-[var(--primary)]",
    className
  );

  return (
    <div className="relative w-full">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          required={required}
          rows={4}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={fieldClass}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={fieldClass}
        />
      )}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 transition-all duration-200",
          floated
            ? "top-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--primary)]"
            : "top-4 text-sm text-[var(--muted)]"
        )}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
