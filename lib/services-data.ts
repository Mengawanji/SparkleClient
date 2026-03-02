
import {
  Home,
  Building2,
  Sparkles,
  Truck,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceFeature {
  title: string;
  desc: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  highlight: boolean;
  features: string[];
}

export interface ServiceData {
  slug: string;
  navLabel: string;        // Short label shown in the navbar dropdown
  navDesc: string;         // One-line description in the navbar dropdown
  Icon: LucideIcon;        // Lucide icon used in nav dropdown + page hero
  accentColor: string;     // Unique brand accent for this service
  accentLight: string;     // Light tint used for card backgrounds
  title: string;           // Full page H1
  tagline: string;         // Hero sub-heading
  heroDesc: string;        // Hero paragraph
  whatWeClean: string[];   // Checklist items in the "What We Clean" section
  features: ServiceFeature[];
  pricing: PricingTier[];
  faq: { q: string; a: string }[];
}

export const services: ServiceData[] = [
  // ─── 1. RESIDENTIAL ────────────────────────────────────────────────────────
  {
    slug: 'residential-cleaning',
    navLabel: 'Residential Cleaning',
    navDesc: 'Regular home cleaning packages',
    Icon: Home,
    accentColor: '#3B4FCC',
    accentLight: '#EEF2FF',
    title: 'Residential Cleaning',
    tagline: 'Your Home, Flawlessly Clean',
    heroDesc:
      "From weekly touch-ups to monthly deep refreshes, our residential cleaning service is built around your schedule, your standards, and your family's needs — not ours.",
    whatWeClean: [
      'Kitchen — surfaces, appliances, sink & stovetop',
      'Bathrooms — toilet, tub, shower, mirrors & tiles',
      'Bedrooms — dusting, vacuuming & linen changes',
      'Living areas — furniture, shelves & floor care',
      'Hallways, stairs & entranceways',
      'Baseboards, light switches & door frames',
      'Interior windows & window sills',
      'Trash removal from all rooms',
    ],
    features: [
      {
        title: 'Recurring Plans',
        desc: 'Weekly, bi-weekly or monthly — we build a cadence that works for your life and budget.',
      },
      {
        title: 'Same Cleaner Every Time',
        desc: 'Recurring clients get a dedicated professional who knows your home inside and out.',
      },
      {
        title: 'Eco-Safe Products',
        desc: 'All products are certified biodegradable and safe for children and pets.',
      },
      {
        title: 'Fully Insured',
        desc: 'Our team is background-checked, bonded and insured for your complete peace of mind.',
      },
    ],
    pricing: [
      {
        name: 'Monthly',
        price: '$89',
        period: '/visit',
        highlight: false,
        features: ['1 visit/month', 'Up to 2,000 sq ft', 'Standard checklist', 'Online booking'],
      },
      {
        name: 'Bi-Weekly',
        price: '$79',
        period: '/visit',
        highlight: true,
        features: ['2 visits/month', 'Up to 2,500 sq ft', 'Full checklist', 'Priority scheduling', 'Same cleaner'],
      },
      {
        name: 'Weekly',
        price: '$69',
        period: '/visit',
        highlight: false,
        features: ['4 visits/month', 'Unlimited sq ft', 'Custom checklist', 'Priority scheduling', 'Same cleaner', 'Free deep clean annually'],
      },
    ],
    faq: [
      {
        q: 'Do I need to be home during the clean?',
        a: 'Not at all. Many clients provide a key or access code. We treat your home with the same care whether you are present or not.',
      },
      {
        q: "What if I'm not satisfied?",
        a: 'We offer a 48-hour re-clean guarantee. If anything was missed, we return and fix it at no charge, no questions asked.',
      },
      {
        q: 'How long does a visit take?',
        a: 'A standard clean of an average home typically takes 2–3 hours. Larger homes or first-time cleans may take a little longer.',
      },
    ],
  },

  // ─── 2. COMMERCIAL ─────────────────────────────────────────────────────────
  {
    slug: 'commercial-cleaning',
    navLabel: 'Commercial Cleaning',
    navDesc: 'Offices, retail & workspaces',
    Icon: Building2,
    accentColor: '#0891B2',
    accentLight: '#F0F9FF',
    title: 'Commercial Cleaning',
    tagline: 'Workspaces That Inspire',
    heroDesc:
      'A clean office signals professionalism, boosts employee focus, and makes a lasting first impression on every client who walks through your door. We handle the detail so you can focus on business.',
    whatWeClean: [
      'Reception & lobby areas',
      'Private offices & open-plan workstations',
      'Boardrooms & conference rooms',
      'Staff kitchens & break rooms',
      'Washrooms & accessible facilities',
      'Hallways, stairwells & common areas',
      'Glass partitions & interior windows',
      'Floor care — vacuum, mop & polish',
    ],
    features: [
      {
        title: 'After-Hours Service',
        desc: 'We clean outside business hours so your team arrives to a spotless office every morning.',
      },
      {
        title: 'Dedicated Account Manager',
        desc: 'One point of contact for scheduling, feedback and any special requests.',
      },
      {
        title: 'Flexible Contracts',
        desc: 'Daily, weekly or custom schedules with no long-term lock-in required.',
      },
      {
        title: 'Commercially Insured',
        desc: 'Full commercial-grade bonding and insurance on every visit, for every client.',
      },
    ],
    pricing: [
      {
        name: 'Small Office',
        price: '$149',
        period: '/visit',
        highlight: false,
        features: ['Up to 1,000 sq ft', 'Up to 3 days/week', 'Standard checklist', 'Monthly report'],
      },
      {
        name: 'Medium Office',
        price: '$249',
        period: '/visit',
        highlight: true,
        features: ['Up to 3,000 sq ft', 'Up to 5 days/week', 'Custom checklist', 'Dedicated manager', 'Quarterly deep clean'],
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        highlight: false,
        features: ['Unlimited sq ft', 'Daily service', 'Full custom scope', 'Dedicated team', 'SLA guarantee', 'Priority response'],
      },
    ],
    faq: [
      {
        q: 'Can you clean outside of business hours?',
        a: 'Yes — after-hours and weekend cleaning is our most popular option for commercial clients.',
      },
      {
        q: 'Do you supply all equipment and products?',
        a: 'Absolutely. We bring everything needed. You do not need to supply a single thing.',
      },
      {
        q: 'What industries do you serve?',
        a: 'We serve offices, retail stores, medical practices, gyms, schools and more across four provinces.',
      },
    ],
  },

  // ─── 3. DEEP CLEANING ──────────────────────────────────────────────────────
  {
    slug: 'deep-cleaning',
    navLabel: 'Deep Cleaning',
    navDesc: 'Thorough top-to-bottom clean',
    Icon: Sparkles,
    accentColor: '#7C3AED',
    accentLight: '#FDF4FF',
    title: 'Deep Cleaning',
    tagline: 'Top to Bottom. Inside Out.',
    heroDesc:
      'Our deep clean goes far beyond the surface. We tackle everything that regular cleaning skips — inside appliances, behind furniture, grout lines, and every forgotten corner your home deserves to have refreshed.',
    whatWeClean: [
      'Inside oven, microwave, fridge & dishwasher',
      'Cabinet interiors — kitchen and bathroom',
      'Grout scrubbing — tiles, shower & backsplash',
      'Behind and under all furniture & appliances',
      'Blind & shutter deep cleaning',
      'Wall washing — scuffs, marks & fingerprints',
      'Ceiling fans, vents & light fixture detail',
      'Full baseboard, trim & door frame scrub',
      'Window interiors — frames, tracks & glass',
      'All floors — scrub, sanitise & polish',
    ],
    features: [
      {
        title: 'Perfect Seasonal Reset',
        desc: 'Ideal for spring cleaning, post-renovation, post-party, or whenever your home needs a full reset.',
      },
      {
        title: '40-Point Checklist',
        desc: 'Our proprietary protocol ensures every surface, corner and crevice is addressed.',
      },
      {
        title: '4–6 Hour Service',
        desc: 'A deep clean takes time done right. We allocate a full half-day so nothing gets rushed.',
      },
      {
        title: 'Hospital-Grade Sanitisation',
        desc: 'Bathrooms and kitchens are sanitised to food-safe and hygienic standards.',
      },
    ],
    pricing: [
      {
        name: 'Apartment',
        price: '$179',
        period: '/session',
        highlight: false,
        features: ['1–2 bedrooms', 'Up to 900 sq ft', '40-point checklist', 'Appliance interiors'],
      },
      {
        name: 'House',
        price: '$279',
        period: '/session',
        highlight: true,
        features: ['3–4 bedrooms', 'Up to 2,500 sq ft', '40-point checklist', 'Appliance interiors', 'Blind cleaning', 'Wall washing'],
      },
      {
        name: 'Large Home',
        price: '$399',
        period: '/session',
        highlight: false,
        features: ['5+ bedrooms', 'Unlimited sq ft', '40-point checklist', 'Full scope', 'Priority booking', 'Follow-up included'],
      },
    ],
    faq: [
      {
        q: 'How often should I book a deep clean?',
        a: 'Most clients book once or twice per year, often in spring and autumn, or before major events.',
      },
      {
        q: 'How long does a deep clean take?',
        a: 'Typically 4–6 hours depending on size and condition. We will give you an honest estimate at booking.',
      },
      {
        q: 'Do I need to move furniture beforehand?',
        a: 'No — our team handles furniture movement as part of the service. Just flag any fragile or very heavy pieces.',
      },
    ],
  },

  // ─── 4. MOVE-IN / MOVE-OUT ─────────────────────────────────────────────────
  {
    slug: 'move-in-move-out-cleaning',
    navLabel: 'Move-In/Out Cleaning',
    navDesc: 'Fresh start for every transition',
    Icon: Truck,
    accentColor: '#059669',
    accentLight: '#F0FDF4',
    title: 'Move-In / Move-Out Cleaning',
    tagline: 'Every Transition, a Fresh Start',
    heroDesc:
      'Whether you are handing back the keys or welcoming a new chapter, our move clean is thorough enough to satisfy the most demanding landlord inspection — and protect every dollar of your damage deposit.',
    whatWeClean: [
      'All cupboards & drawers — inside and out',
      'Oven, fridge, microwave & dishwasher interiors',
      'All bathroom fixtures — deep scrub & sanitise',
      'Walls — scuff marks, stains & fingerprints',
      'All floors — scrub, sanitise & polish',
      'Windows — glass, frames, sills & tracks',
      'Blinds, curtain rails & light fixtures',
      'Baseboards, doors & door frames full detail',
      'Garage floor sweep & wipe',
      'Final inspection walk-through with checklist',
    ],
    features: [
      {
        title: 'Deposit Protection',
        desc: 'Our move-out standard is built specifically to meet landlord inspection requirements across all four provinces.',
      },
      {
        title: 'Completion Certificate',
        desc: 'We provide a signed checklist you can present directly to your landlord or property manager.',
      },
      {
        title: 'Flexible Timing',
        desc: 'We work around your move date — same-day and next-day bookings available for urgent situations.',
      },
      {
        title: 'Empty or Furnished',
        desc: 'We clean occupied or completely empty properties with equal thoroughness.',
      },
    ],
    pricing: [
      {
        name: 'Studio / 1BR',
        price: '$199',
        period: '/clean',
        highlight: false,
        features: ['Up to 700 sq ft', 'Full move checklist', 'Appliance interiors', 'Certificate included'],
      },
      {
        name: '2–3 Bedroom',
        price: '$299',
        period: '/clean',
        highlight: true,
        features: ['Up to 1,800 sq ft', 'Full move checklist', 'Appliance interiors', 'Certificate included', 'Wall washing', 'Garage included'],
      },
      {
        name: '4+ Bedroom',
        price: '$399',
        period: '/clean',
        highlight: false,
        features: ['Unlimited sq ft', 'Full move checklist', 'Appliance interiors', 'Certificate included', 'Wall washing', 'Garage + exterior entry'],
      },
    ],
    faq: [
      {
        q: 'Will this guarantee my deposit back?',
        a: 'Our standard meets all provincial tenancy requirements and we have a 97% deposit-recovery rate among clients who book before inspection.',
      },
      {
        q: 'How far in advance should I book?',
        a: 'We recommend 48–72 hours before your move-out date, but we offer same-day service when availability allows.',
      },
      {
        q: 'What if my landlord disputes something?',
        a: 'We offer a free re-clean within 48 hours if any item on our checklist is disputed during inspection.',
      },
    ],
  },
];

// ── Helper used in the dynamic page ──────────────────────────────────────────
export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find(s => s.slug === slug);
}