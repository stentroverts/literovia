import StarField from '@/components/StarField';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AmazingRaceSection from '@/components/AmazingRaceSection';
import ScheduleSection from '@/components/ScheduleSection';
import RegisterSection from '@/components/RegisterSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Animated Star Background */}
      <StarField />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <div className="wave">
          <div className="paperback-bg">
            <AmazingRaceSection />
            <ScheduleSection />
            <RegisterSection />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-crimson/20">
        <div className="container mx-auto text-center">
          <div className="font-spartan font-bold text-xl text-foreground mb-4">
            LITEROVIA
          </div>
          <p className="font-source text-secondary-text">
            NOT THE FINAL VERSION • The 1st Edition
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
