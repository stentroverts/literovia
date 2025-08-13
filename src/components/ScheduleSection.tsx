import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import FlipCard from './ui/FlipCard';
import { Calendar, Clock } from 'lucide-react';

const day1Events = [
  { 
    name: 'Slam Poetry', 
    time: '10:00 AM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Slam Poetry Event',
    description: 'Experience the raw power of spoken word poetry as talented poets share their most compelling stories and emotions.'
  },
  { 
    name: 'Literary Auction', 
    time: '11:30 AM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Literary Auction Event',
    description: 'Bid on rare books, signed manuscripts, and unique literary artifacts in this exciting auction event.'
  },
  { 
    name: 'Workshop', 
    time: '1:00 PM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Writing Workshop Event',
    description: 'Join our interactive writing workshop and learn techniques from experienced authors and editors.'
  },
  { 
    name: 'BangJam', 
    time: '2:30 PM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'BangJam Music Event',
    description: 'A fusion of music and literature where artists create live performances blending both art forms.'
  },
  { 
    name: 'Paperback Partners', 
    time: '4:00 PM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Paperback Partners Event',
    description: 'Connect with fellow book lovers and find your perfect reading companion in this networking event.'
  },
  { 
    name: 'Performance', 
    time: '5:30 PM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Performance Event',
    description: 'Watch dramatic interpretations of classic literature brought to life by talented performers.'
  },
  { 
    name: 'GeoGuesser', 
    time: '7:00 PM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'GeoGuesser Game Event',
    description: 'Test your geographical knowledge in this fun, interactive game show format with literary themes.'
  },
  { 
    name: 'NY Times Mini Games', 
    time: '8:30 PM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'NY Times Mini Games Event',
    description: 'Challenge yourself with crosswords, word games, and puzzles in this competitive gaming session.'
  }
];

const day2Events = [
  { 
    name: 'Poem Interpretation', 
    time: '10:00 AM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Poem Interpretation Event',
    description: 'Dive deep into the meaning and context of classic and contemporary poems with expert analysis.'
  },
  { 
    name: 'LoreWars', 
    time: '11:30 AM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'LoreWars Battle Event',
    description: 'Battle of knowledge as teams compete in literary trivia covering mythology, legends, and folklore.'
  },
  { 
    name: 'Spockle', 
    time: '1:00 PM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Spockle Game Event',
    description: 'A unique word game that combines strategy, vocabulary, and literary knowledge in exciting matches.'
  },
  { 
    name: 'Theatre', 
    time: '2:30 PM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Theatre Performance Event',
    description: 'Professional theatrical performances featuring scenes from beloved literary works and original plays.'
  },
  { 
    name: 'Solo Speaking', 
    time: '4:00 PM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Solo Speaking Event',
    description: 'Individual presentations where speakers share their insights on literature, writing, and storytelling.'
  },
  { 
    name: 'Panel Discussion', 
    time: '5:30 PM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Panel Discussion Event',
    description: 'Join industry experts as they discuss current trends in literature, publishing, and creative writing.'
  },
  { 
    name: 'Change My Mind', 
    time: '7:00 PM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Change My Mind Debate Event',
    description: 'Engaging debates on controversial literary topics where participants try to change each other\'s perspectives.'
  },
  { 
    name: 'Hot Takes Arena', 
    time: '8:30 PM', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Hot Takes Arena Event',
    description: 'Share and defend your most controversial opinions about books, authors, and literary trends.'
  }
];

