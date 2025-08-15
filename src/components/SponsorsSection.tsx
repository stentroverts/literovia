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
          <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-md border border-gray-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 max-w-2xl mx-4 shadow-lg">
              <h3 className="font-spartan font-bold text-xl sm:text-2xl lg:text-3xl text-white mb-3 sm:mb-4 text-center">
                Partnership Opportunities Coming Soon
              </h3>
              <p className="font-source text-gray-300 text-base sm:text-lg leading-relaxed text-center">
                We're actively seeking partners to join us in celebrating literary excellence
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={400}>
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-crimson/10 via-crimson/5 to-crimson/10 backdrop-blur-md border border-crimson/20 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 max-w-4xl mx-4 shadow-xl">
              <h3 className="font-spartan font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-4 sm:mb-6 text-center">
                Interested in <span className="text-crimson">Supporting Us?</span>
              </h3>
              <p className="font-source text-gray-300 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed text-center">
                Join us in supporting literary culture and connect with passionate readers, writers, and storytellers
              </p>
              
              {/* Contact Information */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Phone Contacts */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <a 
                    href="tel:+919912818640"
                    className="flex items-center space-x-4 bg-white/5 hover:bg-white/10 p-4 sm:p-5 rounded-xl border border-white/10 hover:border-crimson/30 text-gray-300 hover:text-white transition-all duration-300 group"
                  >
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-crimson flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-left">
                      <div className="font-semibold text-sm sm:text-base lg:text-lg text-white mb-1">Sameer</div>
                      <div className="font-mono text-xs sm:text-sm lg:text-base text-gray-300">+91 99128 18640</div>
                    </div>
                  </a>
                  
                  <a 
                    href="tel:+916301130977"
                    className="flex items-center space-x-4 bg-white/5 hover:bg-white/10 p-4 sm:p-5 rounded-xl border border-white/10 hover:border-crimson/30 text-gray-300 hover:text-white transition-all duration-300 group"
                  >
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-crimson flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-left">
                      <div className="font-semibold text-sm sm:text-base lg:text-lg text-white mb-1">Nehal</div>
                      <div className="font-mono text-xs sm:text-sm lg:text-base text-gray-300">+91 6301 130 977</div>
                    </div>
                  </a>
                </div>

                {/* Email Contact */}
                <div className="lg:col-span-1">
                  <a 
                    href="mailto:stentorian@vnrvjiet.in"
                    className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 p-4 sm:p-5 rounded-xl border border-white/10 hover:border-crimson/30 text-gray-300 hover:text-white transition-all duration-300 group h-full text-center"
                  >
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-crimson flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mb-2" />
                    <div className="font-semibold text-sm sm:text-base lg:text-lg text-white mb-1">Email Us</div>
                    <div className="font-mono text-xs sm:text-sm text-gray-300">stentorian@vnrvjiet.in</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SponsorsSection;
