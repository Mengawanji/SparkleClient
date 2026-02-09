import axios, { AxiosError } from "axios";
import {
  CreateBookingInput,
  CreateBookingResponse,
  Service,
  ApiResponse,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error("Network Error:", error.message);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Get all available services
 */
export async function getServices(): Promise<Service[]> {
  try {
    const response = await apiClient.get<Service[]>("/services");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    throw error;
  }
}

/**
 * Create a new booking
 */
export async function createBooking(
  data: CreateBookingInput
): Promise<CreateBookingResponse> {
  try {
    const response = await apiClient.post<CreateBookingResponse>(
      "/bookings",
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Extract error message from response
      const apiError = error.response.data as any;
      throw new Error(apiError.message || "Failed to create booking");
    }
    throw new Error("Network error. Please try again.");
  }
}

/**
 * Get booking by reference number
 */
export async function getBookingByReference(
  reference: string
): Promise<ApiResponse<any>> {
  try {
    const response = await apiClient.get(`/bookings/${reference}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Failed to fetch booking:", error);
    throw error;
  }
}

/**
 * Check if time slot is available
 */
export async function checkAvailability(
  date: string,
  time: string
): Promise<boolean> {
  try {
    // This would be a real API call in production
    // For now, we'll assume all slots are available
    // The backend will validate on submission
    return true;
  } catch (error) {
    console.error("Failed to check availability:", error);
    return false;
  }
}

export { apiClient };