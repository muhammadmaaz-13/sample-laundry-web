# Sample Laundry Web

iOS-inspired multi-page laundry / dry-cleaning template with EN/ES, light/dark, four visual themes, interactive modules, and a demo customization layer.

## White-label in 60 seconds

Edit **one file**: [`config/siteConfig.ts`](config/siteConfig.ts)

- Business name, tagline, logo text, city, phone, email, address, hours, socials
- Pricing, services, branches, images, estimator rates, commercial discounts
- Tracker demo code (`CLEAN123`), care guide data

Translations: [`config/translations/en.ts`](config/translations/en.ts) and [`config/translations/es.ts`](config/translations/es.ts)

Themes: [`config/themes.ts`](config/themes.ts)

## Demo layer

A fixed toolbar lets prospects:

- Cycle 4 themes (Aqua iOS · Fresh Mint · Midnight Premium · Warm Friendly)
- Customize name, city, tagline, lead service, main CTA, accent
- Toggle “Why it works” callouts and EN/ES

Hide it with **Hide demo**, or disable entirely:

```bash
NEXT_PUBLIC_DEMO=false
```

## Scripts

```bash
npm install
npm run dev
npm run build
npm start
```

## Deploy

Vercel project name: `sample-laundry-web`

Forms/booking/analytics are simulated client-side. Swap `lib/track.ts` and form handlers when you wire real endpoints.
