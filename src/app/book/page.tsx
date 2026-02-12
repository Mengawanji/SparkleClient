import { BookingForm } from "@/src/components/booking-form";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Cleaning Service
          </h1>
          <p className="text-lg text-gray-600">
            Fill out the form below to schedule your cleaning appointment
          </p>
        </div>

        <BookingForm />
      </div>
    </div>
  );
}