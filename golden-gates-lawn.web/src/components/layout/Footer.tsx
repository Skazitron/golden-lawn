import React from 'react';
import {Element} from 'react-scroll'

import MyForm from '@/components/MyForm';



const Footer: React.FC = () => {

  return (
    <footer className="bg-bgDark">
      <Element id="contactSection" name="contactSection">
        <MyForm />
      </Element>
      <div className="container mx-auto text-center text-gray-400 py-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Golden Gates LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;