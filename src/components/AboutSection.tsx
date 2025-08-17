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
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <p className="font-source text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed px-2">
              Literovia is a platform dedicated to empowering writers and readers by providing a vibrant space for sharing stories, discovering new voices, and fostering a creative community. Our mission is to make literature accessible and engaging for everyone, encouraging imagination and connection through the written word.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
