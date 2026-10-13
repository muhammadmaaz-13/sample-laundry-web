export type TrackEvent =
  | "demo_opened"
  | "theme_changed"
  | "customize_opened"
  | "name_typed"
  | "guide_toggled"
  | "language_changed"
  | "quote_submitted"
  | "book_clicked"
  | "design_submitted";

type TrackProps = Record<string, string | number | boolean | null | undefined>;

const events: { event: TrackEvent; props: TrackProps; at: number }[] = [];

function campaignCode(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("c");
}

export function track(event: TrackEvent, props: TrackProps = {}) {
  const payload = {
    event,
    props: { ...props, campaign: campaignCode() },
    at: Date.now(),
  };
  events.push(payload);
  if (typeof console !== "undefined") {
    console.info("[track]", payload.event, payload.props);
  }
}

export function getTrackedEvents() {
  return [...events];
}

let nameTypedTimer: ReturnType<typeof setTimeout> | null = null;
export function trackNameTypedDebounced(value: string) {
  if (nameTypedTimer) clearTimeout(nameTypedTimer);
  nameTypedTimer = setTimeout(() => {
    track("name_typed", { length: value.length });
  }, 600);
}
