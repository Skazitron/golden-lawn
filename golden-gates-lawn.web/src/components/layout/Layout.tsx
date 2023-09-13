import * as React from 'react';

import Grass from '@/components/Grass';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';





export default function Layout({ children }: { children: React.ReactNode }) {


  return (
      <div className='relative font-primary bg-bg'>

        {/* <ContactForm className={modalState.projectModal ? '' : 'hidden'}/> */}
        <Header/>
        <div className='relative lg:mt-0 -mt-20 min-h-screen pb-10'>
          {children}
        </div>

        <Grass  className='absolute -translate-y-36'/>
        <Footer />
      </div>
  )
}
