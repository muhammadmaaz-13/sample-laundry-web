export type ThemeId = "aqua" | "mint" | "midnight" | "warm";

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  nameEs: string;
  description: string;
}

/** CSS ids stay stable; display names match notary brand themes. */
export const themes: ThemeDefinition[] = [
  {
    id: "aqua",
    name: "Corporate",
    nameEs: "Corporativo",
    description: "Crisp navy glass for trusted professionals",
  },
  {
    id: "mint",
    name: "Friendly",
    nameEs: "Amigable",
    description: "Warm teal with approachable soft shapes",
  },
  {
    id: "midnight",
    name: "Executive",
    nameEs: "Ejecutivo",
    description: "Champagne gold on cinematic dark",
  },
  {
    id: "warm",
    name: "Fresh",
    nameEs: "Fresco",
    description: "Sage green with open, modern curves",
  },
];

export const accentSwatches = [
  "#1d6fd1",
  "#0e8a82",
  "#c9a24b",
  "#4f9a6a",
  "#d1543f",
  "#7c4dcc",
] as const;

export type AccentSwatch = (typeof accentSwatches)[number];
