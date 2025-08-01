import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ScrollReveal from './ScrollReveal';
import { Calendar, Clock, Star, Feather, Crown } from 'lucide-react';

const day1Events = [
  { name: 'Slam Poetry', icon: '🎭', time: '10:00 AM', color: 'from-purple-500 to-pink-500' },
  { name: 'Literary Auction', icon: '📚', time: '11:30 AM', color: 'from-emerald-500 to-teal-500' },
  { name: 'Workshop', icon: '✍️', time: '1:00 PM', color: 'from-blue-500 to-indigo-500' },
  { name: 'BangJam', icon: '🎵', time: '2:30 PM', color: 'from-red-500 to-orange-500' },
  { name: 'Paperback Partners', icon: '👥', time: '4:00 PM', color: 'from-yellow-500 to-orange-500' },
  { name: 'Performance', icon: '🎪', time: '5:30 PM', color: 'from-pink-500 to-rose-500' },
  { name: 'GeoGuesser', icon: '🗺️', time: '7:00 PM', color: 'from-green-500 to-lime-500' },
  { name: 'NY Times Mini Games', icon: '🧩', time: '8:30 PM', color: 'from-violet-500 to-purple-500' }
];

const day2Events = [
  { name: 'Poem Interpretation', icon: '📜', time: '10:00 AM', color: 'from-cyan-500 to-blue-500' },
  { name: 'LoreWars', icon: '⚔️', time: '11:30 AM', color: 'from-red-600 to-pink-600' },
  { name: 'Spockle', icon: '🎯', time: '1:00 PM', color: 'from-indigo-500 to-purple-500' },
  { name: 'Theatre', icon: '🎭', time: '2:30 PM', color: 'from-amber-500 to-yellow-500' },
  { name: 'Solo Speaking', icon: '🎤', time: '4:00 PM', color: 'from-teal-500 to-cyan-500' },
  { name: 'Panel Discussion', icon: '💬', time: '5:30 PM', color: 'from-rose-500 to-pink-500' },
  { name: 'Change My Mind', icon: '🧠', time: '7:00 PM', color: 'from-lime-500 to-green-500' },
  { name: 'Hot Takes Arena', icon: '🔥', time: '8:30 PM', color: 'from-orange-500 to-red-500' }
];

