// src/components/hero-section.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Professional Home Cleaning
            <br />
            <span className="text-blue-200">Made Simple</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Experience the difference of a spotless home. 
            Book your cleaning service in minutes with transparent pricing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
                Book a Cleaning Now
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-2">✨</div>
              <h3 className="font-semibold text-lg mb-2">Professional Team</h3>
              <p className="text-blue-100">Trained and vetted cleaning experts</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💰</div>
              <h3 className="font-semibold text-lg mb-2">Transparent Pricing</h3>
              <p className="text-blue-100">Know the cost before you book</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🛡️</div>
              <h3 className="font-semibold text-lg mb-2">Satisfaction Guaranteed</h3>
              <p className="text-blue-100">We stand behind our work</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}