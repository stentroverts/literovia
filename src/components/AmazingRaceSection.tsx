import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollReveal from './ScrollReveal';
import raceBg from '@/assets/coffee-bg.svg'; // Replace with your desired background SVG/image
import { Button } from '@/components/ui/button';

const AmazingRaceSection = () => {
  return (
    <section
      id="amazingrace"
      style={{
        backgroundImage: `url(${raceBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="py-20 px-6"
    >
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal>
          <Card className="bg-black/70 backdrop-blur-sm border border-white/10 text-white hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-12 text-center">
              <div className="mb-10">
                <h2 className="font-spartan font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase text-white mb-6">
                  The <span className="text-crimson">Amazing Race</span>
                </h2>
                <p className="font-source text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  aagam race
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button
                  variant="hero"
                  size="xl"
                  className="min-w-[200px] bg-crimson text-white hover:bg-crimson-dark"
                >
                  Join the Race
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="min-w-[200px] text-white border-white hover:bg-white/10"
                >
                  Know More
                </Button>
              </div>

              <div className="text-center">
                <p className="font-source text-sm sm:text-base text-gray-300">
                  Team registrations open • Limited entries only
                </p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AmazingRaceSection;
