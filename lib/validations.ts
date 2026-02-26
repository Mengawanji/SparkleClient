import { z } from 'zod';
import { CleaningType } from '../types';

export const bookingSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .union([
      z.string().length(0), // empty string
      z.string().regex(/^(?:\+1)?[\s.-]*\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}$/, {
        message: "Please enter valid phone number ((555) 123-4567 or 555-123-4567)"
      })
    ])
    .optional()
    .transform(e => e === "" ? undefined : e),
  address: z
    .string()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must be less than 200 characters'),
  cleaningType: z.nativeEnum(CleaningType, {
    errorMap: () => ({ message: 'Please select a cleaning type' }),
  }),
  numberOfBedrooms: z
    .number()
    .int()
    .min(0, 'Must have at least 0 bedrooms')
    .max(20, 'Maximum 20 bedrooms allowed'),
  numberOfBathrooms: z
    .number()
    .int()
    .min(1, 'Must have at least 1 bathroom')
    .max(20, 'Maximum 20 bathrooms allowed'),
  preferredDate: z.string().refine(
    (date) => {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    },
    { message: 'Date must be today or in the future' }
  ),
  preferredTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (use HH:MM)'),
  additionalNotes: z
    .string()
    .max(1000, 'Notes must be less than 250 characters')
    .optional()
    .or(z.literal('')),
});

export type BookingFormSchema = z.infer<typeof bookingSchema>;