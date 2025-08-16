import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, IndianRupee, CreditCard } from 'lucide-react';
import { RAZORPAY_CONFIG } from '@/config/razorpay';

const RegisterSection = () => {
  const navigate = useNavigate();

  const openRegistrationForm = () => {
    navigate('/register');
  };

  return (
    <section
      id="register"
      className="relative py-20 px-6"
      style={{
        backgroundColor: 'rgb(10,10,10)',
      }}
    >
      <div className="container mx-auto max-w-4xl relative z-10">
        <ScrollReveal>
          <div className="bg-white backdrop-blur-md border border-gray-200 rounded-3xl p-8 sm:p-12 text-center hover:shadow-2xl transition-all duration-500 shadow-lg">
            <div className="mb-12">
              <div className="flex items-center justify-center mb-6">
                <h2 className="font-spartan font-bold text-3xl md:text-4xl uppercase text-gray-800">
                  Join the <span className="text-crimson">Literary Fest</span>
                </h2>
              </div>
              
              {/* Pricing Display */}
              <div className="mb-8">
                <div className="inline-flex items-center bg-gradient-to-r from-crimson/10 to-crimson-bright/10 border-2 border-crimson/20 rounded-2xl px-8 py-4 mb-6">
                  <IndianRupee className="w-8 h-8 text-crimson mr-2" />
                  <span className="text-4xl font-bold text-crimson">
                    {RAZORPAY_CONFIG.PASS_AMOUNT / 100}
                  </span>
                  <span className="text-lg text-gray-600 ml-3">per pass</span>
                </div>
              </div>
              
              <p className="font-source text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Be part of an unforgettable literary journey. Buy your pass now for two days of creativity, 
                collaboration, and literary excellence.
              </p>
            </div>

            {/* Registration Button */}
            <div className="mb-8">
              <Button
                className="bg-gradient-to-r from-crimson to-red-600 hover:scale-105 transition-all duration-300 w-full sm:w-auto min-w-[280px] text-white border-none font-bold text-xl px-12 py-6 rounded-xl shadow-lg"
                size="xl"
                onClick={openRegistrationForm}
              >
                <CreditCard className="w-6 h-6 mr-3" />
                Pay ₹{RAZORPAY_CONFIG.PASS_AMOUNT / 100} & Register
              </Button>
            </div>

            {/* Simple Info */}
            <div className="text-center">
              <p className="font-source text-sm md:text-base text-gray-600 mb-4">
                September 8-9, 2025 • Limited spots available
              </p>
              <div className="inline-flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span>Secure payment via Razorpay</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span>Multiple payment options</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default RegisterSection;
