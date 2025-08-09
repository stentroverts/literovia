import React from 'react';
import ScrollReveal from './ScrollReveal';

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
        backgroundColor: 'rgb(10,10,10)',
      }}
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Title */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-spartan font-bold text-4xl md:text-5xl uppercase text-white mb-4">
              Our <span className="text-crimson">Partners</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Sponsors Grid */}
        <div className="flex justify-center">
          {sponsors.map((sponsor, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <div className="group bg-white backdrop-blur-md border border-gray-200 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-500 hover:scale-105 max-w-sm">
                {/* Sponsor Logo */}
                <div className="text-4xl sm:text-5xl md:text-6xl mb-6">
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
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Call to Action */}
        <ScrollReveal delay={800}>
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-white/80 via-crimson/10 to-white/80 backdrop-blur-md border border-gray-300 rounded-3xl p-8 shadow-lg">
              <h3 className="font-spartan font-bold text-xl sm:text-2xl text-gray-900 mb-4">
                Interested in Sponsoring?
              </h3>
              <p className="font-source text-gray-700 mb-6 max-w-2xl mx-auto">
                Join us in supporting literary culture and connect with passionate readers and writers
              </p>
              <div className="inline-flex items-center space-x-4 text-sm text-gray-600">
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
