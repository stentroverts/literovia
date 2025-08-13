import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Mail, Phone } from 'lucide-react';

const SponsorsSection = () => {
  return (
    <section
      id="sponsors"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: 'rgb(10,10,10)',
      }}
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Title */}
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="font-spartan font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase text-white mb-3 sm:mb-4 px-2">
              Our <span className="text-crimson">Partners</span>
            </h2>
            <p className="font-source text-sm sm:text-base lg:text-lg text-gray-300 max-w-3xl mx-auto px-2 leading-relaxed">
              We're building partnerships with amazing organizations who share our passion for literature
            </p>
          </div>
        </ScrollReveal>

        {/* Coming Soon Message */}
        <ScrollReveal delay={200}>
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-md border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mx-2 sm:mx-4 shadow-lg">
              <h3 className="font-spartan font-bold text-lg sm:text-xl lg:text-2xl text-white mb-2 sm:mb-3">
                Partnership Opportunities Coming Soon
              </h3>
              <p className="font-source text-gray-300 text-sm sm:text-base leading-relaxed">
                We're actively seeking partners to join us in celebrating literary excellence
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={400}>
          <div className="text-center">
            <div className="bg-gradient-to-r from-crimson/10 via-crimson/5 to-crimson/10 backdrop-blur-md border border-crimson/20 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 mx-2 sm:mx-4 shadow-xl">
              <h3 className="font-spartan font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-3 sm:mb-4">
                Interested in <span className="text-crimson">Supporting Us?</span>
              </h3>
              <p className="font-source text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
                Join us in supporting literary culture and connect with passionate readers, writers, and storytellers
              </p>
              
              {/* Contact Information */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 lg:gap-8">
                <a 
                  href="tel:+919912818640"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-crimson flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-mono text-xs sm:text-sm lg:text-base">+91 99128 18640</span>
                </a>
                
                <div className="hidden sm:block w-px h-4 sm:h-6 bg-gray-600"></div>
                
                <a 
                  href="tel:+916301130977"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-crimson flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-mono text-xs sm:text-sm lg:text-base">+91 6301 130 977</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SponsorsSection;
