/**
 * Sound Supply — Site & Business Policy Configuration
 * 
 * Centralized configuration for all storefront messaging, trust badges,
 * customer support placeholders, and commercial policies.
 * 
 * NOTE: Policies are treated as configurable business parameters
 * rather than hard-coded claims.
 */

export interface PolicyConfig {
  id: string;
  label: string;
  shortDescription: string;
  detailDescription?: string;
  badgeText?: string;
  isPlaceholder: boolean;
}

export const SITE_POLICIES = {
  authenticity: {
    id: "authenticity",
    label: "Genuine Product Assurance",
    shortDescription: "Sourced through authorized distribution channels with registered manufacturer serials.",
    badgeText: "Genuine Gear",
    isPlaceholder: true,
  },
  warranty: {
    id: "warranty",
    label: "Official Manufacturer Warranty",
    shortDescription: "Covered under standard brand warranty terms applicable in India.",
    badgeText: "Brand Warranty",
    isPlaceholder: true,
  },
  transit: {
    id: "transit",
    label: "Insured Transit Packaging",
    shortDescription: "Heavy-duty shock-absorbing packaging with transit coverage on express orders.",
    badgeText: "Insured Courier",
    isPlaceholder: true,
  },
  support: {
    id: "support",
    label: "Technical Gear Advisory",
    shortDescription: "Pre-purchase guidance on compatibility, impedance matching, and studio signal chains.",
    badgeText: "Expert Advice",
    isPlaceholder: true,
  },
  returns: {
    id: "returns",
    label: "Transit Damage & DOA Policy",
    shortDescription: "Eligible for prompt replacement in case of transit damage or verified dead-on-arrival units.",
    badgeText: "DOA Coverage",
    isPlaceholder: true,
  },
  financing: {
    id: "financing",
    label: "Flexible Payment & EMI",
    shortDescription: "Major credit cards, netbanking, UPI, and eligible card EMI options available.",
    badgeText: "EMI Options",
    isPlaceholder: true,
  },
} as const;

export const SITE_CONFIG = {
  brand: {
    name: "Sound Supply",
    tagline: "Everything you need to make sound.",
    market: "India",
    currency: "INR",
    currencySymbol: "₹",
    supportEmail: "support@soundsupply.in",
    advisoryPhone: "+91 800-768-637", // Placeholder format (+91 800-SOUNDS)
    hoursText: "Mon–Sat, 10:00 AM – 7:00 PM IST",
  },
  thresholds: {
    freeShippingMinimumInr: 2500,
    maxCompareItems: 4,
    defaultEmiMonths: 6,
  },
  socials: {
    instagram: "https://instagram.com/soundsupply.in",
    youtube: "https://youtube.com/@soundsupply",
    twitter: "https://x.com/soundsupply_in",
  },
};
