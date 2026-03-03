export type Service = {
  slug: string;
  title: string;
  tagline: string;
  heroDesc: string;
  accentColor: string;
  accentLight: string;
  iconName: string;
  whatWeClean: string[];
  features: { title: string; desc: string }[];
  pricing: { label: string; price: string; perks: string[] }[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "residential",
    title: "Residential Cleaning",
    tagline: "Your home, spotless — every time.",
    heroDesc:
      "Regular home cleaning packages tailored to your lifestyle. We handle the mess so you can focus on what matters.",
    accentColor: "#2563EB",
    accentLight: "#EFF6FF",
    iconName: "house",
    whatWeClean: [
      "Living rooms & bedrooms",
      "Kitchens & appliances",
      "Bathrooms & fixtures",
      "Hallways & staircases",
      "Windows & sills",
      "Baseboards & ceiling fans",
    ],
    features: [
      { title: "Eco-Friendly Products", desc: "Safe for kids, pets, and the planet." },
      { title: "Vetted Professionals", desc: "Background-checked and fully insured team." },
      { title: "Flexible Scheduling", desc: "Weekly, bi-weekly, or monthly — your call." },
      { title: "Satisfaction Guarantee", desc: "Not happy? We'll re-clean for free." },
    ],
    pricing: [
      { label: "Basic", price: "$89", perks: ["Up to 2 bed / 1 bath", "2-hour session", "Standard clean"] },
      { label: "Standard", price: "$139", perks: ["Up to 3 bed / 2 bath", "3-hour session", "Deep vacuum & mop"] },
      { label: "Premium", price: "$199", perks: ["4+ bed / 3 bath", "Full-day session", "Inside appliances"] },
    ],
    faq: [
      { q: "Do I need to be home?", a: "Nope! Many clients provide a key or door code. We're fully insured." },
      { q: "What products do you use?", a: "EPA-approved, non-toxic, pet-safe cleaning solutions." },
      { q: "How do I reschedule?", a: "Just give us 24-hour notice via phone or the booking portal." },
    ],
  },
  {
    slug: "commercial",
    title: "Commercial Cleaning",
    tagline: "Professional spaces deserve professional care.",
    heroDesc:
      "Keep your office, retail space, or workspace immaculate. We work around your hours — nights, weekends, whenever.",
    accentColor: "#0F766E",
    accentLight: "#F0FDFA",
    iconName: "monitor",
    whatWeClean: [
      "Open-plan offices",
      "Restrooms & break rooms",
      "Reception & lobbies",
      "Conference rooms",
      "Retail floors & shelving",
      "Warehouse & storage areas",
    ],
    features: [
      { title: "After-Hours Service", desc: "We clean while you're closed — zero disruption." },
      { title: "Custom Contracts", desc: "Daily, weekly, or one-off — flexible for your business." },
      { title: "OSHA Compliant", desc: "All staff trained to commercial safety standards." },
      { title: "Disinfection Protocols", desc: "Hospital-grade sanitization available on request." },
    ],
    pricing: [
      { label: "Small Office", price: "$149", perks: ["Up to 1,000 sq ft", "Weekly visits", "Trash & surfaces"] },
      { label: "Mid-Size", price: "$279", perks: ["1,000–3,000 sq ft", "3x per week", "Restrooms included"] },
      { label: "Enterprise", price: "Custom", perks: ["3,000+ sq ft", "Daily service", "Full scope"] },
    ],
    faq: [
      { q: "Can you work after business hours?", a: "Absolutely — most commercial clients prefer evenings or early mornings." },
      { q: "Do you supply equipment?", a: "Yes, we bring all professional-grade equipment and supplies." },
      { q: "Is there a minimum contract length?", a: "No lock-ins. Month-to-month agreements available." },
    ],
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    tagline: "Top-to-bottom. Nothing missed.",
    heroDesc:
      "A thorough, intensive clean for spaces that need more than a regular tidy-up. Perfect for move-ins, seasonal resets, or post-party recovery.",
    accentColor: "#7C3AED",
    accentLight: "#F5F3FF",
    iconName: "sparkles",
    whatWeClean: [
      "Inside oven & refrigerator",
      "Behind & under furniture",
      "Grout scrubbing & tile polish",
      "Cabinet interiors",
      "Blinds & window tracks",
      "Light fixtures & vents",
    ],
    features: [
      { title: "360° Coverage", desc: "Every corner, crack, and crevice addressed." },
      { title: "Steam Cleaning", desc: "High-temperature steam for deep sanitization." },
      { title: "Deodorizing", desc: "Neutralize odors at the source, not just mask them." },
      { title: "Photo Report", desc: "Before & after photos sent on completion." },
    ],
    pricing: [
      { label: "Studio / 1BR", price: "$179", perks: ["Up to 700 sq ft", "4-hour session", "Full deep clean"] },
      { label: "2–3 Bedroom", price: "$279", perks: ["700–1,400 sq ft", "6-hour session", "Appliances included"] },
      { label: "Large Home", price: "$399", perks: ["1,400+ sq ft", "Full-day session", "Everything + steam"] },
    ],
    faq: [
      { q: "How is deep cleaning different from regular?", a: "We clean areas typically skipped in routine cleans — inside appliances, under furniture, grout lines, vents, and more." },
      { q: "How long does it take?", a: "Usually 4–8 hours depending on the size and condition of the space." },
      { q: "Do I need to prepare anything?", a: "Just clear countertops and give us access. We handle the rest." },
    ],
  },
  {
    slug: "move-in-out",
    title: "Move-In / Out Cleaning",
    tagline: "Fresh start for every transition.",
    heroDesc:
      "Whether you're leaving or arriving, we ensure the space is spotless. Ideal for landlords, tenants, and real-estate agents.",
    accentColor: "#EA580C",
    accentLight: "#FFF7ED",
    iconName: "arrow-right",
    whatWeClean: [
      "All rooms top to bottom",
      "Inside all cabinets & drawers",
      "Appliances inside & out",
      "Walls & light switches",
      "Garage & utility areas",
      "Patio & entry areas",
    ],
    features: [
      { title: "Deposit-Safe Clean", desc: "Helps tenants meet landlord cleanliness standards." },
      { title: "Same-Day Availability", desc: "Flexible booking to match your moving schedule." },
      { title: "Landlord-Ready", desc: "Meet real-estate handover requirements with ease." },
      { title: "Empty-Property Specialist", desc: "We're experienced in vacant spaces of all sizes." },
    ],
    pricing: [
      { label: "Apartment", price: "$199", perks: ["Studio to 1BR", "Full empty-unit clean", "Cabinets & appliances"] },
      { label: "House", price: "$329", perks: ["2–3 bedrooms", "Garage included", "Walls & fixtures"] },
      { label: "Large Property", price: "$499", perks: ["4+ bed / large apt", "All areas", "Priority scheduling"] },
    ],
    faq: [
      { q: "Should the property be empty?", a: "For move-out cleans, yes. For move-in cleans, we can work around boxes." },
      { q: "Will this help me get my deposit back?", a: "We follow standard landlord checklists to maximize your chances." },
      { q: "Can landlords book on behalf of tenants?", a: "Yes — we work with landlords, property managers, and agents regularly." },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}