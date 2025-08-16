import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import { getEventById, getEventsByDay } from '@/data/eventsData';
import Navigation from '@/components/Navigation';

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  
  const event = eventId ? getEventById(eventId) : null;
  
  if (!event) {
    return (
      <div className="pb-12 relative w-full" style={{ backgroundColor: 'rgb(10,10,10)' }}>
        <Navigation />
        <div className="pt-20 px-4">
          <div className="container mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold mb-4 text-white">Event Not Found</h1>
            <p className="text-xl text-gray-300 mb-6">Sorry, the event you're looking for doesn't exist.</p>
            <Button 
              onClick={() => navigate('/')} 
              className="bg-crimson hover:bg-crimson-bright text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const otherEvents = getEventsByDay(event.day).filter(e => e.id !== event.id).slice(0, 3);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'literary': return 'bg-blue-600/20 text-blue-400';
      case 'creative': return 'bg-purple-600/20 text-purple-400';
      case 'interactive': return 'bg-green-600/20 text-green-400';
      case 'performance': return 'bg-crimson/20 text-crimson';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  return (
    <div className="pb-12 relative w-full" style={{ backgroundColor: 'rgb(10,10,10)' }}>
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Back Button */}
          <div className="mb-8">
            <Button 
              onClick={() => navigate('/')} 
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Event Image */}
            <div className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #374151 0%, #1f2937 100%)';
                      e.currentTarget.style.display = 'flex';
                      e.currentTarget.style.alignItems = 'center';
                      e.currentTarget.style.justifyContent = 'center';
                      e.currentTarget.innerHTML = `<div class="text-gray-400 text-center">
                        <div class="text-4xl mb-2">📚</div>
                        <div>Event Poster</div>
                        <div class="text-sm opacity-75">${event.name}</div>
                      </div>`;
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getCategoryColor(event.category)}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Event Details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  {event.name}
                </h1>
                <div className="flex items-center space-x-2 mb-6">
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    Day {event.day}
                  </Badge>
                </div>
              </div>

              {/* Date and Time Cards on Right Side */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gray-800/30 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-crimson" />
                      <div>
                        <div className="text-white font-medium">Date</div>
                        <div className="text-gray-300 text-sm">{event.date}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800/30 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-crimson" />
                      <div>
                        <div className="text-white font-medium">Time</div>
                        <div className="text-gray-300 text-sm">{event.time}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Event Info Grid */}
              <div className="grid gap-4">
                {event.venue && (
                  <div className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <MapPin className="w-5 h-5 text-crimson" />
                    <div>
                      <span className="text-gray-400">Venue: </span>
                      <span className="text-white font-medium">{event.venue}</span>
                    </div>
                  </div>
                )}

                {event.duration && (
                  <div className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <Clock className="w-5 h-5 text-crimson" />
                    <div>
                      <span className="text-gray-400">Duration: </span>
                      <span className="text-white font-medium">{event.duration}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Register Button */}
              <div className="space-y-4">
                <Button 
                  onClick={() => navigate('/register')}
                  className="w-full bg-crimson hover:bg-crimson-bright text-white py-4 text-lg font-semibold"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Register for Literovia 2025
                </Button>
                <p className="text-center text-gray-400 text-sm">
                  Single registration gives access to all events • ₹149 only
                </p>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="mt-16">
            <Card className="bg-gray-800/30 border-gray-700">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-6">About This Event</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {event.fullDescription}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Other Events on Same Day */}
          {otherEvents.length > 0 && (
            <div className="mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  More Events on Day {event.day}
                </h2>
                <p className="text-gray-300 text-lg">
                  Check out other exciting events happening on {event.date}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherEvents.map((otherEvent) => (
                  <Card 
                    key={otherEvent.id} 
                    className="bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group"
                    onClick={() => navigate(`/event/${otherEvent.id}`)}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={otherEvent.image}
                        alt={otherEvent.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #374151 0%, #1f2937 100%)';
                          e.currentTarget.style.display = 'flex';
                          e.currentTarget.style.alignItems = 'center';
                          e.currentTarget.style.justifyContent = 'center';
                          e.currentTarget.innerHTML = `<div class="text-gray-400 text-center">
                            <div class="text-2xl mb-1">📚</div>
                            <div class="text-sm">${otherEvent.name}</div>
                          </div>`;
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={getCategoryColor(otherEvent.category)}>
                          {otherEvent.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-crimson transition-colors">
                        {otherEvent.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {otherEvent.fullDescription.slice(0, 100)}...
                      </p>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {otherEvent.time}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button 
                  onClick={() => navigate('/#schedule')}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  View All Events
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EventDetail;