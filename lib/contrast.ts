/** Relative luminance of a hex color (0–1). */
export function luminance(hex: string): number {
  const c = hex.replace("#", "");
  const full =
    c.length === 3
      ? c
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : c;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  const lin = (v: number) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** Returns black or white text for readable contrast on a hex background. */
export function contrastText(hex: string): "#0B0B0F" | "#FFFFFF" {
  return luminance(hex) > 0.45 ? "#0B0B0F" : "#FFFFFF";
}
