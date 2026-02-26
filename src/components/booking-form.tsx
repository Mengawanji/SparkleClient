'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, type BookingFormSchema } from '@/lib/validations';
import { createBooking, ApiError } from '@/lib/api';
import { CleaningType } from '@/types';
import { CLEANING_TYPE_LABELS } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PriceCalculator } from './price-calculator';

const MAX_NOTES = 250;

// ── inline SVG icon ────────────────────────────────────────────────────────
function Icon({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d={d} />
    </svg>
  );
}

const icons = {
  user:     'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  email:    'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
  phone:    'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.82 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z',
  home:     'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10',
  bed:      'M2 4v16M2 8h18a2 2 0 0 1 2 2v10H2V8zM6 8V4',
  bath:     'M9 6 C9 4.34 7.66 3 6 3 4.34 3 3 4.34 3 6V11H21V15C21 18.31 18.31 21 15 21H9C5.69 21 3 18.31 3 15V11',
  broom:    'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
  calendar: 'M3 4h18v18H3zM16 2v4M8 2v4M3 10h18',
  clock:    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  pencil:   'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z',
  check:    'M20 6L9 17l-5-5',
  lock:     'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4',
  card:     'M1 4h22v16H1zM1 10h22',
  refresh:  'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
  star:     'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  shield:   'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  sparkle:  'M12 3l1.5 4.5H18l-3.75 2.75 1.5 4.5L12 12l-3.75 2.75 1.5-4.5L6 7.5h4.5z',
};

// ── field icon ─────────────────────────────────────────────────────────────
function FieldIcon({ iconPath }: { iconPath: string }) {
  return (
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3B4FCC] pointer-events-none">
      <Icon d={iconPath} size={15} />
    </span>
  );
}

function CheckIcon() {
  return (
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none">
      <Icon d={icons.check} size={14} />
    </span>
  );
}

