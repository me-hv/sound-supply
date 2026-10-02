export interface StudioGoalOption {
  id: string;
  title: string;
  tagline: string;
  description: string;
  recommendedCategoryFocus: string[];
}

export interface StudioBudgetOption {
  id: string;
  label: string;
  amountInr: number;
}

export interface StudioBuilderPreset {
  id: string;
  title: string;
  goalId: string;
  budgetId: string;
  description: string;
  productIds: string[];
  totalMrpInr: number;
  bundlePriceInr: number;
  savingsInr: number;
  highlightFeatures: string[];
}

export const STUDIO_GOALS: StudioGoalOption[] = [
  {
    id: "vocal-recording",
    title: "Vocal Recording & Voiceover",
    tagline: "Pristine vocal tracking, podcasting & streaming",
    description: "Designed for vocalists, voice actors, and content creators needing broadcast clarity and room noise isolation.",
    recommendedCategoryFocus: ["dynamic-microphones", "audio-interfaces", "studio-headphones"],
  },
  {
    id: "music-production",
    title: "Electronic Music Production & Beats",
    tagline: "Beatmaking, synthesizers & in-the-box composition",
    description: "Tailored for producers crafting hip-hop, electronic, and pop tracks requiring expressive keyboards, low-end monitoring, and rapid workflow.",
    recommendedCategoryFocus: ["midi-keyboards", "studio-monitors", "studio-headphones"],
  },
  {
    id: "guitar-recording",
    title: "Guitar & Bass Project Studio",
    tagline: "Direct amp modeling, pedals & pristine tracking",
    description: "Specialized Hi-Z instrument inputs, low-latency audio conversion, and flat-response reference speakers.",
    recommendedCategoryFocus: ["audio-interfaces", "electric-guitars", "studio-monitors"],
  },
  {
    id: "full-studio",
    title: "Complete Professional Studio",
    tagline: "Flagship converters, DSP processing & dual monitoring",
    description: "End-to-end commercial workflow for mixing, tracking multi-instruments, and client deliveries.",
    recommendedCategoryFocus: ["audio-interfaces", "dynamic-microphones", "studio-monitors", "studio-headphones"],
  },
];

export const STUDIO_BUDGETS: StudioBudgetOption[] = [
  { id: "b-25k", label: "₹25,000", amountInr: 25000 },
  { id: "b-50k", label: "₹50,000", amountInr: 50000 },
  { id: "b-1l", label: "₹1,00,000", amountInr: 100000 },
  { id: "b-2l", label: "₹2,00,000+", amountInr: 200000 },
];

export const STUDIO_PRESETS: StudioBuilderPreset[] = [
  {
    id: "preset-starter-producer",
    title: "Essential Bedroom Producer Rig",
    goalId: "music-production",
    budgetId: "b-50k",
    description: "The quintessential modern music production setup. Ultra-low latency USB-C tracking, precision 45mm monitoring headphones, and an expressive 37-key arpeggiating controller.",
    productIds: [
      "prod-scarlett-2i2-gen4",
      "prod-ath-m50x",
      "prod-arturia-keystep-37",
    ],
    totalMrpInr: 58970,
    bundlePriceInr: 45990,
    savingsInr: 12980,
    highlightFeatures: [
      "120dB dynamic range converters for clean tracking",
      "Industry benchmark ATH-M50x headphones for mixing low-end",
      "37 velocity-sensitive keys with scale and strum modes",
      "Ableton Live Lite and Focusrite Hitmaker Expansion included",
    ],
  },
  {
    id: "preset-vocal-pro",
    title: "Broadcast Vocal & Streaming Setup",
    goalId: "vocal-recording",
    budgetId: "b-1l",
    description: "The legendary broadcast dynamic microphone paired with 4th-gen pristine preamps and studio closed-back cans. Engineered to reject untreated room reverb and HVAC hum.",
    productIds: [
      "prod-shure-sm7b",
      "prod-scarlett-2i2-gen4",
      "prod-ath-m50x",
    ],
    totalMrpInr: 83970,
    bundlePriceInr: 65990,
    savingsInr: 17980,
    highlightFeatures: [
      "Iconic Shure SM7B velvet vocal tone with electromagnetic shielding",
      "Focusrite 69dB clean preamp with one-click Auto Gain & Clip Safe",
      "Zero acoustic bleed headphones during active mic takes",
    ],
  },
  {
    id: "preset-elite-studio",
    title: "Flagship Mixing & Tracking Suite",
    goalId: "full-studio",
    budgetId: "b-2l",
    description: "Universal Audio DSP acceleration combined with dual Yamaha HS5 reference monitors, Shure SM7B, and Audio-Technica monitoring.",
    productIds: [
      "prod-universal-audio-apollo-twin-x",
      "prod-yamaha-hs5",
      "prod-shure-sm7b",
      "prod-ath-m50x",
    ],
    totalMrpInr: 199470,
    bundlePriceInr: 159990,
    savingsInr: 39480,
    highlightFeatures: [
      "Realtime Neve & SSL emulation via UAD DUO Core hardware",
      "Yamaha HS5 honest nearfield acoustic balance",
      "Complete signal chain from pristine mic capture to final mastering",
    ],
  },
];
