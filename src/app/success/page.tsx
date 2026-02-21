'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <CardTitle className="text-3xl">Booking Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-gray-600 text-lg">
              Thank you for booking with CleanHome Services. We've sent a
              confirmation email with all the details.
            </p>

            {bookingId && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p className="text-sm text-gray-600 text-center">
                  Booking ID:{' '}
                  <span className="font-mono font-semibold text-blue-700">
                    {bookingId}
                  </span>
                </p>
              </div>
            )}

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">What's Next?</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">📧</span>
                  Check your email for the booking confirmation and invoice
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📅</span>
                  Our team will arrive on your scheduled date and time
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🧹</span>
                  Enjoy a spotlessly clean home!
                </li>
              </ul>
            </div>

            <div className="flex justify-center pt-4">
              <Link href="/">
                <Button size="lg">Return to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}