import React from 'react';
import ScrollReveal from './ScrollReveal';
import ShinyText from '@/components/ui/shiny-text';

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: 'rgb(10,10,10)',
      }}
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Title with Shiny Text */}
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas maxime distinctio quibusdam architecto expedita fugit quia optio veritatis deleniti laudantium? Rerum illo quae quasi corrupti, provident ipsam amet nulla consectetur!
            </p>
        
            
            <div className="bg-gradient-to-r from-crimson/10 via-crimson/5 to-crimson/10 backdrop-blur-md border border-crimson/20 rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 mx-2 sm:mx-4 shadow-xl mt-8 sm:mt-12">
              <h3 className="font-spartan font-bold text-lg sm:text-xl md:text-2xl text-white mb-4 sm:mb-6">
                A <span className="text-crimson">Stentorian</span> Odyssey
              </h3>
              <p className="font-source text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, voluptates deserunt alias aliquid quasi ducimus perferendis eos repellendus optio recusandae voluptatum labore nihil laudantium excepturi tenetur possimus suscipit blanditiis corporis!
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
