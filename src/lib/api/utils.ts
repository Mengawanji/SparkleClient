import { CleaningType, PricingRates, PriceCalculation } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PRICING_RATES: Record<CleaningType, PricingRates> = {
  [CleaningType.REGULAR]: {
    bedroomRate: 20,
    bathroomRate: 15,
  },
  [CleaningType.DEEP]: {
    bedroomRate: 22,
    bathroomRate: 18,
  },
  [CleaningType.MOVE_OUT_MOVE_IN]: {
    bedroomRate: 25,
    bathroomRate: 20,
  },
};

export function calculatePrice(
  cleaningType: CleaningType,
  bedrooms: number,
  bathrooms: number
): PriceCalculation {
  const rates = PRICING_RATES[cleaningType];

  const bedroomPrice = bedrooms * rates.bedroomRate;
  const bathroomPrice = bathrooms * rates.bathroomRate;
  const totalPrice = bedroomPrice + bathroomPrice;

  return {
    bedroomPrice,
    bathroomPrice,
    totalPrice,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export const CLEANING_TYPE_LABELS: Record<CleaningType, string> = {
  [CleaningType.REGULAR]: 'Regular Cleaning',
  [CleaningType.DEEP]: 'Deep Cleaning',
  [CleaningType.MOVE_OUT_MOVE_IN]: 'Move-out / Move-in Cleaning',
};