import { BookingFormData, BookingResponse } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function createBooking(data: BookingFormData): Promise<BookingResponse> {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      error.message || 'Failed to create booking',
      error.errors
    );
  }

  return response.json();
}

export async function getBookings(page = 1, limit = 20) {
  const response = await fetch(
    `${API_BASE_URL}/bookings?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch bookings');
  }

  return response.json();
}