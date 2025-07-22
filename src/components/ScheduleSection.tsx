import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ScrollReveal from './ScrollReveal';
import coffeeBg from '@/assets/coffee-bg.svg';

const day1Events = [
  'Slam Poetry', 'Literary Auction', 'Workshop', 'BangJam',
  'Paperback Partners', 'Performance', 'GeoGuesser', 'NY Times Mini Games'
];

const day2Events = [
  'Poem Interpretation', 'LoreWars', 'Spockle', 'Theatre',
  'Solo Speaking', 'Panel Discussion', 'Change My Mind', 'Hot Takes Arena'
];

const ScheduleSection = () => {
  return (
    <section
      id="schedule"
      style={{
        backgroundImage: `url(${coffeeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="py-20 px-6"
    >
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
            </div>
            <h2 className="font-spartan font-bold text-3xl md:text-4xl lg:text-5xl uppercase text-gray-800 mb-4">
              <span style={{ color: 'hsl(348,83%,47%)' }}>A Two-Day</span>
              <br /> Literary Spectacle
            </h2>
            <div className="font-spartan font-bold text-xl md:text-2xl text-gray-700 mb-6">
              Dates TBA
            </div>
            <p className="font-source text-base md:text-lg text-gray-700 mx-auto max-w-3xl">
              Two full days of literary excellence featuring competitions, workshops, performances, and discussions.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal delay={200}>
            <Card className="bg-white/90 backdrop-blur-md border border-gray-300 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <CardTitle className="font-spartan font-bold text-2xl md:text-3xl uppercase text-gray-800">
                  Literovia Day 1
                </CardTitle>
                <p className="font-source text-gray-600">Date TBA</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {day1Events.map((event, idx) => (
                    <div
                      key={idx}
                      className="bg-white/70 p-3 rounded-lg border border-gray-200 hover:border-gray-400 transition-colors"
                    >
                      <p className="font-source font-semibold text-gray-800 text-sm text-center">
                        {event}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <Card className="bg-white/90 backdrop-blur-md border border-gray-300 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <CardTitle className="font-spartan font-bold text-2xl md:text-3xl uppercase text-gray-800">
                  Literovia Day 2
                </CardTitle>
                <p className="font-source text-gray-600">Date TBA</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {day2Events.map((event, idx) => (
                    <div
                      key={idx}
                      className="bg-white/70 p-3 rounded-lg border border-gray-200 hover:border-gray-400 transition-colors"
                    >
                      <p className="font-source font-semibold text-gray-800 text-sm text-center">
                        {event}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;