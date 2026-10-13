"use client";

import { useCallback, useMemo } from "react";
import { dictionaries, type DictKey, type Lang } from "@/config/translations";
import { useDemoStore } from "@/store/useDemoStore";

type Vars = Record<string, string | number | undefined>;

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`
  );
}

export function useT() {
  const lang = useDemoStore((s) => s.lang);
  const name = useDemoStore((s) => s.name);
  const city = useDemoStore((s) => s.city);
  const tagline = useDemoStore((s) => s.tagline);

  const dict = dictionaries[lang];

  const t = useCallback(
    (key: DictKey, vars?: Vars) => {
      const raw = dict[key];
      if (Array.isArray(raw)) return raw.join(", ");
      return interpolate(String(raw), {
        name,
        city,
        tagline,
        year: new Date().getFullYear(),
        ...vars,
      });
    },
    [dict, name, city, tagline]
  );

  const tList = useCallback(
    (key: DictKey): string[] => {
      const raw = dict[key];
      return Array.isArray(raw) ? [...raw] : [String(raw)];
    },
    [dict]
  );

  return useMemo(() => ({ t, tList, lang }), [t, tList, lang]);
}

export function getDict(lang: Lang) {
  return dictionaries[lang];
}
