"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = HTMLMotionProps<"div"> & {
  tilt?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function GlassCard({
  tilt = false,
  className,
  children,
  ...rest
}: Props) {
  return (
    <motion.div
      className={cn(
        "glass rounded-card p-5 md:p-6",
        tilt && "hover:scale-[1.02] active:scale-[0.98] transition-transform",
        className
      )}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      viewport={{ once: true, margin: "-40px" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
