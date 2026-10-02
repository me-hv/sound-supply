export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  category: "Buying Guide" | "Studio Acoustics" | "Signal Chain" | "Explainer";
  readTime: string;
  summary: string;
  publishedDate: string;
  imageUrl: string;
  keyTakeaways: string[];
}

export const GEAR_GUIDES: GuideArticle[] = [
  {
    id: "guide-audio-interface-2026",
    slug: "how-to-choose-your-first-audio-interface",
    title: "How to Choose the Right Audio Interface in India (2026 Edition)",
    category: "Buying Guide",
    readTime: "6 min read",
    summary: "From preamp gain headroom to converter dynamic range and latency over USB-C, learn what actually matters when picking an interface for home recording.",
    publishedDate: "February 2026",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    keyTakeaways: [
      "Why 65dB+ gain matters if you're planning to use low-output dynamic mics like the SM7B without an inline lifter",
      "Dynamic range ratings: Understanding why 120dB converters reveal hidden artifacts during compression",
      "Driver stability: Low round-trip latency on Windows (ASIO) vs macOS CoreAudio",
    ],
  },
  {
    id: "guide-studio-monitors-size",
    slug: "5-inch-vs-8-inch-studio-monitors-small-rooms",
    title: "5-Inch vs. 8-Inch Studio Monitors in Small Indian Rooms",
    category: "Studio Acoustics",
    readTime: "8 min read",
    summary: "Bigger isn't always better. Why an 8-inch monitor in a 10x10 ft untreated bedroom often ruins low-end clarity, and why 5-inch monitors with boundary switches perform far better.",
    publishedDate: "January 2026",
    imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    keyTakeaways: [
      "Room mode physics: How low frequencies accumulate in corners and skew your bass decisions",
      "Boundary correction: Using Room Control filters to prevent muddy wall-coupling bass boost",
      "Acoustic decoupling: Why foam pads or isolation stands are non-negotiable on a wooden desk",
    ],
  },
  {
    id: "guide-dynamic-vs-condenser",
    slug: "dynamic-vs-condenser-microphones-home-studios",
    title: "Dynamic vs. Condenser Microphones: The Honest Truth for Home Studios",
    category: "Explainer",
    readTime: "5 min read",
    summary: "Why a ₹40,000 condenser mic might pick up your neighbor's dog and ceiling fan, and why a broadcast dynamic mic is often the secret weapon for home creators.",
    publishedDate: "February 2026",
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
    keyTakeaways: [
      "Polar pattern sensitivity: Off-axis rejection differences between moving-coil and gold-sputtered capsules",
      "Transient response: When condenser detail elevates acoustic guitars vs when it over-accentuates vocal mouth clicks",
      "Gain staging requirements: Why dynamic mics require clean preamps",
    ],
  },
];
