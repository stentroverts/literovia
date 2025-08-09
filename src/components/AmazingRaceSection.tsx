import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Button } from '@/components/ui/button';
import SpotlightCard from '@/components/ui/SpotlightCard';
import ShinyText from '@/components/ui/shiny-text';
import { Trophy, Users, Clock, MapPin, Target } from 'lucide-react';

const AmazingRaceSection = () => {
  return (
    <section
      id="amazing-race"
      className="relative py-24 px-6"
      style={{
        backgroundColor: 'rgb(10,10,10)',
      }}
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollReveal>
          {/* Main Title */}
          <div className="text-center mb-16">
            <ShinyText 
              text="THE AMAZING RACE" 
              disabled={false} 
              speed={5} 
              variant="red"
              className='font-spartan font-black text-4xl sm:text-5xl md:text-7xl tracking-wider uppercase mb-6 drop-shadow-2xl' 
            />
            <p className="font-source text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The ultimate kickoff event!
            </p>
          </div>
        </ScrollReveal>

        {/* Challenge Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <ScrollReveal delay={200}>
            <SpotlightCard 
              className="custom-spotlight-card" 
              spotlightColor="rgba(220, 38, 38, 0.3)"
              baseColor="rgba(220, 38, 38, 0.15)"
            >
              <div className="text-center">
                <Target className="w-16 h-16 text-crimson mb-6 mx-auto" />
                <h3 className="font-spartan font-bold text-xl sm:text-2xl text-white text-center mb-4">Mind Challenges</h3>
                <p className="text-gray-300 text-center leading-relaxed text-sm sm:text-base">Solve puzzles, decode mysterious clues, and outsmart your opponents</p>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <SpotlightCard 
              className="custom-spotlight-card" 
              spotlightColor="rgba(234, 179, 8, 0.3)"
              baseColor="rgba(234, 179, 8, 0.15)"
            >
              <div className="text-center">
                <Clock className="w-16 h-16 text-yellow-400 mb-6 mx-auto" />
                <h3 className="font-spartan font-bold text-xl sm:text-2xl text-white text-center mb-4">Time Pressure</h3>
                <p className="text-gray-300 text-center leading-relaxed text-sm sm:text-base">Race against the clock in high-intensity creative writing sprints</p>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <SpotlightCard 
              className="custom-spotlight-card" 
              spotlightColor="rgba(59, 130, 246, 0.3)"
              baseColor="rgba(59, 130, 246, 0.15)"
            >
              <div className="text-center">
                <Users className="w-16 h-16 text-blue-400 mb-6 mx-auto" />
                <h3 className="font-spartan font-bold text-xl sm:text-2xl text-white text-center mb-4">Duos</h3>
                <p className="text-gray-300 text-center leading-relaxed text-sm sm:text-base">Collaborate, strategize, and compete as a unified literary force</p>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>

        {/* Action Buttons */}
        <ScrollReveal delay={800}>
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <Button
                size="xl"
                className="min-w-[240px] bg-gradient-to-r from-crimson to-red-600 text-white font-bold text-base sm:text-lg px-8 py-6 rounded-xl hover:scale-105 transition-all duration-300"
              >
                <Trophy className="w-6 h-6 mr-3" />
                <span>Join the Adventure</span>
              </Button>
              
              <Button
                variant="outline"
                size="xl"
                className="min-w-[240px] border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold text-base sm:text-lg px-8 py-6 rounded-xl transition-all duration-300"
              >
                <MapPin className="w-6 h-6 mr-3" />
                View Race Map
              </Button>
            </div>
            
            <div className="inline-flex items-center space-x-6 text-gray-300">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-crimson" />
                <span>2-person teams only</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                <span>2 hours adrenaline rush</span>
              </div>
              <div className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-blue-400" />
                <span>KINGDOM movie tickets</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AmazingRaceSection;
