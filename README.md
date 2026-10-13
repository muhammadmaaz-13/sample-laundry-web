# Sample Notary Web

iOS-inspired multi-page notary template with EN/ES, light/dark, four visual themes (Corporate, Friendly, Executive, Fresh), interactive modules, and a demo customization layer.

## White-label in 60 seconds

Edit **one file**: [`config/siteConfig.ts`](config/siteConfig.ts)

- Business name, tagline, logo text, city, phone, email, address, hours, socials
- Pricing, services, coverage locations, images, estimator rates, volume discounts
- Tracker demo code (`SIGN123`), document prep guide

Translations: [`config/translations/en.ts`](config/translations/en.ts) and [`config/translations/es.ts`](config/translations/es.ts)

Themes: [`config/themes.ts`](config/themes.ts)

## Demo layer

A fixed toolbar lets prospects:

- Cycle 4 themes (Corporate · Friendly · Executive · Fresh)
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

Forms and booking are simulated client-side. Swap `lib/track.ts` and form handlers when you wire real endpoints.
