export type ThemeId = "aqua" | "mint" | "midnight" | "warm";

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  nameEs: string;
  description: string;
}

export const themes: ThemeDefinition[] = [
  {
    id: "aqua",
    name: "Aqua iOS",
    nameEs: "Aqua iOS",
    description: "Crisp cyan glass with floating bubbles",
  },
  {
    id: "mint",
    name: "Fresh Mint",
    nameEs: "Menta Fresca",
    description: "Eco emerald with soft organic shapes",
  },
  {
    id: "midnight",
    name: "Midnight Premium",
    nameEs: "Medianoche Premium",
    description: "Champagne gold on cinematic dark",
  },
  {
    id: "warm",
    name: "Warm Friendly",
    nameEs: "Cálido Amigable",
    description: "Coral peach with pill-soft curves",
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
