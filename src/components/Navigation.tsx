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
  { icon: eventsIcon,   label: 'Explore Events', id: 'amazingrace' },
  { icon: aboutIcon,    label: 'About Us',       id: 'about'        },
  { icon: contactIcon,  label: 'Contact Us',     id: 'contact'      },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-surface/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <style>{`
        /* drift animation: gentle vertical float */
        @keyframes drift {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
        .drift {
          animation: drift 4s ease-in-out infinite;
        }
      `}</style>

      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo with drift */}
        <div
          className="flex items-center gap-2 cursor-pointer drift hover:opacity-80 transition-opacity"
          onClick={() => scrollToSection('hero')}
        >
          <img src={logoSvg} alt="Literovia Logo" className="w-10 h-10" />
          <span className="font-spartan font-bold text-lg text-foreground">
            Literovia
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ icon, label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="flex items-center space-x-2 font-source text-foreground hover:text-crimson transition-colors group drift"
            >
              <img src={icon} alt={`${label} icon`} className="w-5 h-5" />
              <span>{label}</span>
              {/* underline on hover */}
              <span className="block w-0 h-0.5 bg-crimson transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground hover:text-crimson"
          onClick={() => setMobileOpen(o => !o)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {navLinks.map(({ icon, label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex items-center space-x-2 font-source text-foreground hover:text-crimson transition-colors drift"
              >
                <img src={icon} alt={`${label} icon`} className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
