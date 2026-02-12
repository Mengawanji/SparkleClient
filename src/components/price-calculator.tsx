'use client';

import { CleaningType } from '@/types';
import { calculatePrice, formatCurrency, CLEANING_TYPE_LABELS } from '@/lib/utils'; 
import { Card, CardContent } from '@/components/ui/card';

interface PriceCalculatorProps {
  cleaningType: CleaningType;
  bedrooms: number;
  bathrooms: number;
}

export function PriceCalculator({
  cleaningType,
  bedrooms,
  bathrooms,
}: PriceCalculatorProps) {
  const pricing = calculatePrice(cleaningType, bedrooms, bathrooms);

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Price Estimate
        </h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Bedrooms ({bedrooms} × ${pricing.bedroomPrice / (bedrooms || 1)})
            </span>
            <span className="font-medium text-gray-900">
              {formatCurrency(pricing.bedroomPrice)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Bathrooms ({bathrooms} × ${pricing.bathroomPrice / bathrooms})
            </span>
            <span className="font-medium text-gray-900">
              {formatCurrency(pricing.bathroomPrice)}
            </span>
          </div>

          <div className="border-t border-blue-300 my-3"></div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(pricing.totalPrice)}
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {CLEANING_TYPE_LABELS[cleaningType]}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}