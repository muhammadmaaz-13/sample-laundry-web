export type LeadService =
  | "loan"
  | "apostille"
  | "estate"
  | "mobile"
  | "business";

export type MainCta = "book" | "call" | "quote";

export const siteConfig = {
  businessName: "[YOUR BUSINESS NAME HERE]",
  tagline: "[YOUR BUSINESS TAGLINE HERE]",
  logoText: "[YOUR LOGO HERE]",
  city: "[YOUR CITY HERE]",
  phone: "[YOUR PHONE NUMBER HERE]",
  email: "[YOUR GMAIL HERE]",
  address: "[YOUR STREET ADDRESS, CITY, STATE, ZIP HERE]",
  hours: "[YOUR BUSINESS HOURS HERE]",
  socials: {
    whatsapp: "[YOUR WHATSAPP LINK HERE]",
    instagram: "[YOUR INSTAGRAM LINK HERE]",
    facebook: "[YOUR FACEBOOK LINK HERE]",
  },
  currency: "$",
  defaults: {
    themeIndex: 0,
    mode: "light" as "light" | "dark",
    lang: "en" as "en" | "es",
    lead: "loan" as LeadService,
    mainCta: "book" as MainCta,
  },
  images: {
    hero: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
    signing:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
    handshake:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    stamp:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
    pen: "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&q=80&w=800",
    office:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  },
  stats: [
    { key: "signings", value: 12000, suffix: "+", decimals: 0 },
    { key: "onTime", value: 99.5, suffix: "%", decimals: 1 },
    { key: "bonded", value: 100, suffix: "%", decimals: 0 },
    { key: "coverage", value: 25, suffix: "+", decimals: 0 },
  ],
  testimonials: [
    {
      id: "t1",
      name: "Maria G.",
      rating: 5,
      textKey: "testimonial1",
      verified: true,
    },
    {
      id: "t2",
      name: "James R.",
      rating: 5,
      textKey: "testimonial2",
      verified: true,
    },
    {
      id: "t3",
      name: "Sofia L.",
      rating: 5,
      textKey: "testimonial3",
      verified: true,
    },
    {
      id: "t4",
      name: "David K.",
      rating: 4,
      textKey: "testimonial4",
      verified: true,
    },
  ],
  branches: [
    {
      id: "downtown",
      nameKey: "branchDowntown",
      address: "100 Main Street, Downtown",
      hours: "Mon–Sat 8AM–7PM",
    },
    {
      id: "westside",
      nameKey: "branchWestside",
      address: "245 West Avenue",
      hours: "Mon–Fri 9AM–6PM",
    },
    {
      id: "northgate",
      nameKey: "branchNorthgate",
      address: "88 Northgate Blvd",
      hours: "Mon–Sat 8AM–5PM",
    },
    {
      id: "riverside",
      nameKey: "branchRiverside",
      address: "12 Riverside Plaza",
      hours: "By appointment",
    },
    {
      id: "midtown",
      nameKey: "branchMidtown",
      address: "500 Midtown Lane",
      hours: "Mon–Fri 8AM–6PM",
    },
  ],
  services: [
    {
      id: "loan" as LeadService,
      popular: true,
      items: [
        { id: "loan-signing", nameKey: "itemLoanSigning", unit: "signing", price: 125 },
        { id: "loan-refinance", nameKey: "itemRefinance", unit: "signing", price: 135 },
        { id: "loan-heloc", nameKey: "itemHeloc", unit: "signing", price: 115 },
        { id: "loan-purchase", nameKey: "itemPurchase", unit: "signing", price: 150 },
      ],
    },
    {
      id: "apostille" as LeadService,
      popular: false,
      items: [
        { id: "ap-standard", nameKey: "itemApostilleStd", unit: "document", price: 75 },
        { id: "ap-rush", nameKey: "itemApostilleRush", unit: "document", price: 125 },
        { id: "ap-birth", nameKey: "itemBirthCert", unit: "document", price: 85 },
        { id: "ap-power", nameKey: "itemPowerAttorney", unit: "document", price: 95 },
      ],
    },
    {
      id: "estate" as LeadService,
      popular: false,
      items: [
        { id: "est-will", nameKey: "itemWill", unit: "appointment", price: 65 },
        { id: "est-trust", nameKey: "itemTrust", unit: "appointment", price: 95 },
        { id: "est-affidavit", nameKey: "itemAffidavit", unit: "document", price: 35 },
        { id: "est-deed", nameKey: "itemDeed", unit: "document", price: 55 },
      ],
    },
    {
      id: "mobile" as LeadService,
      popular: false,
      items: [
        { id: "mob-home", nameKey: "itemMobileHome", unit: "visit", price: 45 },
        { id: "mob-hospital", nameKey: "itemMobileHospital", unit: "visit", price: 65 },
        { id: "mob-office", nameKey: "itemMobileOffice", unit: "visit", price: 40 },
        { id: "mob-afterhours", nameKey: "itemAfterHours", unit: "visit", price: 75 },
      ],
    },
    {
      id: "business" as LeadService,
      popular: false,
      items: [
        { id: "biz-ack", nameKey: "itemAcknowledgment", unit: "seal", price: 15 },
        { id: "biz-jurat", nameKey: "itemJurat", unit: "seal", price: 15 },
        { id: "biz-copy", nameKey: "itemCertifiedCopy", unit: "document", price: 20 },
        { id: "biz-bulk", nameKey: "itemBulkPackage", unit: "package", price: 250 },
      ],
    },
  ],
  estimator: {
    perSeal: 15,
    perLoanSigning: 125,
    perTravel: 35,
  },
  commercial: {
    perSigningWeekly: 120,
    perSeal: 12,
    perTravel: 30,
    volumeDiscounts: [
      { minSignings: 5, discount: 0.08 },
      { minSignings: 15, discount: 0.15 },
      { minSignings: 30, discount: 0.22 },
    ],
  },
  tracker: {
    demoCode: "SIGN123",
    steps: ["requested", "confirmed", "inProgress", "completed"] as const,
  },
  prepGuide: {
    checklist: [
      { id: "photoId", labelKey: "prepPhotoId" },
      { id: "unsigned", labelKey: "prepUnsigned" },
      { id: "witnesses", labelKey: "prepWitnesses" },
      { id: "payment", labelKey: "prepPayment" },
      { id: "appointment", labelKey: "prepAppointment" },
      { id: "translator", labelKey: "prepTranslator" },
      { id: "thumbprint", labelKey: "prepThumbprint" },
      { id: "sealSpace", labelKey: "prepSealSpace" },
      { id: "namesMatch", labelKey: "prepNamesMatch" },
      { id: "noBlanks", labelKey: "prepNoBlanks" },
      { id: "copies", labelKey: "prepCopies" },
      { id: "mobileReady", labelKey: "prepMobileReady" },
    ],
    docTypes: [
      "loan",
      "apostille",
      "power",
      "deed",
      "affidavit",
      "will",
    ] as const,
  },
} as const;

export type SiteConfig = typeof siteConfig;
