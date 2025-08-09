import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import TiltedCard from './ui/TiltedCard';
import { Calendar, Clock } from 'lucide-react';

const day1Events = [
  { name: 'Slam Poetry', time: '10:00 AM', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=faces', alt: 'Slam Poetry Event' },
  { name: 'Literary Auction', time: '11:30 AM', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop', alt: 'Literary Auction Event' },
  { name: 'Workshop', time: '1:00 PM', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=600&fit=crop', alt: 'Writing Workshop Event' },
  { name: 'BangJam', time: '2:30 PM', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop', alt: 'BangJam Music Event' },
  { name: 'Paperback Partners', time: '4:00 PM', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=600&fit=crop', alt: 'Paperback Partners Event' },
  { name: 'Performance', time: '5:30 PM', image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600&h=600&fit=crop', alt: 'Performance Event' },
  { name: 'GeoGuesser', time: '7:00 PM', image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&h=600&fit=crop', alt: 'GeoGuesser Game Event' },
  { name: 'NY Times Mini Games', time: '8:30 PM', image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=600&fit=crop', alt: 'NY Times Mini Games Event' }
];

const day2Events = [
  { name: 'Poem Interpretation', time: '10:00 AM', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=600&fit=crop', alt: 'Poem Interpretation Event' },
  { name: 'LoreWars', time: '11:30 AM', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop', alt: 'LoreWars Battle Event' },
  { name: 'Spockle', time: '1:00 PM', image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=600&fit=crop', alt: 'Spockle Game Event' },
  { name: 'Theatre', time: '2:30 PM', image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=600&fit=crop', alt: 'Theatre Performance Event' },
  { name: 'Solo Speaking', time: '4:00 PM', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=600&fit=crop', alt: 'Solo Speaking Event' },
  { name: 'Panel Discussion', time: '5:30 PM', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop', alt: 'Panel Discussion Event' },
  { name: 'Change My Mind', time: '7:00 PM', image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=600&fit=crop', alt: 'Change My Mind Debate Event' },
  { name: 'Hot Takes Arena', time: '8:30 PM', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=600&fit=crop', alt: 'Hot Takes Arena Event' }
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
                      <div className="w-full h-full rounded-[15px] flex flex-col justify-end p-6 relative">
                        {/* Dark overlay background */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent rounded-[15px]"></div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 mb-2 inline-block">
                            <h3 className="font-spartan font-bold text-white text-base">
                              {event.name}
                            </h3>
                          </div>
                          <div className="flex items-center text-gray-200 text-sm">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="font-mono">{event.time}</span>
                          </div>
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