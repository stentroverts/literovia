import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';
import Confetti from '@/components/Confetti';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    course: '',
    events: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [showConfetti, setShowConfetti] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEventChange = (eventValue, isChecked) => {
    setFormData(prev => {
      if (eventValue === 'All Events') {
        // If "All Events" is checked, clear other events and set only "All Events"
        return {
          ...prev,
          events: isChecked ? ['All Events'] : []
        };
      } else {
        // If other event is checked, remove "All Events" and add/remove the specific event
        let newEvents = prev.events.filter(e => e !== 'All Events');
        if (isChecked) {
          newEvents.push(eventValue);
        } else {
          newEvents = newEvents.filter(e => e !== eventValue);
        }
        return {
          ...prev,
          events: newEvents
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', content: '' });

    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || 
        !formData.college || !formData.year || !formData.course || 
        formData.events.length === 0) {
      setMessage({ type: 'error', content: 'Please fill all required fields.' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit to Google Apps Script
      const response = await fetch('https://script.google.com/macros/s/AKfycbxjbbUmkxIUS9L-ASu5aZRZAnidTp-chy-5fLbXM52ewoSmQQx9znk7j3j2Ur-YxX4bzQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          college: formData.college,
          year: formData.year,
          course: formData.course,
          events: formData.events.join(', ')
        })
      });

      // Since we're using no-cors mode, we assume success if no error is thrown
      setMessage({ type: 'success', content: 'Registration successful! You will receive a confirmation email shortly.' });
      setShowConfetti(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        college: '',
        year: '',
        course: '',
        events: []
      });
      
      // Hide confetti after animation completes
      setTimeout(() => setShowConfetti(false), 4000);
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ type: 'error', content: 'There was an error submitting your registration. Please try again.' });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4">
      {/* Confetti Animation */}
      <Confetti active={showConfetti} duration={3500} particleCount={200} />
      
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-spartan font-bold text-4xl md:text-5xl text-white mb-4">
            <span className="text-crimson">LITEROVIA</span> Registration
          </h1>
          <p className="text-gray-300 text-lg mb-2">A Stentorian Odyssey</p>
          <p className="text-amber-400 font-semibold">September 8-9, 2025</p>
        </div>

        {/* Registration Form */}
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
          <div className="p-8">
            {/* Message */}
            {message.content && (
              <div className={`p-4 rounded-lg mb-6 ${
                message.type === 'success' 
                  ? 'bg-green-900/30 border border-green-500 text-green-400'
                  : 'bg-red-900/30 border border-red-500 text-red-400'
              }`}>
                {message.content}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors"
                />
              </div>

              {/* College */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  College/Institution <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  required
                  placeholder="Your college name"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  Year of Study <span className="text-red-500">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors"
                >
                  <option value="">Select your year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Course */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  Course/Branch <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Computer Science, Mechanical, etc."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors"
                />
              </div>

              {/* Events */}
              <div>
                <label className="block text-gray-300 font-medium mb-3">
                  Events to Participate <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'Amazing Race', label: 'Amazing Race (2-person team)' },
                    { value: 'Lit Fest', label: 'Lit Fest' },
                    { value: 'All Events', label: 'All Events' }
                  ].map((event) => (
                    <label
                      key={event.value}
                      className={`flex items-center p-4 bg-gray-800/30 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-800/50 ${
                        formData.events.includes(event.value)
                          ? 'border-crimson bg-crimson/10'
                          : 'border-gray-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.events.includes(event.value)}
                        onChange={(e) => handleEventChange(event.value, e.target.checked)}
                        disabled={event.value !== 'All Events' && formData.events.includes('All Events')}
                        className="mr-3 w-4 h-4 text-crimson bg-gray-800 border-gray-600 rounded focus:ring-crimson focus:ring-2"
                      />
                      <span className="text-gray-300 text-sm">{event.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-crimson to-red-700 hover:from-red-700 hover:to-crimson text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Registration...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Register for Literovia 2025
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>Organized by Stentorian VNRVJIET</p>
          <p className="mt-1">Follow us on Instagram @stentorian_vnrvjiet for updates</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