const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  const currentEvents = activeDay === 1 ? day1Events : day2Events;

  return (
    <section
      id="schedule"
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f8fafc 100%)',
      }}
    >
      <style>{`
        @keyframes bookFlip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(0deg); }
        }
        
        @keyframes magicSparkle {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
        }
        
        @keyframes floatingQuill {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(-5deg); }
          50% { transform: translateY(-5px) rotate(5deg); }
          75% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        .book-flip {
          animation: bookFlip 6s ease-in-out infinite;
        }
        
        .magic-sparkle {
          animation: magicSparkle 2s ease-in-out infinite;
        }
        
        .floating-quill {
          animation: floatingQuill 4s ease-in-out infinite;
        }
        
        .event-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .event-card:hover {
          transform: translateY(-20px) scale(1.05) rotateX(10deg);
          box-shadow: 0 30px 60px rgba(0,0,0,0.3), 0 0 50px rgba(220, 38, 38, 0.2);
        }
        
        .day-selector {
          transition: all 0.3s ease;
        }
        
        .day-selector.active {
          transform: scale(1.1);
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.5);
        }
      `}</style>

      {/* Magical Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating books */}
        <div className="book-flip absolute top-20 left-10 text-6xl opacity-10 text-gray-600">📖</div>
        <div className="book-flip absolute bottom-32 right-20 text-4xl opacity-8 text-gray-500" style={{ animationDelay: '2s' }}>📚</div>
        <div className="book-flip absolute top-1/2 left-1/4 text-5xl opacity-6 text-gray-400" style={{ animationDelay: '4s' }}>📜</div>
        
        {/* Floating quills */}
        <Feather className="floating-quill absolute top-40 right-32 w-8 h-8 text-crimson/20" style={{ animationDelay: '1s' }} />
        <Feather className="floating-quill absolute bottom-40 left-32 w-6 h-6 text-purple-400/20" style={{ animationDelay: '3s' }} />
        
        {/* Magic sparkles */}
        <Star className="magic-sparkle absolute top-60 right-10 w-6 h-6 text-crimson/30" style={{ animationDelay: '0s' }} />
        <Star className="magic-sparkle absolute bottom-60 left-20 w-4 h-4 text-blue-400/30" style={{ animationDelay: '1s' }} />
        <Star className="magic-sparkle absolute top-1/3 right-1/3 w-5 h-5 text-yellow-500/30" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Epic Title */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <div className="relative inline-block mb-8">
              <h2 className="font-spartan font-bold text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase text-gray-800">
                EVENT SCHEDULE
              </h2>
              <div className="absolute -top-4 -right-4">
                <Crown className="w-12 h-12 text-yellow-500 animate-pulse" />
              </div>
            </div>
            <p className="font-source text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
              full masti • September 8-9, 2025
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Day Selector */}
        <ScrollReveal delay={200}>
          <div className="flex justify-center mb-16">
            <div className="bg-white/80 backdrop-blur-md border border-gray-300 rounded-full p-2 flex space-x-2 shadow-lg">
              {[1, 2].map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`day-selector px-8 py-4 rounded-full font-spartan font-bold text-lg transition-all duration-300 ${
                    activeDay === day
                      ? 'active bg-gradient-to-r from-crimson to-pink-500 text-white'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Calendar className="w-5 h-5 inline mr-2" />
                  Day {day}
                  <span className="block text-xs mt-1">
                    Sept {day === 1 ? '8' : '9'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Events Grid with Creative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentEvents.map((event, idx) => (
            <ScrollReveal key={`${activeDay}-${idx}`} delay={idx * 100}>
              <div
                className={`event-card relative group cursor-pointer ${
                  hoveredEvent === event.name ? 'z-20' : 'z-10'
                }`}
                onMouseEnter={() => setHoveredEvent(event.name)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <Card className="bg-white/90 backdrop-blur-md border border-gray-300 hover:border-crimson/50 overflow-hidden h-full shadow-lg">
                  {/* Gradient Header */}
                  <div className={`h-3 bg-gradient-to-r ${event.color}`}></div>
                  
                  <CardContent className="p-6 text-center relative">
                    {/* Event Icon */}
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {event.icon}
                    </div>
                    
                    {/* Event Name */}
                    <h3 className="font-spartan font-bold text-xl text-gray-800 mb-3 group-hover:text-crimson transition-colors duration-300">
                      {event.name}
                    </h3>
                    
                    {/* Time */}
                    <div className="flex items-center justify-center text-gray-600 mb-4">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-mono">{event.time}</span>
                    </div>
                    
                    {/* Hover Effect */}
                    {hoveredEvent === event.name && (
                      <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 to-purple-600/10 rounded-lg animate-pulse"></div>
                    )}
                    
                    {/* Magic sparkle on hover */}
                    <div className={`absolute top-2 right-2 transition-all duration-300 ${
                      hoveredEvent === event.name ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    }`}>
                      <Star className="w-6 h-6 text-yellow-500 animate-spin" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Epic Footer */}
        <ScrollReveal delay={800}>
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-white/80 via-crimson/10 to-white/80 backdrop-blur-md border border-gray-300 rounded-3xl p-12 shadow-xl">
              <div className="flex items-center justify-center space-x-8 text-gray-700">
                <div className="text-center">
                  <div className="text-4xl font-bold text-crimson mb-2">16</div>
                  <div className="text-sm">Epic Events</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-500 mb-2">∞</div>
                  <div className="text-sm">Inspiration</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-500 mb-2">2</div>
                  <div className="text-sm">Legendary Days</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ScheduleSection;