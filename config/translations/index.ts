import { en, type Dictionary, type DictKey } from "./en";
import { es } from "./es";

export type Lang = "en" | "es";

export const dictionaries: Record<Lang, Dictionary> = { en, es };

export type { Dictionary, DictKey };
export { en, es };
