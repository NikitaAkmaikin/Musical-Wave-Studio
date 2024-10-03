import React from 'react';
import ContactForm from '../../components/contactForm/ContactForm';

export const Contact: React.FC = () => {
  return (
    <div className='container'>
      <h1>Связаться с нами</h1>
      <ContactForm />
    </div>
  );
};
