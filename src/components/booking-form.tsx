'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, type BookingFormSchema } from '@/lib/validations';
import { createBooking, ApiError } from '@/lib/api';
import { CleaningType } from '@/types';
import { CLEANING_TYPE_LABELS } from '@lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PriceCalculator } from '@/components/price-calculator';

export function BookingForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
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

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                {...register('fullName')}
                placeholder="John Doe"
                className={errors.fullName ? 'border-red-500' : ''}
              />
              {errors.fullName && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="john.doe@example.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Full Home Address *</Label>
              <Input
                id="address"
                {...register('address')}
                placeholder="123 Main St, Apt 4B, New York, NY 10001"
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cleaningType">Cleaning Type *</Label>
              <Select
                id="cleaningType"
                {...register('cleaningType')}
                className={errors.cleaningType ? 'border-red-500' : ''}
              >
                <option value="">Select cleaning type</option>
                {Object.values(CleaningType).map((type) => (
                  <option key={type} value={type}>
                    {CLEANING_TYPE_LABELS[type]}
                  </option>
                ))}
              </Select>
              {errors.cleaningType && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.cleaningType.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numberOfBedrooms">Number of Bedrooms *</Label>
                <Input
                  id="numberOfBedrooms"
                  type="number"
                  min="0"
                  {...register('numberOfBedrooms', { valueAsNumber: true })}
                  className={errors.numberOfBedrooms ? 'border-red-500' : ''}
                />
                {errors.numberOfBedrooms && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.numberOfBedrooms.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="numberOfBathrooms">Number of Bathrooms *</Label>
                <Input
                  id="numberOfBathrooms"
                  type="number"
                  min="1"
                  {...register('numberOfBathrooms', { valueAsNumber: true })}
                  className={errors.numberOfBathrooms ? 'border-red-500' : ''}
                />
                {errors.numberOfBathrooms && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.numberOfBathrooms.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduling</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredDate">Preferred Date *</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  {...register('preferredDate')}
                  min={new Date().toISOString().split('T')[0]}
                  className={errors.preferredDate ? 'border-red-500' : ''}
                />
                {errors.preferredDate && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.preferredDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="preferredTime">Preferred Time *</Label>
                <Input
                  id="preferredTime"
                  type="time"
                  {...register('preferredTime')}
                  className={errors.preferredTime ? 'border-red-500' : ''}
                />
                {errors.preferredTime && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.preferredTime.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {showPriceCalculator && (
          <PriceCalculator
            cleaningType={watchedValues.cleaningType}
            bedrooms={watchedValues.numberOfBedrooms}
            bathrooms={watchedValues.numberOfBathrooms}
          />
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </form>
    </div>
  );
}