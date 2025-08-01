import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Crown, Star, Award } from 'lucide-react';

const sponsors = [
  {
    tier: 'Platinum Tier',
    name: 'RK Food Court',
    logo: '🍽️',
    description: 'yes',
    color: 'from-orange-400 to-red-500'
  }
];

const SponsorsSection = () => {
  return (
    <section
      id="sponsors"
      className="relative py-20 px-6"
      style={{
        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%, #f1f5f9 100%)',
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <Star className="absolute top-40 right-20 w-8 h-8 text-yellow-400/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <Award className="absolute bottom-40 left-20 w-6 h-6 text-blue-400/30 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Title */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <h2 className="font-spartan font-bold text-4xl md:text-5xl uppercase text-gray-800 mb-4">
                Our <span className="text-crimson">Partners</span>
              </h2>
              <div className="absolute -top-4 -right-4">
                <Crown className="w-12 h-12 text-yellow-500 animate-pulse" />
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* Sponsors Grid */}
        <div className="flex justify-center">
          {sponsors.map((sponsor, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <div className="group bg-white backdrop-blur-md border border-gray-200 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-500 hover:scale-105 max-w-sm">
                {/* Sponsor Logo */}
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {sponsor.logo}
                </div>
                
                {/* Tier Badge */}
                <div className={`inline-block px-4 py-2 rounded-full text-white text-sm font-bold mb-4 bg-gradient-to-r ${sponsor.color}`}>
                  {sponsor.tier}
                </div>
                
                {/* Sponsor Name */}
                <h3 className="font-spartan font-bold text-xl text-gray-800 mb-3 group-hover:text-crimson transition-colors duration-300">
                  {sponsor.name}
                </h3>
                
                {/* Description */}
                <p className="font-source text-gray-600 text-sm leading-relaxed">
                  {sponsor.description}
                </p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-crimson/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Call to Action */}
        <ScrollReveal delay={800}>
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-white/80 via-crimson/10 to-white/80 backdrop-blur-md border border-gray-300 rounded-3xl p-8 shadow-lg">
              <h3 className="font-spartan font-bold text-2xl text-gray-800 mb-4">
                Interested in Sponsoring?
              </h3>
              <p className="font-source text-gray-600 mb-6 max-w-2xl mx-auto">
                Join us in supporting literary culture and connect with passionate readers and writers
              </p>
              <div className="inline-flex items-center space-x-4 text-sm text-gray-500">
                <span>📧 stentorian@gmail.com</span>
                <span>•</span>
                <span>📞 +91 73969 77130</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SponsorsSection;