// ── section card ───────────────────────────────────────────────────────────
function SectionCard({
  iconPath,
  title,
  children,
}: {
  iconPath: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-[#EEF2FF] to-white">
        <span className="text-[#3B4FCC]">
          <Icon d={iconPath} size={16} />
        </span>
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="px-5 py-4 space-y-4">{children}</div>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────
export function BookingForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      numberOfBedrooms: 2,
      numberOfBathrooms: 1,
      cleaningType: CleaningType.REGULAR,
    },
  });

  const watchedValues = watch();
  const additionalNotes = watch('additionalNotes') ?? '';
  const charsUsed = additionalNotes.length;
  const charsRemaining = MAX_NOTES - charsUsed;

  const showPriceCalculator =
    watchedValues.cleaningType &&
    watchedValues.numberOfBedrooms >= 0 &&
    watchedValues.numberOfBathrooms >= 1;

  const onSubmit = async (data: BookingFormSchema) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const booking = await createBooking(data);
      router.push(`/success?bookingId=${booking.id}`);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setIsSubmitting(false);
    }
  };

  const inp = (hasError: boolean) =>
    `pl-9 pr-9 h-10 text-sm rounded-xl border ${
      hasError
        ? 'border-red-400 focus:ring-red-300'
        : 'border-gray-200 focus:ring-[#3B4FCC]/20'
    } focus:outline-none focus:ring-2 transition w-full bg-white`;

  const fullNameFilled = !!watchedValues.fullName;
  const emailFilled    = !!watchedValues.email;
  const addressFilled  = !!watchedValues.address;

  return (
    <>
      {/* ── Background ── */}
      <div
        className="min-h-screen relative"
        style={{
          background: 'linear-gradient(160deg, #EEF2FF 0%, #f8f9ff 40%, #f0f4f8 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div
          aria-hidden
          style={{
            position: 'fixed',
            top: '-120px',
            right: '-120px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,79,204,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'fixed',
            bottom: '-80px',
            left: '-80px',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,197,147,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ── Page content ── */}
        <div className="relative z-10 py-10 px-4 sm:px-6 lg:px-8">

          {/* Header — same max-width as nav/footer */}
          <div className="max-w-7xl mx-auto mb-8">
            {/* Eyebrow */}
            <p className="text-xs font-semibold tracking-widest text-[#3B4FCC] uppercase mb-2 flex items-center gap-1.5">
              <Icon d={icons.sparkle} size={12} />
              Professional Cleaning Services
            </p>
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
              Schedule With Us
            </h1>
          </div>

          {/* ── Form grid — matches max-w-7xl ── */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start"
          >
            {/* ── LEFT COLUMN ── */}
            <div className="space-y-5">

              {/* Personal Information */}
              <SectionCard iconPath={icons.user} title="Personal Information">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Full name</label>
                  <div className="relative">
                    <FieldIcon iconPath={icons.user} />
                    <input
                      {...register('fullName')}
                      placeholder="John Doe"
                      className={inp(!!errors.fullName)}
                    />
                    {fullNameFilled && !errors.fullName && <CheckIcon />}
                  </div>
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                  <div className="relative">
                    <FieldIcon iconPath={icons.email} />
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="john.doe@example.com"
                      className={inp(!!errors.email)}
                    />
                    {emailFilled && !errors.email && <CheckIcon />}
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                  <div className="relative">
                    <FieldIcon iconPath={icons.phone} />
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="(555) 123-4567"
                      className={inp(!!errors.phone)}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Icon d={icons.check} size={11} />
                    optional – for urgent contact
                  </p>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Full home address</label>
                  <div className="relative">
                    <FieldIcon iconPath={icons.home} />
                    <input
                      {...register('address')}
                      placeholder="123 Main St, Apt 4B, New York, NY 10001"
                      className={inp(!!errors.address)}
                    />
                    {addressFilled && !errors.address && <CheckIcon />}
                  </div>
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
                </div>
              </SectionCard>

              {/* Service Details */}
              <SectionCard iconPath={icons.broom} title="Service Details">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Cleaning type</label>
                  <Select
                    defaultValue={CleaningType.REGULAR}
                    onValueChange={(value) => setValue('cleaningType', value as CleaningType)}
                  >
                    <SelectTrigger
                      className={`h-10 text-sm rounded-xl border ${
                        errors.cleaningType ? 'border-red-400' : 'border-gray-200'
                      } bg-white focus:ring-2 focus:ring-[#3B4FCC]/20`}
                    >
                      <span className="flex items-center gap-2 text-gray-600">
                        <span className="text-[#3B4FCC]">
                          <Icon d={icons.broom} size={14} />
                        </span>
                        <SelectValue placeholder="Select cleaning type" />
                      </span>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {Object.values(CleaningType).map((type) => (
                        <SelectItem key={type} value={type} className="text-sm">
                          {CLEANING_TYPE_LABELS[type]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.cleaningType && (
                    <p className="text-xs text-red-500 mt-1">{errors.cleaningType.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Bedrooms</label>
                    <div className="relative">
                      <FieldIcon iconPath={icons.bed} />
                      <input
                        type="number"
                        min="0"
                        {...register('numberOfBedrooms', { valueAsNumber: true })}
                        className={`${inp(!!errors.numberOfBedrooms)} pr-16`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                        rooms
                      </span>
                    </div>
                    {errors.numberOfBedrooms && (
                      <p className="text-xs text-red-500 mt-1">{errors.numberOfBedrooms.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Bathrooms</label>
                    <div className="relative">
                      <FieldIcon iconPath={icons.bath} />
                      <input
                        type="number"
                        min="1"
                        {...register('numberOfBathrooms', { valueAsNumber: true })}
                        className={`${inp(!!errors.numberOfBathrooms)} pr-12`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                        bath
                      </span>
                    </div>
                    {errors.numberOfBathrooms && (
                      <p className="text-xs text-red-500 mt-1">{errors.numberOfBathrooms.message}</p>
                    )}
                  </div>
                </div>
              </SectionCard>

              {/* Scheduling */}
              <SectionCard iconPath={icons.calendar} title="Scheduling">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Preferred date</label>
                    <div className="relative">
                      <FieldIcon iconPath={icons.calendar} />
                      <input
                        type="date"
                        {...register('preferredDate')}
                        min={new Date().toISOString().split('T')[0]}
                        className={inp(!!errors.preferredDate)}
                      />
                    </div>
                    {errors.preferredDate && (
                      <p className="text-xs text-red-500 mt-1">{errors.preferredDate.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Preferred time</label>
                    <div className="relative">
                      <FieldIcon iconPath={icons.clock} />
                      <input
                        type="time"
                        {...register('preferredTime')}
                        className={inp(!!errors.preferredTime)}
                      />
                    </div>
                    {errors.preferredTime && (
                      <p className="text-xs text-red-500 mt-1">{errors.preferredTime.message}</p>
                    )}
                  </div>
                </div>
              </SectionCard>

              {/* Special Requests */}
              <SectionCard iconPath={icons.pencil} title="Special Requests or Notes">
                <div>
                  <Textarea
                    {...register('additionalNotes')}
                    placeholder="Let us know if you have any special requirements, areas to focus on, access instructions..."
                    rows={4}
                    className={`text-sm rounded-xl border resize-none w-full p-3 focus:outline-none focus:ring-2 transition ${
                      errors.additionalNotes || charsRemaining < 0
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-[#3B4FCC]/20'
                    }`}
                  />
                  {errors.additionalNotes && (
                    <p className="text-xs text-red-500 mt-1">{errors.additionalNotes.message}</p>
                  )}
                  <div className="flex justify-between items-start mt-1.5">
                    <p className="text-xs text-[#3B4FCC]">
                      Examples: focus on kitchen, need to use service entrance, allergic to certain products.
                    </p>
                    <p className={`text-xs tabular-nums shrink-0 ml-4 ${
                      charsRemaining < 0 ? 'text-red-500 font-medium' :
                      charsRemaining < 100 ? 'text-amber-500' : 'text-gray-400'
                    }`}>
                      {charsUsed}/{MAX_NOTES}
                    </p>
                  </div>
                </div>
              </SectionCard>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN (sticky price + CTA) ── */}
            <div className="lg:sticky lg:top-6 space-y-4">

              {showPriceCalculator && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-[#EEF2FF] to-white">
                    <span className="text-[#3B4FCC]">
                      <Icon d={icons.card} size={16} />
                    </span>
                    <h2 className="text-sm font-semibold text-gray-800">Price Estimate</h2>
                  </div>

                  <div className="px-5 py-4">
                    <PriceCalculator
                      cleaningType={watchedValues.cleaningType}
                      bedrooms={watchedValues.numberOfBedrooms}
                      bathrooms={watchedValues.numberOfBathrooms}
                    />
                  </div>

                  {/* Cleaning type badge */}
                  <div className="px-5 pb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs bg-[#EEF2FF] text-[#3B4FCC] font-medium px-3 py-1.5 rounded-full border border-[#c7d0f8]">
                      <Icon d={icons.broom} size={11} />
                      {CLEANING_TYPE_LABELS[watchedValues.cleaningType]}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="px-5 pb-5 pt-1 space-y-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 rounded-xl bg-[#3B4FCC] hover:bg-[#2f42b8] active:scale-[.98] transition text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <Icon d={icons.calendar} size={15} />
                      {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                    </button>
                    <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
                      <Icon d={icons.lock} size={11} />
                      secure · no payment now
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Icon d={icons.card} size={11} />
                        pay later
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon d={icons.clock} size={11} />
                        60s booking
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Minimal CTA when price calc not ready */}
              {!showPriceCalculator && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-5 space-y-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 rounded-xl bg-[#3B4FCC] hover:bg-[#2f42b8] transition text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Icon d={icons.calendar} size={15} />
                    {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                  </button>
                  <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
                    <Icon d={icons.lock} size={11} />
                    secure · no payment now
                  </p>
                </div>
              )}

              {/* Side trust card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 space-y-3">
                <p className="text-xs font-semibold text-gray-700">Why book with us?</p>
                {[
                  { d: icons.check,   label: '100% satisfaction guarantee', color: 'text-emerald-500' },
                  { d: icons.shield,  label: 'Fully insured & bonded team',  color: 'text-[#3B4FCC]'  },
                  { d: icons.refresh, label: 'Free rescheduling anytime',    color: 'text-gray-400'    },
                  { d: icons.star,    label: '4.9★ rated by 800+ customers', color: 'text-amber-400'   },
                ].map(({ d, label, color }) => (
                  <div key={label} className="flex items-center gap-2.5 text-xs text-gray-600">
                    <span className={color}><Icon d={d} size={13} /></span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </form>

          {/* ── Footer trust bar — same max-w-7xl ── */}
          <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
            <div className="flex flex-wrap items-center gap-5">
              <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
                <Icon d={icons.check} size={12} />
                100% satisfaction
              </span>
              <span className="flex items-center gap-1.5">
                <Icon d={icons.shield} size={12} />
                insured &amp; bonded
              </span>
              <span className="flex items-center gap-1.5">
                <Icon d={icons.refresh} size={12} />
                easy reschedule
              </span>
            </div>
            <span className="flex items-center gap-1 text-[#3B4FCC] font-semibold">
              <Icon d={icons.sparkle} size={12} />
              Sandy's Sparkle Touch @2026
            </span>
          </div>
        </div>
      </div>
    </>
  );
}