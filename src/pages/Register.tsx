import React from 'react';
import Navigation from '@/components/Navigation';
import EnhancedRegistrationForm from '@/components/EnhancedRegistrationForm';

const Register = () => {
  return (
    <div className="pb-12 relative w-full" style={{ backgroundColor: 'rgb(10,10,10)' }}>
      <Navigation />
      <div className="pt-20">
        <EnhancedRegistrationForm />
      </div>
    </div>
  );
};

export default Register;
