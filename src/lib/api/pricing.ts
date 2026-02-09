import { Service } from "@/types";

export interface PricingFactors {
  serviceId: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  extras?: string[];
}

export interface PriceBreakdown {
  basePrice: number;
  bedroomAddOn: number;
  bathroomAddOn: number;
  squareFootageAddOn: number;
  extrasTotal: number;
  subtotal: number;
  tax: number;
  total: number;
}

/**
 * Pricing configuration
 */
const PRICING_CONFIG = {
  // Add-ons per item
  perBedroom: 15, // $15 per bedroom beyond base (2 bedrooms)
  perBathroom: 20, // $20 per bathroom beyond base (1 bathroom)
  perSquareFoot: 0.05, // $0.05 per sq ft beyond base (1000 sq ft)

  // Base thresholds (included in base price)
  baseBedrooms: 2,
  baseBathrooms: 1,
  baseSquareFootage: 1000,

  // Tax rate
  taxRate: 0.08, // 8% sales tax

  // Extra services
  extras: {
    "inside-fridge": { name: "Inside Refrigerator", price: 25 },
    "inside-oven": { name: "Inside Oven", price: 30 },
    "inside-cabinets": { name: "Inside Cabinets", price: 40 },
    "laundry": { name: "Laundry (1 load)", price: 20 },
    "windows": { name: "Window Cleaning", price: 50 },
    "deep-carpet": { name: "Deep Carpet Cleaning", price: 75 },
  },
};

/**
 * Calculate price breakdown based on factors
 */
export function calculatePrice(
  factors: PricingFactors,
  services: Service[]
): PriceBreakdown {
  // Find the selected service
  const service = services.find((s) => s.id === factors.serviceId);

  if (!service) {
    // Return zero breakdown if service not found
    return {
      basePrice: 0,
      bedroomAddOn: 0,
      bathroomAddOn: 0,
      squareFootageAddOn: 0,
      extrasTotal: 0,
      subtotal: 0,
      tax: 0,
      total: 0,
    };
  }

  // Base price from service
  const basePrice = Number(service.basePrice);

  // Calculate bedroom add-on
  const additionalBedrooms = Math.max(
    0,
    (factors.bedrooms || PRICING_CONFIG.baseBedrooms) -
      PRICING_CONFIG.baseBedrooms
  );
  const bedroomAddOn = additionalBedrooms * PRICING_CONFIG.perBedroom;

  // Calculate bathroom add-on
  const additionalBathrooms = Math.max(
    0,
    (factors.bathrooms || PRICING_CONFIG.baseBathrooms) -
      PRICING_CONFIG.baseBathrooms
  );
  const bathroomAddOn = additionalBathrooms * PRICING_CONFIG.perBathroom;

  // Calculate square footage add-on
  const additionalSquareFootage = Math.max(
    0,
    (factors.squareFootage || PRICING_CONFIG.baseSquareFootage) -
      PRICING_CONFIG.baseSquareFootage
  );
  const squareFootageAddOn =
    additionalSquareFootage * PRICING_CONFIG.perSquareFoot;

  // Calculate extras total
  const extrasTotal =
    factors.extras?.reduce((total, extraId) => {
      const extra = PRICING_CONFIG.extras[extraId as keyof typeof PRICING_CONFIG.extras];
      return total + (extra?.price || 0);
    }, 0) || 0;

  // Calculate subtotal
  const subtotal =
    basePrice +
    bedroomAddOn +
    bathroomAddOn +
    squareFootageAddOn +
    extrasTotal;

  // Calculate tax
  const tax = subtotal * PRICING_CONFIG.taxRate;

  // Calculate total
  const total = subtotal + tax;

  return {
    basePrice,
    bedroomAddOn,
    bathroomAddOn,
    squareFootageAddOn,
    extrasTotal,
    subtotal,
    tax,
    total: Math.round(total * 100) / 100, // Round to 2 decimal places
  };
}

/**
 * Get available extra services
 */
export function getAvailableExtras() {
  return Object.entries(PRICING_CONFIG.extras).map(([id, details]) => ({
    id,
    ...details,
  }));
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Get pricing configuration (for display purposes)
 */
export function getPricingConfig() {
  return PRICING_CONFIG;
}