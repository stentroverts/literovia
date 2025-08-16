// Event Management Utilities
// This file provides easy ways to manage and update event data

import { Event, eventsData } from './eventsData';

/**
 * Instructions for updating event data:
 * 
 * 1. EVENT IMAGES:
 *    - Add your event poster images to: /public/events/
 *    - Recommended format: PNG or JPG
 *    - Recommended size: 800x600px (4:3 aspect ratio)
 *    - Update the 'image' field in eventsData.ts with the correct path
 *    - Example: '/events/slam-poetry.png'
 * 
 * 2. EVENT DESCRIPTIONS:
 *    - Full description: Used in event detail page and cards (can be longer, descriptive)
 *    - Update 'fullDescription' field
 * 
 * 3. EVENT TIMING:
 *    - Update 'date', 'time', and 'duration' fields
 *    - Format: 'September 8, 2025' for date
 *    - Format: '10:00 AM - 12:00 PM' for time
 *    - Format: '2 hours' for duration
 * 
 * 4. VENUE INFORMATION:
 *    - Update 'venue' field with specific location
 *    - Example: 'Main Auditorium', 'Library Hall', etc.
 * 
 * 5. PARTICIPANT LIMITS:
 *    - Update 'maxParticipants' for events with limited capacity
 *    - Set to null or remove field for unlimited events
 * 
 * 6. PREREQUISITES:
 *    - Update 'prerequisites' with any requirements
 *    - Example: 'Bring writing materials', 'Form teams of 4'
 */

// Helper function to validate event data
export const validateEvent = (event: Event): string[] => {
  const errors: string[] = [];
  
  if (!event.name || event.name.trim().length < 3) {
    errors.push('Event name must be at least 3 characters long');
  }
  
  if (!event.fullDescription || event.fullDescription.trim().length < 100) {
    errors.push('Full description must be at least 100 characters long');
  }
  
  if (!event.date || !event.time) {
    errors.push('Event must have both date and time specified');
  }
  
  if (!event.image || !event.image.startsWith('/')) {
    errors.push('Event image must be a valid path starting with /');
  }
  
  return errors;
};

// Helper function to get events with validation
export const getValidatedEvents = (): Event[] => {
  const validEvents: Event[] = [];
  const invalidEvents: { event: Event; errors: string[] }[] = [];
  
  eventsData.forEach(event => {
    const errors = validateEvent(event);
    if (errors.length === 0) {
      validEvents.push(event);
    } else {
      invalidEvents.push({ event, errors });
    }
  });
  
  if (invalidEvents.length > 0) {
    console.warn('Some events have validation errors:', invalidEvents);
  }
  
  return validEvents;
};

// Template for adding new events
export const eventTemplate: Partial<Event> = {
  id: 'new-event-id', // Must be unique, kebab-case
  name: 'Event Name',
  fullDescription: 'Detailed description for the event page. This should be comprehensive and engaging, explaining what participants can expect, what they will learn or experience, and any important details about the event format.',
  date: 'September 8, 2025', // or September 9, 2025
  time: '10:00 AM - 12:00 PM',
  day: 1, // 1 or 2
  image: '/events/event-name.png', // Add your image to public/events/
  category: 'literary', // 'literary' | 'creative' | 'interactive' | 'performance'
  venue: 'Event Venue',
  duration: '2 hours'
};

// Quick reference for event categories
export const eventCategories = {
  literary: 'Academic and educational literary events',
  creative: 'Creative and artistic expression events', 
  interactive: 'Participatory and competitive events',
  performance: 'Stage performances and presentations'
};

export default {
  validateEvent,
  getValidatedEvents,
  eventTemplate,
  eventCategories
};
