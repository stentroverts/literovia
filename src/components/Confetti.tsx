import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocity: {
    x: number;
    y: number;
    rotation: number;
  };
  shape: 'circle' | 'square' | 'triangle';
}

interface ConfettiProps {
  active: boolean;
  duration?: number;
  particleCount?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ 
  active, 
  duration = 3000, 
  particleCount = 150 
}) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const colors = [
    '#DC2626', // crimson
    '#F59E0B', // amber
    '#EF4444', // red
    '#F97316', // orange
    '#FBBF24', // yellow
    '#FDE047', // bright yellow
    '#FFFFFF', // white
    '#D1D5DB', // gray
  ];

  const createConfettiPiece = (id: number): ConfettiPiece => {
    const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
    
    return {
      id,
      x: Math.random() * window.innerWidth,
      y: -10,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      velocity: {
        x: (Math.random() - 0.5) * 4,
        y: Math.random() * 3 + 2,
        rotation: (Math.random() - 0.5) * 10,
      },
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    };
  };

  useEffect(() => {
    if (!active) return;

    setIsAnimating(true);
    
    // Create initial confetti pieces
    const initialPieces = Array.from({ length: particleCount }, (_, i) => 
      createConfettiPiece(i)
    );
    setPieces(initialPieces);

    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      if (elapsed > duration) {
        setPieces([]);
        setIsAnimating(false);
        return;
      }

      setPieces(currentPieces => 
        currentPieces
          .map(piece => ({
            ...piece,
            x: piece.x + piece.velocity.x,
            y: piece.y + piece.velocity.y,
            rotation: piece.rotation + piece.velocity.rotation,
            velocity: {
              ...piece.velocity,
              y: piece.velocity.y + 0.1, // gravity
            },
          }))
          .filter(piece => piece.y < window.innerHeight + 50)
      );

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [active, duration, particleCount]);

  if (!isAnimating || pieces.length === 0) return null;

  const renderShape = (piece: ConfettiPiece) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: `${piece.x}px`,
      top: `${piece.y}px`,
      width: `${piece.size}px`,
      height: `${piece.size}px`,
      backgroundColor: piece.color,
      transform: `rotate(${piece.rotation}deg)`,
      pointerEvents: 'none' as const,
    };

    switch (piece.shape) {
      case 'circle':
        return (
          <div
            key={piece.id}
            style={{
              ...baseStyle,
              borderRadius: '50%',
            }}
          />
        );
      case 'square':
        return (
          <div
            key={piece.id}
            style={baseStyle}
          />
        );
      case 'triangle':
        return (
          <div
            key={piece.id}
            style={{
              ...baseStyle,
              backgroundColor: 'transparent',
              borderLeft: `${piece.size / 2}px solid transparent`,
              borderRight: `${piece.size / 2}px solid transparent`,
              borderBottom: `${piece.size}px solid ${piece.color}`,
              width: '0',
              height: '0',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {pieces.map(renderShape)}
    </div>
  );
};

export default Confetti;
