"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";
import { contrastText } from "@/lib/contrast";
import { useSiteConfig } from "@/lib/useSiteConfig";

type Variant = "primary" | "outline" | "ghost" | "demo";

type Props = Omit<HTMLMotionProps<"button">, "children"> & {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  href?: string;
};

export function Button({
  variant = "primary",
  className,
  children,
  href,
  style,
  ...rest
}: Props) {
  const { accent } = useSiteConfig();
  const accentStyle =
    variant === "primary" && accent
      ? {
          background: accent,
          color: contrastText(accent),
          ["--btn-fg" as string]: contrastText(accent),
        }
      : undefined;

  const classes = cn(
    "focus-ring inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold tracking-tight",
    variant === "primary" && "btn-primary",
    variant === "outline" && "btn-outline",
    variant === "ghost" &&
      "rounded-btn bg-transparent text-[var(--text)] hover:bg-black/5 dark:hover:bg-white/5",
    variant === "demo" &&
      "rounded-full bg-[#FACC15] px-4 py-2 font-bold text-[#0B0B0F]",
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        style={{ ...accentStyle, ...style }}
        whileTap={{ scale: 0.98 }}
        {...(rest as HTMLMotionProps<"a">)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={classes}
      style={{ ...accentStyle, ...style }}
      whileTap={{ scale: 0.98 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
