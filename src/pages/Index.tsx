import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ScheduleSection from '@/components/ScheduleSection';
import SponsorsSection from '@/components/SponsorsSection';
import RegisterSection from '@/components/RegisterSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden" style={{backgroundColor: 'rgb(10,10,10)'}}>
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <div className="wave">
          <div className="paperback-bg">
            <AboutSection />
            <ScheduleSection />
            <SponsorsSection />
            <RegisterSection />
            <ContactSection />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-crimson/20" style={{backgroundColor: 'rgb(10,10,10)'}}>
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
