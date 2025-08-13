import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

interface FlipCardProps {
  name: string;
  time: string;
  image: string;
  alt: string;
  description: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ name, time, image, alt, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <div 
      className="w-full h-80 sm:h-96 perspective-1000 cursor-pointer" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full transform-style-preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-lg">
          <div className="relative w-full h-full">
            <img
              src={image}
              alt={alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 sm:p-6">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <h3 className="font-spartan font-bold text-white text-lg sm:text-xl mb-2">
                  {name}
                </h3>
                <div className="flex items-center text-gray-300 text-sm sm:text-base">
                  <Clock className="w-4 h-4 mr-2" />
                  {time}
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
                {name}
              </h3>
              <div className="flex items-center justify-center text-white/90 text-sm sm:text-base mb-4">
                <Clock className="w-4 h-4 mr-2" />
                {time}
              </div>
              <p className="font-source text-white/90 text-sm sm:text-base leading-relaxed">
                {description}
              </p>
              <div className="mt-6 text-white/70 text-xs sm:text-sm">
                Hover to see details
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
