// Registration Configuration
// Updated to use internal registration page

export const REGISTRATION_CONFIG = {
  // Internal registration page route
  FORM_URL: '/register',
  
  // Google Apps Script URL for backend processing
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxjbbUmkxIUS9L-ASu5aZRZAnidTp-chy-5fLbXM52ewoSmQQx9znk7j3j2Ur-YxX4bzQ/exec',
  
  // Event details
  EVENT_NAME: 'Literovia 2025',
  EVENT_SUBTITLE: 'A Stentorian Odyssey',
  EVENT_DATES: 'September 8-9, 2025',
  EVENT_VENUE: 'VNRVJIET Campus',
  
  // Contact information
  CONTACT_EMAIL: 'stentorian@vnrvjiet.edu.in',
  INSTAGRAM: '@stentorian_vnrvjiet',
  LINKEDIN: 'Stentorian VNRVJIET',
  
  // Registration settings
  REGISTRATION_OPEN: true,
  MAX_REGISTRATIONS: 500, // Set to null for unlimited
  
  // Available events
  EVENTS: [
    {
      id: 'amazing-race',
      name: 'Amazing Race',
      description: '2-person team event',
      teamSize: 2
    },
    {
      id: 'lit-fest',
      name: 'Lit Fest',
      description: 'Individual literary competition',
      teamSize: 1
    }
  ]
};

// Helper function to navigate to registration page
export const openRegistrationForm = () => {
  if (!REGISTRATION_CONFIG.REGISTRATION_OPEN) {
    alert('Registration is currently closed. Please check back later.');
    return;
  }
  
  // Navigate to internal registration page
  window.location.href = REGISTRATION_CONFIG.FORM_URL;
};
