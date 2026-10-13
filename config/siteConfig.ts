export type LeadService =
  | "washFold"
  | "dryClean"
  | "ironing"
  | "eco"
  | "commercial";

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
    lead: "washFold" as LeadService,
    mainCta: "book" as MainCta,
  },
  images: {
    hero: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=1200",
    machines:
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=1200",
    folded:
      "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=800",
    dryClean:
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=800",
    ironing:
      "https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&q=80&w=800",
    delivery:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
  },
  stats: [
    { key: "bags", value: 50000, suffix: "+", decimals: 0 },
    { key: "onTime", value: 99.8, suffix: "%", decimals: 1 },
    { key: "eco", value: 100, suffix: "%", decimals: 0 },
    { key: "branches", value: 15, suffix: "+", decimals: 0 },
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
      hours: "Mon–Sat 8AM–8PM",
    },
    {
      id: "westside",
      nameKey: "branchWestside",
      address: "245 West Avenue",
      hours: "Mon–Sat 7AM–9PM",
    },
    {
      id: "northgate",
      nameKey: "branchNorthgate",
      address: "88 Northgate Blvd",
      hours: "Mon–Fri 8AM–7PM",
    },
    {
      id: "riverside",
      nameKey: "branchRiverside",
      address: "12 Riverside Plaza",
      hours: "Daily 9AM–6PM",
    },
    {
      id: "midtown",
      nameKey: "branchMidtown",
      address: "500 Midtown Lane",
      hours: "Mon–Sat 8AM–8PM",
    },
  ],
  services: [
    {
      id: "washFold" as LeadService,
      popular: true,
      items: [
        { id: "wf-everyday", nameKey: "itemEveryday", unit: "kg", price: 2.5 },
        { id: "wf-sheets", nameKey: "itemBedSheet", unit: "piece", price: 8 },
        { id: "wf-towels", nameKey: "itemTowels", unit: "kg", price: 2.2 },
        { id: "wf-curtains", nameKey: "itemCurtains", unit: "piece", price: 18 },
      ],
    },
    {
      id: "dryClean" as LeadService,
      popular: false,
      items: [
        { id: "dc-suit", nameKey: "itemSuit", unit: "suit", price: 22 },
        { id: "dc-jacket", nameKey: "itemJacket", unit: "piece", price: 14 },
        { id: "dc-dress", nameKey: "itemDress", unit: "piece", price: 16 },
        { id: "dc-coat", nameKey: "itemCoat", unit: "piece", price: 28 },
      ],
    },
    {
      id: "ironing" as LeadService,
      popular: false,
      items: [
        { id: "ir-shirt", nameKey: "itemShirt", unit: "piece", price: 4 },
        { id: "ir-pants", nameKey: "itemPants", unit: "piece", price: 5 },
        { id: "ir-dress", nameKey: "itemDressIron", unit: "piece", price: 8 },
        { id: "ir-bulk", nameKey: "itemBulkIron", unit: "kg", price: 6 },
      ],
    },
    {
      id: "eco" as LeadService,
      popular: false,
      items: [
        { id: "eco-delicates", nameKey: "itemDelicates", unit: "kg", price: 4.5 },
        { id: "eco-wool", nameKey: "itemWool", unit: "piece", price: 12 },
        { id: "eco-silk", nameKey: "itemSilk", unit: "piece", price: 15 },
        { id: "eco-baby", nameKey: "itemBaby", unit: "kg", price: 3.5 },
      ],
    },
    {
      id: "commercial" as LeadService,
      popular: false,
      items: [
        { id: "com-bag", nameKey: "itemWeeklyBag", unit: "bag", price: 35 },
        { id: "com-towel", nameKey: "itemTowelVol", unit: "piece", price: 1.2 },
        { id: "com-sheet", nameKey: "itemSheetSet", unit: "set", price: 9 },
        { id: "com-duvet", nameKey: "itemDuvet", unit: "piece", price: 24 },
      ],
    },
  ],
  estimator: {
    perKg: 2.5,
    perSuit: 22,
    perComforter: 28,
  },
  commercial: {
    perBagWeekly: 35,
    perTowel: 1.2,
    perSheetSet: 9,
    volumeDiscounts: [
      { minBags: 10, discount: 0.1 },
      { minBags: 25, discount: 0.18 },
      { minBags: 50, discount: 0.25 },
    ],
  },
  tracker: {
    demoCode: "CLEAN123",
    steps: ["pickedUp", "washing", "ironing", "delivery"] as const,
  },
  careGuide: {
    symbols: [
      { id: "wash30", labelKey: "symWash30" },
      { id: "noBleach", labelKey: "symNoBleach" },
      { id: "tumbleLow", labelKey: "symTumbleLow" },
      { id: "dryClean", labelKey: "symDryClean" },
      { id: "ironMed", labelKey: "symIronMed" },
      { id: "noTumble", labelKey: "symNoTumble" },
      { id: "handWash", labelKey: "symHandWash" },
      { id: "lineDry", labelKey: "symLineDry" },
      { id: "noIron", labelKey: "symNoIron" },
      { id: "doNotWash", labelKey: "symDoNotWash" },
      { id: "gentle", labelKey: "symGentle" },
      { id: "anySolvent", labelKey: "symAnySolvent" },
    ],
    stains: [
      "coffee",
      "wine",
      "ink",
      "grease",
      "grass",
      "blood",
    ] as const,
  },
} as const;

export type SiteConfig = typeof siteConfig;
