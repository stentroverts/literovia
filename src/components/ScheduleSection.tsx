import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import TiltedCard from './ui/TiltedCard';
import { Calendar, Clock } from 'lucide-react';

const day1Events = [
  { name: 'Slam Poetry', time: '10:00 AM', image: '/src/assets/events/slam poetry.jpeg', alt: 'Slam Poetry Event' },
  { name: 'Literary Auction', time: '11:30 AM', image: '/src/assets/events/slam poetry.jpeg', alt: 'Literary Auction Event' },
  { name: 'Workshop', time: '1:00 PM', image: '/src/assets/events/slam poetry.jpeg', alt: 'Writing Workshop Event' },
  { name: 'BangJam', time: '2:30 PM', image: '/src/assets/events/slam poetry.jpeg', alt: 'BangJam Music Event' },
  { name: 'Paperback Partners', time: '4:00 PM', image: '/src/assets/events/slam poetry.jpeg', alt: 'Paperback Partners Event' },
  { name: 'Performance', time: '5:30 PM', image: '/src/assets/events/slam poetry.jpeg', alt: 'Performance Event' },
  { name: 'GeoGuesser', time: '7:00 PM', image: '/src/assets/events/slam poetry.jpeg', alt: 'GeoGuesser Game Event' },
  { name: 'NY Times Mini Games', time: '8:30 PM', image: '/src/assets/events/slam poetry.jpeg', alt: 'NY Times Mini Games Event' }
];

const day2Events = [
  { name: 'Poem Interpretation', time: '10:00 AM', image: '/src/assets/events/slam poetry.jpeg', alt: 'Poem Interpretation Event' },
  { name: 'LoreWars', time: '11:30 AM', image: '/src/assets/events/slam poetry.jpeg', alt: 'LoreWars Battle Event' },
  { name: 'Spockle', time: '1:00 PM', image: '/src/assets/events/slam poetry.jpeg', alt: 'Spockle Game Event' },
  { name: 'Theatre', time: '2:30 PM', image: '/src/assets/events/slam poetry.jpeg', alt: 'Theatre Performance Event' },
  { name: 'Solo Speaking', time: '4:00 PM', image: '/src/assets/events/slam poetry.jpeg', alt: 'Solo Speaking Event' },
  { name: 'Panel Discussion', time: '5:30 PM', image: '/src/assets/events/slam poetry.jpeg', alt: 'Panel Discussion Event' },
  { name: 'Change My Mind', time: '7:00 PM', image: '/src/assets/events/slam poetry.jpeg', alt: 'Change My Mind Debate Event' },
  { name: 'Hot Takes Arena', time: '8:30 PM', image: '/src/assets/events/slam poetry.jpeg', alt: 'Hot Takes Arena Event' }
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
          padding: 16px 32px;
          font-weight: 700;
          backdrop-filter: blur(10px);
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
          <div className="text-center mb-20">
            <h2 className="font-spartan font-bold text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase text-white mb-8">
              EVENT SCHEDULE
            </h2>
            <p className="font-source text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              full masti • September 8-9, 2025
            </p>
          </div>
        </ScrollReveal>

        {/* Enhanced Day Selector */}
        <ScrollReveal delay={200}>
          <div className="flex justify-center mb-16">
            <div className="day-toggle relative">
              {/* Sliding background */}
              <div className={`day-slider ${activeDay === 2 ? 'slide-right' : ''}`}></div>
              
              {/* Day buttons */}
              <div className="flex relative z-10">
                <button
                  onClick={() => handleDayChange(1)}
                  className={`day-button ${activeDay === 1 ? 'active' : 'inactive'}`}
                >
                  <div className="flex items-center justify-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <div>
                      <div className="text-base sm:text-lg font-spartan font-bold">Day 1</div>
                      <div className="text-xs mt-1 opacity-90">Sept 8</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleDayChange(2)}
                  className={`day-button ${activeDay === 2 ? 'active' : 'inactive'}`}
                >
                  <div className="flex items-center justify-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <div>
                      <div className="text-base sm:text-lg font-spartan font-bold">Day 2</div>
                      <div className="text-xs mt-1 opacity-90">Sept 9</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Events Grid with TiltedCard Components */}
        <div className={`events-container ${isTransitioning ? 'events-fade-out' : 'events-fade-in'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {currentEvents.map((event, index) => (
              <ScrollReveal key={`${activeDay}-${index}`} delay={isTransitioning ? 0 : index * 100}>
                <div className="w-full max-w-[280px]">
                  <TiltedCard
                    imageSrc={event.image}
                    altText={event.alt}
                    captionText={`${event.name} - ${event.time}`}
                    containerHeight="320px"
                    containerWidth="100%"
                    imageHeight="280px"
                    imageWidth="280px"
                    rotateAmplitude={12}
                    scaleOnHover={1.15}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={true}
                    overlayContent={
                      <div className="w-full h-full rounded-[15px] flex flex-col justify-start p-4 relative">
                        {/* Top overlay - using TiltedCard color scheme swapped */}
                        <div 
                          className="rounded-2xl px-5 py-3 inline-block self-start"
                          style={{ 
                            backgroundColor: '#0006',
                            boxShadow: '0 5px 30px #06001059' 
                          }}
                        >
                          <h3 className="font-spartan font-bold text-white text-sm tracking-wide">
                            {event.name}
                          </h3>
                        </div>
                      </div>
                    }
                  />
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