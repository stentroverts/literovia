import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Clock, MapPin, Zap, Target, Flag, Compass } from 'lucide-react';

const AmazingRaceSection = () => {
  const [currentEffect, setCurrentEffect] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEffect((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="amazing-race"
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 70%, #1a1a2e 100%)',
      }}
    >
      <style>{`
        @keyframes raceTrail {
          0% { transform: translateX(-100%) scale(0.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100vw) scale(1.2); opacity: 0; }
        }
        
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.3); }
          50% { box-shadow: 0 0 40px rgba(220, 38, 38, 0.6), 0 0 60px rgba(220, 38, 38, 0.3); }
        }
        
        @keyframes lightning {
          0%, 90%, 100% { opacity: 0; }
          5%, 10% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(-2deg); }
          66% { transform: translateY(5px) rotate(2deg); }
        }
        
        .race-trail {
          animation: raceTrail 4s linear infinite;
        }
        
        .race-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        
        .lightning-effect {
          animation: lightning 3s infinite;
        }
        
        .float-element {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Dynamic Racing Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Racing trails */}
        <div className="race-trail absolute top-1/4 h-1 bg-gradient-to-r from-transparent via-crimson to-transparent w-20" style={{ animationDelay: '0s' }}></div>
        <div className="race-trail absolute top-3/4 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-16" style={{ animationDelay: '1s' }}></div>
        <div className="race-trail absolute top-1/2 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent w-24" style={{ animationDelay: '2s' }}></div>
        
        {/* Lightning bolts */}
        <div className="lightning-effect absolute top-10 right-20 text-yellow-300 text-6xl">⚡</div>
        <div className="lightning-effect absolute bottom-20 left-10 text-yellow-300 text-4xl" style={{ animationDelay: '1s' }}>⚡</div>
        
        {/* Floating icons */}
        <Trophy className="float-element absolute top-20 left-20 w-8 h-8 text-crimson/30" style={{ animationDelay: '0s' }} />
        <Flag className="float-element absolute bottom-32 right-32 w-6 h-6 text-yellow-400/30" style={{ animationDelay: '2s' }} />
        <Compass className="float-element absolute top-40 right-10 w-7 h-7 text-blue-400/30" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollReveal>
          {/* Main Title with Dynamic Effects */}
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <h2 className="font-spartan font-black text-4xl sm:text-5xl md:text-7xl tracking-wider uppercase mb-6">
                <span className="text-white drop-shadow-2xl">The </span>
                <span className="race-glow bg-gradient-to-r from-crimson via-red-500 to-orange-500 bg-clip-text text-transparent">
                  Amazing Race
                </span>
              </h2>
              <div className="absolute -top-4 -right-4">
                <Zap className="w-12 h-12 text-yellow-400 animate-bounce" />
              </div>
            </div>
            <p className="font-source text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The ultimate literary challenge where <span className="text-yellow-400 font-semibold">2-person teams</span> race through mind-bending puzzles, 
              creative tasks, and surprise literary adventures!
            </p>
          </div>
        </ScrollReveal>

        {/* Challenge Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <ScrollReveal delay={200}>
            <div className="group relative bg-gradient-to-br from-crimson/20 to-red-900/20 backdrop-blur-md border border-crimson/30 rounded-2xl p-8 hover:scale-105 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-crimson/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Target className="w-16 h-16 text-crimson mb-6 mx-auto group-hover:rotate-180 transition-transform duration-500" />
              <h3 className="font-spartan font-bold text-2xl text-white text-center mb-4">Mind Challenges</h3>
              <p className="text-gray-300 text-center leading-relaxed">Solve literary puzzles, decode mysterious clues, and outsmart your opponents</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="group relative bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-md border border-yellow-400/30 rounded-2xl p-8 hover:scale-105 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Clock className="w-16 h-16 text-yellow-400 mb-6 mx-auto group-hover:animate-spin transition-transform duration-500" />
              <h3 className="font-spartan font-bold text-2xl text-white text-center mb-4">Time Pressure</h3>
              <p className="text-gray-300 text-center leading-relaxed">Race against the clock in high-intensity creative writing sprints</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className="group relative bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-md border border-blue-400/30 rounded-2xl p-8 hover:scale-105 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Users className="w-16 h-16 text-blue-400 mb-6 mx-auto group-hover:scale-110 transition-transform duration-500" />
              <h3 className="font-spartan font-bold text-2xl text-white text-center mb-4">Duos</h3>
              <p className="text-gray-300 text-center leading-relaxed">Collaborate, strategize, and compete as a unified literary force</p>
            </div>
          </ScrollReveal>
        </div>

        {/* Action Buttons */}
        <ScrollReveal delay={800}>
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <Button
                size="xl"
                className="group relative min-w-[240px] bg-gradient-to-r from-crimson to-red-600 text-white font-bold text-lg px-8 py-6 rounded-xl hover:scale-110 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-crimson opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Trophy className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Join the Adventure</span>
              </Button>
              
              <Button
                variant="outline"
                size="xl"
                className="min-w-[240px] border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold text-lg px-8 py-6 rounded-xl transition-all duration-300"
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
