export enum CleaningType {
  REGULAR = 'REGULAR',
  DEEP = 'DEEP',
  MOVE_OUT_MOVE_IN = 'MOVE_OUT_MOVE_IN',
}

export interface BookingFormData {
  fullName: string;
  email: string;
  address: string;
  cleaningType: CleaningType;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  preferredDate: string;
  preferredTime: string;
}

export interface PricingRates {
  bedroomRate: number;
  bathroomRate: number;
}

export interface PriceCalculation {
  bedroomPrice: number;
  bathroomPrice: number;
  totalPrice: number;
}

export interface BookingResponse {
  id: string;
  fullName: string;
  email: string;
  address: string;
  cleaningType: CleaningType;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  preferredDate: Date;
  preferredTime: string;
  pricing: PriceCalculation;
  status: string;
  createdAt: Date;
}