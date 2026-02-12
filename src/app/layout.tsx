import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CleanHome Services - Professional Home Cleaning',
  description: 'Book professional home cleaning services with transparent pricing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">🧹 CleanHome</span>
              </div>
              <div className="flex space-x-4">
                <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                  Home
                </a>
                <a href="/book" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </nav>
        
        <main>{children}</main>
        
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-gray-600">
              © 2024 CleanHome Services. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}