import React from 'react';
import Navigation from '@/components/Navigation';
import NewRegistrationForm from '@/components/NewRegistrationForm';

const Register = () => {
  return (
    <div className="pb-12 relative w-full" style={{ backgroundColor: 'rgb(10,10,10)' }}>
      <Navigation />
      <div className="pt-20">
        <NewRegistrationForm />
      </div>
    </div>
  );
};

export default Register;