const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentEvents = activeDay === 1 ? day1Events : day2Events;

  const handleDayChange = (day: number) => {
    if (day === activeDay) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveDay(day);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <section
      id="schedule"
      className="relative py-24 px-6"
      style={{
        backgroundColor: 'rgb(10,10,10)',
      }}
    >
      {/* Enhanced CSS for smooth transitions */}
      <style>{`
        .day-toggle {
          position: relative;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          padding: 6px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        .day-button {
          position: relative;
          z-index: 2;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 40px;
          padding: 12px 20px;
          font-weight: 700;
          backdrop-filter: blur(10px);
        }
        
        @media (min-width: 640px) {
          .day-button {
            padding: 16px 32px;
          }
        }
        
        .day-button.active {
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .day-button.inactive {
          color: rgb(156, 163, 175);
        }
        
        .day-button.inactive:hover {
          color: rgb(209, 213, 219);
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }
        
        .day-slider {
          position: absolute;
          top: 6px;
          height: calc(100% - 12px);
          width: calc(50% - 6px);
          background: linear-gradient(135deg, hsl(348, 83%, 47%) 0%, hsl(348, 100%, 55%) 100%);
          border-radius: 40px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 4px 16px rgba(220, 38, 38, 0.3),
            0 2px 8px rgba(220, 38, 38, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          z-index: 1;
        }
        
        .day-slider.slide-right {
          transform: translateX(calc(100% + 6px));
        }
        
        .events-container {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .events-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .events-fade-out {
          opacity: 0;
          transform: translateY(20px);
        }
      `}</style>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Title */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="font-spartan font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase text-white mb-4 sm:mb-6 lg:mb-8 px-4">
              EVENT SCHEDULE
            </h2>
            <p className="font-source text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4 sm:mb-6 lg:mb-8 px-4">
              full masti • September 8-9, 2025
            </p>
          </div>
        </ScrollReveal>

        {/* Enhanced Day Selector */}
        <ScrollReveal delay={200}>
          <div className="flex justify-center mb-12 sm:mb-16 px-4">
            <div className="day-toggle relative w-full max-w-xs sm:max-w-md overflow-hidden">
              {/* Sliding background */}
              <div className={`day-slider ${activeDay === 2 ? 'slide-right' : ''}`}></div>
              
              {/* Day buttons */}
              <div className="flex relative z-10">
                <button
                  onClick={() => handleDayChange(1)}
                  className={`day-button ${activeDay === 1 ? 'active' : 'inactive'} flex-1`}
                >
                  <div className="flex items-center justify-center">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <div>
                      <div className="text-sm sm:text-base lg:text-lg font-spartan font-bold">Day 1</div>
                      <div className="text-xs mt-1 opacity-90 hidden sm:block">Sept 8</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleDayChange(2)}
                  className={`day-button ${activeDay === 2 ? 'active' : 'inactive'} flex-1`}
                >
                  <div className="flex items-center justify-center">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <div>
                      <div className="text-sm sm:text-base lg:text-lg font-spartan font-bold">Day 2</div>
                      <div className="text-xs mt-1 opacity-90 hidden sm:block">Sept 9</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Events Grid with Simple Cards */}
        <div className={`events-container ${isTransitioning ? 'events-fade-out' : 'events-fade-in'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-items-center px-4">
            {currentEvents.map((event, index) => (
              <ScrollReveal key={`${activeDay}-${index}`} delay={isTransitioning ? 0 : index * 100}>
                <div className="w-full max-w-[280px] sm:max-w-[320px]">
                  <div className="w-full h-80 sm:h-96 perspective-1000 cursor-pointer group">
                    <div className="relative w-full h-full transform-style-preserve-3d group-hover:rotate-y-180 transition-transform duration-600">
                      {/* Front of card */}
                      <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-lg bg-gray-800">
                        <div className="relative w-full h-full">
                          {/* Fallback background in case image doesn't load */}
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900"></div>
                          <img
                            src={event.image}
                            alt={event.alt}
                            className="w-full h-full object-cover relative z-10"
                            onError={(e) => {
                              console.log('Image failed to load:', event.image);
                              e.currentTarget.style.opacity = '0';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 sm:p-6 z-20">
                            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                              <h3 className="font-spartan font-bold text-white text-lg sm:text-xl mb-2">
                                {event.name}
                              </h3>
                              <div className="flex items-center text-gray-300 text-sm sm:text-base">
                                <Clock className="w-4 h-4 mr-2" />
                                {event.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Back of card */}
                      <div 
                        className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-lg rotate-y-180"
                        style={{ transform: 'rotateY(180deg)' }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex flex-col justify-center p-4 sm:p-6">
                          <div className="text-center">
                            <h3 className="font-spartan font-bold text-white text-xl sm:text-2xl mb-4">
                              {event.name}
                            </h3>
                            <div className="flex items-center justify-center text-white/90 text-sm sm:text-base mb-4">
                              <Clock className="w-4 h-4 mr-2" />
                              {event.time}
                            </div>
                            <p className="font-source text-white/90 text-sm sm:text-base leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;