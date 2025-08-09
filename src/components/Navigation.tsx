import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';  // Hamburger & close icons
import logoSvg from '@/assets/nav.svg';   // <-- your logo here
import registerIcon from '@/assets/register.svg';
import eventsIcon   from '@/assets/events.svg';
import aboutIcon    from '@/assets/about.svg';
import contactIcon  from '@/assets/contact.svg';

const navLinks = [
  { icon: registerIcon, label: 'Register',       id: 'register'     },
  { icon: eventsIcon,   label: 'Schedule',       id: 'schedule'     }, 
  { icon: aboutIcon,    label: 'Sponsors',       id: 'sponsors'     },
  { icon: contactIcon,  label: 'Contact Us',     id: 'contact'      },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setMobileOpen] = useState(false);
  const [isLoaded, setIsLoaded]           = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    
    // Trigger load animation after component mounts
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'backdrop-blur-md shadow-xl border-b border-crimson/20' 
          : ''
      }`}
      style={{
        backgroundColor: isScrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.3)'
      }}
    >
      <style>{`
        /* Enhanced floating animations with staggered entrance */
        @keyframes floatIn {
          0% { 
            opacity: 0; 
            transform: translateY(-30px) scale(0.8); 
          }
          60% { 
            transform: translateY(5px) scale(1.05); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes gentleFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-3px) rotate(0.5deg); 
          }
          50% { 
            transform: translateY(-6px) rotate(0deg); 
          }
          75% { 
            transform: translateY(-3px) rotate(-0.5deg); 
          }
        }
        
        @keyframes logoSpin {
          0% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-4px) rotate(2deg); 
          }
          50% { 
            transform: translateY(-8px) rotate(0deg); 
          }
          75% { 
            transform: translateY(-4px) rotate(-2deg); 
          }
          100% { 
            transform: translateY(0px) rotate(0deg); 
          }
        }
        
        @keyframes slideFromTop {
          0% {
            opacity: 0;
            transform: translateY(-100%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .float-in-1 { animation: floatIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.1s both; }
        .float-in-2 { animation: floatIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s both; }
        .float-in-3 { animation: floatIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s both; }
        .float-in-4 { animation: floatIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.4s both; }
        .float-in-5 { animation: floatIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s both; }
        
        .gentle-float { animation: gentleFloat 6s ease-in-out infinite; }
        .logo-float { animation: logoSpin 8s ease-in-out infinite; }
        .mobile-slide { animation: slideFromTop 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        
        .nav-link {
          position: relative;
          overflow: hidden;
        }
        
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, hsl(348, 83%, 47%), transparent);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: translateX(-50%);
        }
        
        .nav-link:hover::before {
          width: 100%;
        }
        
        .nav-link:hover {
          transform: translateY(-2px);
        }
        
        .mobile-menu-item {
          transition: all 0.3s ease;
          transform: translateX(-20px);
          opacity: 0;
        }
        
        .mobile-menu-item.show {
          transform: translateX(0);
          opacity: 1;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo with enhanced float animation */}
        <div
          className={`flex items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105 ${
            isLoaded ? 'float-in-1 logo-float' : ''
          }`}
          onClick={() => scrollToSection('hero')}
        >
          <div className="relative">
            <img 
              src={logoSvg} 
              alt="Literovia Logo" 
              className="w-10 h-10 transition-transform duration-300 hover:rotate-12" 
            />
            <div className="absolute inset-0 w-10 h-10 bg-crimson/20 rounded-full blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="font-spartan font-bold text-lg text-foreground hover:text-crimson transition-colors duration-300">
            Literovia
          </span>
        </div>

        {/* Desktop Links with staggered animations */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map(({ icon, label, id }, index) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`nav-link flex items-center space-x-2 px-3 py-2 rounded-lg font-source text-foreground hover:text-crimson hover:bg-crimson/10 transition-all duration-300 ${
                isLoaded ? `float-in-${index + 2} gentle-float` : ''
              }`}
              style={{ animationDelay: `${(index + 1) * 0.15}s` }}
            >
              <img 
                src={icon} 
                alt={`${label} icon`} 
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
              />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle with enhanced styling */}
        <Button
          variant="ghost"
          size="icon"
          className={`md:hidden text-foreground hover:text-crimson hover:bg-crimson/10 transition-all duration-300 relative ${
            isLoaded ? 'float-in-5' : ''
          }`}
          onClick={() => setMobileOpen(o => !o)}
        >
          <div className="relative">
            {isMobileMenuOpen ? (
              <X size={24} className="transition-transform duration-300 rotate-90" />
            ) : (
              <Menu size={24} className="transition-transform duration-300 hover:scale-110" />
            )}
          </div>
        </Button>
      </div>

      {/* Enhanced Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface/98 backdrop-blur-md border-t border-crimson/30 shadow-lg mobile-slide">
          <div className="container mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col space-y-4">
              {navLinks.map(({ icon, label, id }, index) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`mobile-menu-item flex items-center space-x-3 p-3 rounded-lg font-source text-foreground hover:text-crimson hover:bg-crimson/10 transition-all duration-300 group ${
                    isMobileMenuOpen ? 'show' : ''
                  }`}
                  style={{ 
                    transitionDelay: `${index * 0.1}s`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="relative">
                    <img 
                      src={icon} 
                      alt={`${label} icon`} 
                      className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 w-6 h-6 bg-crimson/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="font-medium text-lg">{label}</span>
                  <div className="ml-auto w-0 h-0.5 bg-crimson transition-all duration-300 group-hover:w-6"></div>
                </button>
              ))}
            </div>
            
            {/* Mobile menu footer */}
            <div className="mt-6 pt-4 border-t border-crimson/20">
              <p className="text-center text-sm text-secondary-text">
                Literovia • Literary Odyssey
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
