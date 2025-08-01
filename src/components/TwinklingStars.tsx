import React, { useEffect, useRef } from 'react';
import starsIcon from '@/assets/stars.svg';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
  animationDuration: number;
  twinklePhase: number;
}

const TwinklingStars = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const stars: Star[] = [];
      const starCount = 15; // Subtle amount of stars
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          id: i,
          x: Math.random() * 100, // Percentage
          y: Math.random() * 100, // Percentage
          size: Math.random() * 0.8 + 0.4, // 0.4 to 1.2
          opacity: Math.random() * 0.4 + 0.2, // 0.2 to 0.6 for subtlety
          animationDelay: Math.random() * 4, // 0 to 4 seconds
          animationDuration: Math.random() * 3 + 2, // 2 to 5 seconds
          twinklePhase: Math.random() * Math.PI * 2, // Random phase for variety
        });
      }
      
      starsRef.current = stars;
    };

    generateStars();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
    >
      <style>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: var(--base-opacity);
            transform: scale(var(--base-size)) rotate(0deg);
          }
          25% { 
            opacity: calc(var(--base-opacity) * 1.8);
            transform: scale(calc(var(--base-size) * 1.4)) rotate(90deg);
          }
          50% { 
            opacity: calc(var(--base-opacity) * 0.3);
            transform: scale(calc(var(--base-size) * 0.6)) rotate(180deg);
          }
          75% { 
            opacity: calc(var(--base-opacity) * 1.6);
            transform: scale(calc(var(--base-size) * 1.2)) rotate(270deg);
          }
        }
        
        @keyframes gentleDrift {
          0%, 100% { 
            transform: translate(0, 0) scale(var(--base-size));
          }
          25% { 
            transform: translate(10px, -5px) scale(calc(var(--base-size) * 1.1));
          }
          50% { 
            transform: translate(-5px, 10px) scale(var(--base-size));
          }
          75% { 
            transform: translate(-10px, -10px) scale(calc(var(--base-size) * 0.9));
          }
        }
        
        .twinkling-star {
          position: absolute;
          width: 24px;
          height: 24px;
          background: url("${starsIcon}") no-repeat center center;
          background-size: contain;
          filter: drop-shadow(0 0 8px rgba(247, 230, 143, 0.6));
          animation: 
            twinkle var(--duration) ease-in-out infinite var(--delay),
            gentleDrift calc(var(--duration) * 1.5) ease-in-out infinite calc(var(--delay) * 0.5);
          will-change: transform, opacity;
        }
      `}</style>
      
      {starsRef.current.map((star) => (
        <div
          key={star.id}
          className="twinkling-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            '--base-opacity': star.opacity,
            '--base-size': star.size,
            '--delay': `${star.animationDelay}s`,
            '--duration': `${star.animationDuration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default TwinklingStars;
