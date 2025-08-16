import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useNavigate } from 'react-router-dom';
import heroBg from '@/assets/book.svg';
import ShinyText from '@/components/ui/shiny-text';

const HeroSection = () => {
  const navigate = useNavigate();
  const { displayText: typedText, isComplete } = useTypewriter({
    text: 'Literovia',
    speed: 150,
    delay: 500,
  });

  const openRegistrationForm = () => {
    navigate('/register');
  };


  // CSS variables
  const bgColor = 'rgb(10,10,10)';
  const fgColor = 'hsl(210, 20%, 95%)';
  const crimson = 'hsl(348, 83%, 47%)';
  const secondaryText = 'hsl(215, 15%, 65%)';

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 0.75rem',
        overflow: 'hidden',
        backgroundColor: bgColor,
        color: fgColor,
      }}
    >
      {/* Fade-in Hero Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <img
          src={heroBg}
          alt="Literovia Book"
          style={{
            width: 'clamp(280px, 70vw, 842px)',
            height: 'auto',
            opacity: 0,
            animation: 'fadeInSlow 3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        />
      </div>



      {/* Inline keyframes */}
      <style>{`
        @keyframes fadeInSlow {
          from { 
            opacity: 0; 
            transform: scale(1.03) translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        @keyframes blink { 
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes bookFlip {
          0% {
            transform: perspective(1200px) rotateY(0deg) scale(1);
            opacity: 1;
            box-shadow: 0 0 0 rgba(0,0,0,0.1);
          }
          40% {
            box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          }
          60% {
            box-shadow: 0 16px 64px rgba(0,0,0,0.22);
          }
          100% {
            transform: perspective(1200px) rotateY(-100deg) scale(1.05);
            opacity: 0.1;
            box-shadow: 0 32px 128px rgba(0,0,0,0.25);
          }
        }
        .book-flip-animation {
          width: 80vw;
          max-width: 900px;
          height: 60vh;
          background: linear-gradient(90deg, #fff 60%, #f3e9e1 100%);
          border-radius: 0.5rem 0.5rem 1.5rem 1.5rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          animation: bookFlip 1.2s cubic-bezier(0.77,0,0.175,1) forwards;
          will-change: transform, opacity;
          border: 1px solid #e2d6c2;
        }
      `}</style>

      {/* Text Container */}
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          zIndex: 10,
          transform: 'translateY(clamp(8vh, 15vh, 18vh))',
          maxWidth: '95vw',
          width: '100%',
          padding: '0 0.5rem',
        }}
      >
        {/* Main Title */}
        <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
          <h1
            style={{
              fontFamily: '"Della Respira", serif',
              margin: 0,
              fontSize: 'clamp(2.5rem, 12vw, 10rem)',
              color: crimson,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              wordBreak: 'keep-all',
              overflow: 'visible',
            }}
          >
            {typedText}
            {!isComplete && (
              <span style={{ 
                marginLeft: '0.2rem', 
                animation: 'blink 1.2s ease-in-out infinite', 
                color: crimson 
              }}>|</span>
            )}
          </h1>

          {/* Subtitle "The 1st edition" delayed */}
          <ScrollReveal delay={1000}>
            <span
              style={{
                position: 'relative',
                display: 'block',
                marginTop: 'clamp(1rem, 3vw, 2rem)',
                marginLeft: 'auto',
                marginRight: 'auto',
                fontFamily: '"Playwrite US Trad", cursive',
                fontWeight: 'bold',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)',
                textAlign: 'center',
                transform: 'translateX(clamp(0rem, 8vw, 11rem))', // Responsive positioning
              }}
            >
              <ShinyText 
                text="1st edition" 
                speed={3}
                className="font-playwrite font-bold"
              />
            </span>
          </ScrollReveal>
        </div>

        {/* "A Stentorian Odyssey" */}
        <ScrollReveal delay={1500}>
          <h2
            style={{
              fontFamily: '"Homemade Apple", regular',
              fontSize: 'clamp(0.9rem, 3.5vw, 1.8rem)',
              margin: 'clamp(2rem, 4vh, 3.5rem) 0 0 0',
              lineHeight: 1.2,
              maxWidth: '100%',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              textAlign: 'center',
              padding: '0 1rem',
              display: 'block',
            }}
          >
            -A Stentorian Odyssey
          </h2>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={1500}>
          <div style={{ 
            marginTop: 'clamp(1.5rem, 4vh, 2.5rem)',
            padding: '0 1rem',
          }}>
            <Button
              variant="hero"
              size="xl"
              onClick={openRegistrationForm}
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                minHeight: '48px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
              }}
            >
              BUY PASS
            </Button>
          </div>
        </ScrollReveal>

        {/* Tagline */}
        <ScrollReveal delay={1600}>
          <p
            style={{
              marginTop: 'clamp(1rem, 3vh, 1.5rem)',
              fontFamily: '"Source Serif Pro", serif',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)',
              color: secondaryText,
              maxWidth: 'min(90vw, 40rem)',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: '0 1rem',
              lineHeight: 1.4,
              textAlign: 'center',
            }}
          >
            come join us plsokthnx
          </p>
          
          {/* Event Dates */}
          <div
            style={{
              marginTop: 'clamp(0.75rem, 2vh, 1rem)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: '"Source Serif Pro", serif',
                fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                fontWeight: 'bold',
                color: crimson,
                textShadow: `0 0 20px ${crimson}40`,
                letterSpacing: '0.05em',
              }}
            >
              September 8-9, 2025
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;