import { HeroSection } from '../components/hero-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CleaningType } from '@/types';
import { CLEANING_TYPE_LABELS, PRICING_RATES, formatCurrency  } from '@/lib/utils';
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Our Cleaning Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.values(CleaningType).map((type) => {
              const rates = PRICING_RATES[type];
              return (
                <Card key={type} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {CLEANING_TYPE_LABELS[type]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600">
                        {formatCurrency(rates.bedroomRate)} per bedroom
                      </p>
                      <p className="text-gray-600">
                        {formatCurrency(rates.bathroomRate)} per bathroom
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {type === CleaningType.REGULAR &&
                        'Perfect for regular maintenance and upkeep'}
                      {type === CleaningType.DEEP &&
                        'Thorough cleaning for every corner of your home'}
                      {type === CleaningType.MOVE_OUT_MOVE_IN &&
                        'Complete cleaning for moving transitions'}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}