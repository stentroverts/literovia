import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ScrollReveal from './ScrollReveal';
import coffeeBg from '@/assets/coffee-bg.svg';

const RegisterSection = () => {
  return (
    <section
      id="register"
      style={{
        backgroundImage: `url(${coffeeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="py-20 px-6"
    >
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <Card className="bg-white/90 backdrop-blur-md border border-gray-300 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <h2 className="font-spartan font-bold text-3xl md:text-4xl uppercase text-gray-800 mb-4">
                  Join the <span className="text-crimson">Odyssey</span>
                </h2>
                <p className="font-source text-base md:text-lg text-gray-700 leading-relaxed">
                 Lorem Ipsum
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button
                  variant="hero"
                  size="xl"
                  className="min-w-[200px] bg-crimson text-white hover:bg-crimson-dark"
                >
                  Register Now
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="min-w-[200px] bg-crimson text-white hover:bg-crimson-dark"
                >
                  Learn More
                </Button>
              </div>

              <div className="text-center">
                <p className="font-source text-sm md:text-base text-gray-600">
                  Limited spots available ?? • Early bird discounts apply ??
                </p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default RegisterSection;
