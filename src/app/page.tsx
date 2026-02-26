import { HeroSection } from '../components/hero-section';
import HomePageSections from '../components/homepage-section';
import ServicesSection from '../components/service-section';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection/>
      <HomePageSections/>
    </div>
  );
}