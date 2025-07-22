import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';
import { useTypewriter } from '@/hooks/useTypewriter';
import heroBg from '@/assets/book.svg';

const HeroSection = () => {
  const { displayText: typedText, isComplete } = useTypewriter({
    text: 'LITEROVIA',
    speed: 150,
    delay: 500,
  });

  const scrollToAmazingRace = () => {
    document.getElementById('amazing-race')?.scrollIntoView({ behavior: 'smooth' });
  };

  // CSS variables
  const bgColor = 'hsl(222, 47%, 4%)';
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
        padding: '0 1rem',
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
        }}
      >
        <img
          src={heroBg}
          alt="Literovia Book"
          style={{
            width: '70vw',
            maxWidth: '842px',
            height: 'auto',
            opacity: 0,
            animation: 'fadeInSlow 2.5s ease-out forwards',
          }}
        />
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes fadeInSlow {
          from { opacity: 0; transform: scale(1.02); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>

      {/* Text Container */}
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          zIndex: 10,
          transform: 'translateY(18vh)',
          maxWidth: '90vw',
        }}
      >
        {/* Main Title */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <h1
            style={{
              fontFamily: 'Sunday, serif',
              margin: 0,
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              color: crimson,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {typedText}
            {!isComplete && (
              <span style={{ marginLeft: '0.5rem', animation: 'blink 1s step-end infinite', color: crimson }}>|</span>
            )}
          </h1>

          {/* Subtitle "The 1st edition" delayed */}
          <ScrollReveal delay={1500}>
            <span
              style={{
                position: 'absolute',
                top: '100%',
                right: '-2rem',
                marginTop: '1.5rem',
                fontFamily: '"Playwrite US Trad", cursive',
                fontWeight: 'bold',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: fgColor,
                opacity: 0.8,
              }}
            >
              The 1st edition
            </span>
          </ScrollReveal>
        </div>

        {/* "A Stentorian Odyssey" */}
        <ScrollReveal delay={2000}>
          <h2
            style={{
              fontFamily: '"Homemade Apple", regular',
              fontSize: 'clamp(1rem, 2.1vw, 2.1rem)',
              margin: '4.5rem -29rem 0 0',
              lineHeight: 1.1,
            }}
          >
            -A &nbsp;Stentorian Odyssey
          </h2>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={4000}>
          <div style={{ marginTop: '1.5rem' }}>
            <Button
              variant="hero"
              size="xl"
              onClick={scrollToAmazingRace}
            >
              Register NOW
            </Button>
          </div>
        </ScrollReveal>

        {/* Tagline */}
        <ScrollReveal delay={4500}>
          <p
            style={{
              marginTop: '1.5rem',
              fontFamily: '"Source Serif Pro", serif',
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: secondaryText,
              maxWidth: '40rem',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            come join us plsokthnx
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;