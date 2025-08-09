import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  variant?: 'red' | 'white';
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '', variant = 'white' }) => {
  const animationDuration = `${speed}s`;

  const getGradientBackground = () => {
    switch (variant) {
      case 'red':
        return 'linear-gradient(120deg, #dc2626 35%, #ef4444 40%, rgba(255, 255, 255, 0.9) 50%, #ef4444 60%, #dc2626 65%)';
      case 'white':
      default:
        return 'linear-gradient(120deg, rgba(181, 181, 181, 0.64) 35%, rgba(181, 181, 181, 0.64) 40%, rgba(255, 255, 255, 0.9) 50%, rgba(181, 181, 181, 0.64) 60%, rgba(181, 181, 181, 0.64) 65%)';
    }
  };

  return (
    <div
      className={`inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        background: getGradientBackground(),
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        animationDuration: animationDuration,
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
