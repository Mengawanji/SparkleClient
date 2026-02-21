import { BookingFormData, BookingResponse } from '../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function createBooking(data: BookingFormData): Promise<BookingResponse> {
  try {
    console.log('Sending booking request to:', `${API_BASE_URL}/bookings`)
    console.log('Booking data:', data)

    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Response status:', response.status)

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      console.error('API Error:', error)
      throw new ApiError(
        response.status,
        error.message || 'Failed to create booking',
        error.errors
      );
    }

    const result = await response.json();
    console.log('Booking created successfully:', result)
    return result
  } catch (error) {
    console.error('Network error:', error)
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(0, 'Network error. Please check if the backend is running.');
  }
}

export async function getBookings(page = 1, limit = 20) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/bookings?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new ApiError(response.status, 'Failed to fetch bookings');
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching bookings:', error)
    throw error
  }
}

// Health check function
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`)
    return response.ok || response.status === 404; // 404 is ok, means API is running
  } catch (error) {
    console.error('API health check failed:', error)
    return false
  }
}