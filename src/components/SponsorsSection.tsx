import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Mail, Phone, Download, FileText, Star, Target, Users, Trophy } from 'lucide-react';
import { Button } from './ui/button';

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
              Join us in celebrating literary excellence and connect with passionate readers, writers, and storytellers
            </p>
          </div>
        </ScrollReveal>

        {/* Partnership Benefits */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-crimson/10 to-crimson/5 backdrop-blur-md border border-crimson/20 rounded-xl p-4 sm:p-6 text-center group hover:border-crimson/40 transition-all duration-300">
              <Target className="w-8 h-8 text-crimson mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-spartan font-bold text-white text-sm sm:text-base mb-2">Brand Visibility</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Reach passionate literary enthusiasts</p>
            </div>
            
            <div className="bg-gradient-to-br from-crimson/10 to-crimson/5 backdrop-blur-md border border-crimson/20 rounded-xl p-4 sm:p-6 text-center group hover:border-crimson/40 transition-all duration-300">
              <Users className="w-8 h-8 text-crimson mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-spartan font-bold text-white text-sm sm:text-base mb-2">Community Impact</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Support emerging writers & readers</p>
            </div>
            
            <div className="bg-gradient-to-br from-crimson/10 to-crimson/5 backdrop-blur-md border border-crimson/20 rounded-xl p-4 sm:p-6 text-center group hover:border-crimson/40 transition-all duration-300">
              <Trophy className="w-8 h-8 text-crimson mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-spartan font-bold text-white text-sm sm:text-base mb-2">Prestige Association</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Partner with premier literary event</p>
            </div>
            
            <div className="bg-gradient-to-br from-crimson/10 to-crimson/5 backdrop-blur-md border border-crimson/20 rounded-xl p-4 sm:p-6 text-center group hover:border-crimson/40 transition-all duration-300">
              <Star className="w-8 h-8 text-crimson mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-spartan font-bold text-white text-sm sm:text-base mb-2">Networking</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Connect with academic institutions</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Call to Action with Sponsorship Brochure */}
        <ScrollReveal delay={200}>
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-crimson/10 via-crimson/5 to-crimson/10 backdrop-blur-md border border-crimson/20 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 max-w-4xl mx-4 shadow-xl">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-crimson/20 to-crimson/10 rounded-full mb-4 sm:mb-6">
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-crimson" />
                </div>
                <h3 className="font-spartan font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-4 sm:mb-6">
                  Ready to <span className="text-crimson">Partner With Us?</span>
                </h3>
                <p className="font-source text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8">
                  Discover how your organization can be part of Literovia's literary celebration. Download our comprehensive sponsorship brochure to explore partnership tiers and benefits.
                </p>
              </div>

              <div className="flex justify-center mb-6 sm:mb-8">
                <Button 
                  variant="hero" 
                  size="xl"
                  asChild
                  className="group"
                >
                  <a 
                    href="/Literovia Sponsorship Brochure.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3"
                  >
                    <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                    <span>Sponsorship Brochure</span>
                  </a>
                </Button>
              </div>

              <div className="text-center mb-6 sm:mb-8">
                <p className="font-source text-xs sm:text-sm text-gray-400">
                  PDF • Comprehensive details about partnership opportunities and benefits
                </p>
              </div>

              <p className="font-source text-gray-300 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed text-center">
                Let's discuss how we can create a meaningful partnership that celebrates literature and connects you with our vibrant community
              </p>
              
              {/* Contact Information */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Phone Contacts */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
