import React from 'react';
import ScrollReveal from './ScrollReveal';
import stentLogo from '../assets/stent-logo.jpeg';

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center"
      style={{backgroundColor: 'rgb(10,10,10)'}}
    >
      {/* Responsive Background Logo */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat opacity-10 sm:opacity-15"
        style={{
          backgroundImage: `url(${stentLogo})`,
          backgroundSize: '250px 250px',
        }}
      />
      
      {/* Media queries for different screen sizes */}
      <style>{`
        @media (min-width: 640px) {
          #contact .absolute {
            background-size: 350px 350px;
          }
        }
        @media (min-width: 768px) {
          #contact .absolute {
            background-size: 450px 450px;
          }
        }
        @media (min-width: 1024px) {
          #contact .absolute {
            background-size: 500px 500px;
          }
        }
        @media (min-width: 1280px) {
          #contact .absolute {
            background-size: 600px 600px;
          }
        }
      `}</style>

      {/* CONTENT WRAPPER */}
      <div className="container mx-auto max-w-5xl relative z-10 text-center space-y-8 sm:space-y-12 lg:space-y-16">
        {/* Section Title */}
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-spartan font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4 px-2">
              Connect With <span className="text-crimson">Stentorian</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-2 leading-relaxed">
              Follow us on social media for updates about Literovia and other literary events
            </p>
          </div>
        </ScrollReveal>

        {/* Social Media Links */}
        <ScrollReveal delay={200}>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8 px-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/stentorian_vnrvjiet/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 sm:space-x-4 group hover:bg-white/5 p-4 sm:p-6 rounded-xl transition-all duration-300 w-full max-w-sm lg:max-w-xs xl:max-w-sm border border-gray-700/50 hover:border-pink-500/30"
            >
              <div className="bg-pink-500/20 p-3 sm:p-4 rounded-xl group-hover:bg-pink-500/30 transition-colors duration-300 flex-shrink-0">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="text-left min-w-0 flex-1">
                <h4 className="font-spartan font-semibold text-white text-base sm:text-lg lg:text-xl truncate">Instagram</h4>
                <p className="text-gray-300 text-xs sm:text-sm lg:text-base truncate">@stentorian_vnrvjiet</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/stentorian-vnrvjiet/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 sm:space-x-4 group hover:bg-white/5 p-4 sm:p-6 rounded-xl transition-all duration-300 w-full max-w-sm lg:max-w-xs xl:max-w-sm border border-gray-700/50 hover:border-blue-500/30"
            >
              <div className="bg-blue-600/20 p-3 sm:p-4 rounded-xl group-hover:bg-blue-600/30 transition-colors duration-300 flex-shrink-0">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="text-left min-w-0 flex-1">
                <h4 className="font-spartan font-semibold text-white text-base sm:text-lg lg:text-xl truncate">LinkedIn</h4>
                <p className="text-gray-300 text-xs sm:text-sm lg:text-base truncate">Stentorian VNRVJIET</p>
              </div>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
