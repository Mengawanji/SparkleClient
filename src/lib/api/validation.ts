import { z } from "zod";
import { addDays, isBefore, startOfDay } from "date-fns";

/**
 * Comprehensive validation schema for booking form
 */
export const bookingFormSchema = z.object({
  // Customer Information
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(100, "First name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(100, "Last name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase(),

  phone: z
    .string()
    .regex(
      /^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
      "Please enter a valid phone number (e.g., (555) 123-4567)"
    )
    .transform((val) => {
      // Normalize phone number to E.164 format
      const digits = val.replace(/\D/g, "");
      if (digits.length === 10) {
        return `+1${digits}`;
      }
      return `+${digits}`;
    }),

  // Address Information
  streetAddress: z
    .string()
    .min(5, "Street address must be at least 5 characters")
    .max(255, "Street address must be less than 255 characters"),

  apartmentUnit: z
    .string()
    .max(50, "Apartment/unit must be less than 50 characters")
    .optional()
    .or(z.literal("")),

  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(100, "City must be less than 100 characters"),

  stateProvince: z
    .string()
    .min(2, "State/Province is required")
    .max(100, "State/Province must be less than 100 characters"),

  postalCode: z
    .string()
    .regex(
      /^[0-9]{5}(-[0-9]{4})?$/,
      "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)"
    ),

  country: z.string().default("US"),

  // Service Selection
  serviceId: z.string().min(1, "Please select a service"),

  // Scheduling
  scheduledDate: z
    .date({
      required_error: "Please select a date",
      invalid_type_error: "Please select a valid date",
    })
    .refine(
      (date) => {
        const tomorrow = addDays(startOfDay(new Date()), 1);
        return !isBefore(date, tomorrow);
      },
      {
        message: "Booking must be at least 1 day in advance",
      }
    )
    .refine(
      (date) => {
        const maxDate = addDays(startOfDay(new Date()), 90);
        return isBefore(date, maxDate);
      },
      {
        message: "Bookings can only be made up to 90 days in advance",
      }
    ),

  scheduledTime: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, "Please select a valid time")
    .refine(
      (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        // Business hours: 8:00 AM - 6:00 PM
        return hours >= 8 && hours < 18;
      },
      {
        message: "Bookings are only available between 8:00 AM and 6:00 PM",
      }
    )
    .refine(
      (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        // Only allow on the hour or half-hour
        return minutes === 0 || minutes === 30;
      },
      {
        message: "Please select a time on the hour or half-hour (e.g., 10:00, 10:30)",
      }
    ),

  // Property Details (for pricing)
  bedrooms: z.number().min(1, "At least 1 bedroom required").max(10, "Maximum 10 bedrooms").optional(),
  bathrooms: z.number().min(1, "At least 1 bathroom required").max(10, "Maximum 10 bathrooms").optional(),
  squareFootage: z.number().min(100, "Minimum 100 sq ft").max(10000, "Maximum 10,000 sq ft").optional(),

  // Extras
  extras: z.array(z.string()).optional().default([]),

  // Optional Fields
  specialInstructions: z
    .string()
    .max(1000, "Special instructions must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

/**
 * Default values for the form
 */
export const defaultFormValues: Partial<BookingFormData> = {
  country: "US",
  bedrooms: 2,
  bathrooms: 1,
  squareFootage: 1000,
  extras: [],
  specialInstructions: "",
  apartmentUnit: "",
};