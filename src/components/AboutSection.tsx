import React from 'react';
import ScrollReveal from './ScrollReveal';
import ShinyText from '@/components/ui/shiny-text';

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: 'rgb(10,10,10)',
      }}
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Title with Shiny Text */}
        <ScrollReveal>
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="font-spartan font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase mb-6 sm:mb-8 px-2">
              <ShinyText 
                text="About Literovia" 
                speed={3}
                className="font-spartan font-bold"
              />
            </h2>
          </div>
        </ScrollReveal>
        

        {/* About Content */}
        <ScrollReveal delay={200}>
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <p className="font-source text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed px-2 text-justify">
              Stentorian proudly presents Literovia, our inaugural literary festival that invites literature enthusiasts on a voyage of creative expression through storytelling, poetry, and performance. Having hosted numerous successful renditions of literary events under our college's cultural fest, we are pursuing to solidify our love for literature by bringing forth our first exclusive celebration dedicated to it. Join us as we create a vibrant community of writers, readers, and dreamers united by their passion for the written word.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
