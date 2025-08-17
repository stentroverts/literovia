import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ScheduleSection from '@/components/ScheduleSection';
import SponsorsSection from '@/components/SponsorsSection';
import RegisterSection from '@/components/RegisterSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="text-foreground overflow-x-hidden relative" style={{backgroundColor: 'rgb(10,10,10)'}}>
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
      <footer className="relative z-10 border-t border-crimson/20" style={{backgroundColor: 'rgb(10,10,10)'}}>
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div 
                className="text-2xl text-gradient-crimson font-bold"
                style={{ fontFamily: '"Della Respira", serif' }}
              >
                Literovia
              </div>
              <p className="text-secondary-text text-sm leading-relaxed">
                Where stories come alive and imagination knows no bounds. Join us for an unforgettable literary journey.
              </p>
              <div className="text-crimson text-sm font-medium">
                The 1st Edition • 2025
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-playfair text-lg font-semibold text-foreground">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#about"
                    className="text-secondary-text hover:text-crimson transition-colors duration-300 text-sm"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a 
                    href="#schedule"
                    className="text-secondary-text hover:text-crimson transition-colors duration-300 text-sm"
                  >
                    Schedule
                  </a>
                </li>
                <li>
                  <a 
                    href="#register"
                    className="text-secondary-text hover:text-crimson transition-colors duration-300 text-sm"
                  >
                    Register
                  </a>
                </li>
                <li>
                  <a 
                    href="#sponsors"
                    className="text-secondary-text hover:text-crimson transition-colors duration-300 text-sm"
                  >
                    Sponsors
                  </a>
                </li>
              </ul>
            </div>

            {/* Featured Events */}
            <div className="space-y-4">
              <h3 className="font-playfair text-lg font-semibold text-foreground">
                Featured Events
              </h3>
              <ul className="space-y-2">
                {['Mimic and Mystify', 'Sign Language Workshop', 'Theatre', 'Panel Discussion'].map((event) => (
                  <li key={event}>
                    <span className="text-secondary-text text-sm">
                      {event}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div className="space-y-4">
              <h3 className="font-playfair text-lg font-semibold text-foreground">
                Locate Us
              </h3>
              <div className="space-y-3">
                <a
                  href="https://maps.app.goo.gl/ALiVUqrHErw1W7kG7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-text hover:text-crimson transition-colors duration-300 text-sm block"
                >
                  <div>VNR Vignana Jyothi</div>
                  <div>Institute of Engineering</div>
                </a>
                <div className="flex space-x-4">
                  {/* Social Media Icons */}
                  <a
                    href="https://www.instagram.com/stentorian_vnrvjiet/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center bg-surface hover:bg-crimson/20 
                             border border-crimson/20 hover:border-crimson/40 rounded-lg 
                             transition-all duration-300 hover:scale-110"
                    aria-label="Instagram"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="text-secondary-text hover:text-crimson transition-colors duration-300"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/stentorian-vnrvjiet/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center bg-surface hover:bg-crimson/20 
                             border border-crimson/20 hover:border-crimson/40 rounded-lg 
                             transition-all duration-300 hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="text-secondary-text hover:text-crimson transition-colors duration-300"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-crimson/10 py-6">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="text-secondary-text text-sm">
                © 2025 Literovia. All rights reserved. Crafted with ❤️ by STENT Team.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
