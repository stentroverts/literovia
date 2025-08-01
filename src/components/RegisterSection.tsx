import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';
import { openRegistrationForm } from '@/config/registration';
import { 
  Rocket, 
  CheckCircle, 
  Sparkles,
  Heart,
  BookOpen
} from 'lucide-react';

const RegisterSection = () => {
  return (
    <section
      id="register"
      className="relative py-20 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f1f5f9 100%)',
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-crimson/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <Sparkles className="absolute top-20 right-10 w-8 h-8 text-crimson/20 animate-bounce" />
        <Heart className="absolute bottom-40 left-20 w-6 h-6 text-pink-400/20 animate-pulse" style={{ animationDelay: '2s' }} />
        <BookOpen className="absolute top-1/2 right-1/4 w-7 h-7 text-purple-400/20 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, hsl(348, 83%, 47%), hsl(348, 100%, 55%));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .cta-button {
          background: linear-gradient(135deg, hsl(348, 83%, 47%), hsl(348, 100%, 55%));
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
          transition: all 0.3s ease;
        }
        
        .cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 35px rgba(220, 38, 38, 0.4);
        }
      `}</style>

      <div className="container mx-auto max-w-4xl relative z-10">
        <ScrollReveal>
          <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-8 sm:p-12 text-center hover:shadow-2xl transition-all duration-500 shadow-lg">
            <div className="mb-12">
              <div className="flex items-center justify-center mb-6">
                <Rocket className="w-12 h-12 text-crimson mr-4 animate-bounce" />
                <h2 className="font-spartan font-bold text-3xl md:text-4xl uppercase text-gray-800">
                  Join the <span className="gradient-text">Literary Fest</span>
                </h2>
                <Sparkles className="w-12 h-12 text-crimson ml-4 animate-pulse" />
              </div>
              <p className="font-source text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Be part of an unforgettable literary journey. Register now for two days of creativity, 
                collaboration, and literary excellence.
              </p>
            </div>

            {/* Registration Button */}
            <div className="mb-8">
              <Button
                className="cta-button w-full sm:w-auto min-w-[240px] text-white border-none font-bold text-xl px-12 py-6 rounded-xl"
                size="xl"
                onClick={openRegistrationForm}
              >
                <CheckCircle className="w-6 h-6 mr-3" />
                Register Now
              </Button>
            </div>

            {/* Simple Info */}
            <div className="text-center">
              <p className="font-source text-sm md:text-base text-gray-600 mb-4">
                September 8-9, 2025 • Limited spots available
              </p>
              <div className="inline-flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span>Instant confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default RegisterSection;
