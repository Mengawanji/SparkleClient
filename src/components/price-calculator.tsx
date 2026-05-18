'use client';

import { CleaningType } from '@/types';
import { CLEANING_TYPE_LABELS } from '@/lib/utils';

// ── Types (mirror your PricingService return shapes) ──────────────────────────

interface RegularEstimate {
  pricingModel: 'PER_HOUR';
  estimate: {
    hourlyRate: number;
    estimatedHours: { min: number; max: number };
    estimatedPrice: { min: number; max: number };
  };
  disclaimer: string;
}

interface FlatRateEstimate {
  pricingModel: 'FLAT_RATE';
  estimate: { min: number; max: number | null };
  disclaimer: string;
}

type PriceEstimate = RegularEstimate | FlatRateEstimate;

// ── Pure pricing logic (mirrors PricingService.getEstimate) ───────────────────
// Kept client-side so the calculator is instant with no round-trip.
// If you ever expose a /pricing endpoint, swap this out for a fetch.

const HOURLY_RATE = 40;

const REGULAR_HOURS: Record<string, { min: number; max: number }> = {
  STUDIO_1BED: { min: 2,   max: 2.5 },
  '2BED':      { min: 2.5, max: 3   },
  '3BED':      { min: 3,   max: 4   },
  '4BED_PLUS': { min: 4,   max: 5   },
};

const DEEP_RATES: Record<string, { min: number; max: number | null }> = {
  STUDIO_1BED: { min: 180, max: 250  },
  '2BED':      { min: 220, max: 300  },
  '3BED':      { min: 300, max: 400  },
  '4BED_PLUS': { min: 0,   max: null },
};

const MOVE_OUT_RATES: Record<string, { min: number; max: number | null }> = {
  STUDIO_1BED: { min: 200, max: 280  },
  '2BED':      { min: 280, max: 360  },
  '3BED':      { min: 360, max: 450  },
  '4BED_PLUS': { min: 0,   max: null },
};

const DISCLAIMERS: Record<CleaningType, string> = {
  [CleaningType.REGULAR]:
    'Final charge is actual time logged by the cleaner.',
  [CleaningType.DEEP]:
    'Final price confirmed after walkthrough or photo review. Higher end applies to heavily soiled homes.',
  [CleaningType.MOVE_OUT_MOVE_IN]:
    'Empty units take longer due to full access and landlord inspection standards.',
};

function toCategory(bedrooms: number): string {
  if (bedrooms <= 1) return 'STUDIO_1BED';
  if (bedrooms === 2) return '2BED';
  if (bedrooms === 3) return '3BED';
  return '4BED_PLUS';
}

function getEstimate(cleaningType: CleaningType, bedrooms: number): PriceEstimate {
  const cat = toCategory(bedrooms);

  if (cleaningType === CleaningType.REGULAR) {
    const hours = REGULAR_HOURS[cat];
    return {
      pricingModel: 'PER_HOUR',
      estimate: {
        hourlyRate: HOURLY_RATE,
        estimatedHours: hours,
        estimatedPrice: {
          min: Math.round(hours.min * HOURLY_RATE),
          max: Math.round(hours.max * HOURLY_RATE),
        },
      },
      disclaimer: DISCLAIMERS[CleaningType.REGULAR],
    };
  }

  const rates =
    cleaningType === CleaningType.DEEP ? DEEP_RATES[cat] : MOVE_OUT_RATES[cat];

  return {
    pricingModel: 'FLAT_RATE',
    estimate: rates,
    disclaimer: DISCLAIMERS[cleaningType],
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-blue-200 my-3" />;
}

function Disclaimer({ text }: { text: string }) {
  return (
    <p className="text-xs text-gray-400 leading-relaxed mt-3 pt-3 border-t border-blue-100">
      ⓘ {text}
    </p>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface PriceCalculatorProps {
  cleaningType: CleaningType;
  bedrooms: number;
  // bathrooms intentionally omitted — scheduling only, not used for pricing
}

export function PriceCalculator({ cleaningType, bedrooms }: PriceCalculatorProps) {
  const result = getEstimate(cleaningType, bedrooms);
  const isCustomQuote =
    result.pricingModel === 'FLAT_RATE' && result.estimate.max === null;

  return (
    <div className="space-y-2">

      {/* ── Per-hour model (Regular) ── */}
      {result.pricingModel === 'PER_HOUR' && (
        <>
          <Row label="Rate" value={`${fmt(result.estimate.hourlyRate)} / hr`} />
          <Row
            label="Estimated time"
            value={`~${result.estimate.estimatedHours.min}–${result.estimate.estimatedHours.max} hrs`}
          />
          <Divider />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900 text-sm">Estimated total</span>
            <span className="text-xl font-bold text-blue-600">
              {fmt(result.estimate.estimatedPrice.min)}–{fmt(result.estimate.estimatedPrice.max)}
            </span>
          </div>
        </>
      )}

      {/* ── Flat-rate model (Deep / Move-out) ── */}
      {result.pricingModel === 'FLAT_RATE' && (
        <>
          <Row label="Pricing model" value="Flat rate" />
          <Divider />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900 text-sm">Estimated total</span>
            {isCustomQuote ? (
              <span className="text-sm font-bold text-amber-500 tracking-wide">
                Custom quote
              </span>
            ) : (
              <span className="text-xl font-bold text-blue-600">
                {fmt(result.estimate.min)}–{fmt(result.estimate.max!)}
              </span>
            )}
          </div>
          {isCustomQuote && (
            <p className="text-xs text-amber-600 mt-1">
              We'll reach out to confirm pricing for larger homes.
            </p>
          )}
        </>
      )}

      <Disclaimer text={result.disclaimer} />
    </div>
  );
}