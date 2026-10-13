"use client";

import { cn } from "@/lib/cn";

type Props = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
  unit?: string;
  className?: string;
};

export function Slider({
  label,
  value,
  min = 0,
  max = 20,
  step = 1,
  onChange,
  unit,
  className,
}: Props) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-[var(--text)]">{label}</span>
        <span className="font-bold text-[var(--primary)]">
          {value}
          {unit ? ` ${unit}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[var(--primary)] dark:bg-slate-700"
        style={{
          background: `linear-gradient(to right, var(--primary) ${pct}%, rgb(226 232 240) ${pct}%)`,
        }}
      />
    </div>
  );
}
