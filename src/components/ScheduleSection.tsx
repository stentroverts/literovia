import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const day1Events = [
  { 
    name: 'Slam Poetry', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Slam Poetry Event',
    description: 'Experience the raw power of spoken word poetry as talented poets share their most compelling stories and emotions.'
  },
  { 
    name: 'Literary Auction', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Literary Auction Event',
    description: 'Bid on rare books, signed manuscripts, and unique literary artifacts in this exciting auction event.'
  },
  { 
    name: 'Workshop', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Writing Workshop Event',
    description: 'Join our interactive writing workshop and learn techniques from experienced authors and editors.'
  },
  { 
    name: 'BangJam', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'BangJam Music Event',
    description: 'A fusion of music and literature where artists create live performances blending both art forms.'
  },
  { 
    name: 'Paperback Partners', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Paperback Partners Event',
    description: 'Connect with fellow book lovers and find your perfect reading companion in this networking event.'
  },
  { 
    name: 'Performance', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Performance Event',
    description: 'Watch dramatic interpretations of classic literature brought to life by talented performers.'
  },
  { 
    name: 'GeoGuesser', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'GeoGuesser Event',
    description: 'Test your geographical knowledge in this fun and interactive quiz competition.'
  },
  { 
    name: 'NY Times Mini Games', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'NY Times Mini Games Event',
    description: 'Challenge yourself with popular New York Times puzzle games and brain teasers.'
  }
];

const day2Events = [
  { 
    name: 'Poem Interpretation', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Poem Interpretation Event',
    description: 'Dive deep into the meaning and artistry of classic and contemporary poetry.'
  },
  { 
    name: 'LoreWars', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'LoreWars Event',
    description: 'Battle it out in this epic competition of literary knowledge and storytelling prowess.'
  },
  { 
    name: 'Spockle', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Spockle Event',
    description: 'A unique blend of spoken word and interactive storytelling that will captivate your imagination.'
  },
  { 
    name: 'Theatre', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Theatre Event',
    description: 'Experience powerful theatrical performances bringing literature to life on stage.'
  },
  { 
    name: 'After Dinner Speech', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'After Dinner Speech Event',
    description: 'Enjoy inspiring speeches and talks from renowned literary figures and industry experts.'
  },
  { 
    name: 'Panel Discussion', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Panel Discussion Event',
    description: 'Join industry experts as they discuss current trends in literature, publishing, and creative writing.'
  },
  { 
    name: 'Change My Mind', 
    image: '/events/slam-poetry.jpeg', 
    alt: 'Change My Mind Debate Event',
    description: 'Engaging debates on controversial literary topics where participants try to change each other\'s perspectives.'
  },
  { 
    name: 'Hot Takes Arena', 
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
      <style>{`
        /* Enhanced Day Toggle Styling */
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

        /* Event Card Styling with your design */
        .event-card {
          position: relative;
          width: 100%;
          max-width: 300px;
          height: 200px;
          background-color: #1a1a1a;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          perspective: 1000px;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
        }

        .event-card:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 32px rgba(220, 38, 38, 0.4);
        }

        .event-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .event-card:hover .event-card__image {
          scale: 0;
          opacity: 0;
        }

        .event-card__content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 20px;
          box-sizing: border-box;
          background: linear-gradient(135deg, hsl(348, 83%, 47%) 0%, hsl(348, 100%, 55%) 100%);
          transform: rotateX(-90deg);
          transform-origin: bottom;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .event-card:hover .event-card__content {
          transform: rotateX(0deg);
        }

        .event-card__title {
          margin: 0 0 16px 0;
          font-size: 22px;
          color: white;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .event-card__description {
          margin: 0;
          font-size: 13px;
          color: rgba(255,255,255,0.9);
          line-height: 1.5;
          text-align: center;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .event-card {
            height: 180px;
            max-width: 280px;
          }
          
          .event-card__content {
            padding: 16px;
          }
          
          .event-card__title {
            font-size: 20px;
            margin: 0 0 12px 0;
          }
          
          .event-card__description {
            font-size: 12px;
          }
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
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="font-spartan font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase text-white mb-4 sm:mb-6 lg:mb-8 px-4">
            EVENT SCHEDULE
          </h2>
          <p className="font-source text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4 sm:mb-6 lg:mb-8 px-4">
            full masti • September 8-9, 2025
          </p>
        </div>

        {/* Enhanced Day Selector */}
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

        {/* Events Grid */}
        <div className={`events-container ${isTransitioning ? 'events-fade-out' : 'events-fade-in'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-items-center px-4">
            {currentEvents.map((event, index) => (
              <div key={`${activeDay}-${index}`} className="event-card">
                <img
                  src={event.image}
                  alt={event.alt}
                  className="event-card__image"
                  onError={(e) => {
                    // Fallback to a solid color background if image fails
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #374151 0%, #1f2937 100%)';
                  }}
                />
                <div className="event-card__content">
                  <p className="event-card__title">{event.name}</p>
                  <p className="event-card__description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;