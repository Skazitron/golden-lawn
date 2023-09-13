import {motion} from 'framer-motion'
import { useRouter } from 'next/router';
import * as React from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare, AiOutlineMenu } from 'react-icons/ai'
import {BsArrowRight} from 'react-icons/bs'
import {FiMail,FiPhoneCall} from 'react-icons/fi'
import {SlLocationPin} from 'react-icons/sl'
import { scroller } from 'react-scroll';

import UnstyledLink from '@/components/links/UnstyledLink';

const links = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'WHO WE ARE' },
  { href: '/services', label: 'OUR SERVICES' },
  { href: '/gallery', label: 'GALLERY' },
  { href: '/news', label: 'NEWS' },
  { href: '/careers', label: 'CAREERS' },
];


export function scrollToContact(): void {
  scroller.scrollTo('contactSection', {
    duration: 800,
    smooth: true,
  })
}



function TopBox() {

  const [enter, setEnter] = React.useState(0)



  return (
    <div className='px-24 flex items-center justify-between pb-4 w-full'>
      <div className='flex flex-row items-center space-x-20'>
        <div className='flex flex-row items-center space-x-2'>
          <FiPhoneCall />
          <div>
            (260) 348-2877
          </div>
        </div>
        <div className='flex flex-row items-center space-x-2'>
          <FiMail />
          <div>
            business@email.com
          </div>
        </div>
        <div className='flex flex-row items-center space-x-2'>
          <SlLocationPin />
          <div>
            Fort Wayne, IN
          </div>
        </div>
      </div>
      <div className='flex flex-row items-center space-x-3'>
        <UnstyledLink 
          href='/quote'
          onMouseEnter={() => setEnter(1)}
          onMouseLeave={() => setEnter(0)}
          className='relative flex flex-row justify-center items-center border-2 p-3 text-fg transition-colors hover:border-fg duration-300 w-[180px]'>
          <div className={`flex flex-row items-center space-x-2 transition-tranform duration-300 ${enter == 1? 'translate-x-2': ''}`}>
            <div>
              Get a Free Quote
            </div>
            <BsArrowRight />
          </div>
        </UnstyledLink>
        <UnstyledLink 
          href='/quote'
          onMouseEnter={() => setEnter(2)}
          onMouseLeave={() => setEnter(0)}
          className='relative flex flex-row justify-center items-center border-2 p-3 text-fg transition-colors hover:border-fg duration-300 w-[180px]'>
          <div className={`flex flex-row items-center space-x-2 transition-tranform duration-300 ${enter == 2 ? 'translate-x-2': ''}`}>
            <div>
              Pay Online
            </div>
            <BsArrowRight />
          </div>
        </UnstyledLink>
      </div>
    </div>
  )
}

function MobileHeader() {

  const [showNav, setShowNav] = React.useState(false)

  const router = useRouter()


  return (
    <header className='sticky top-0 z-40  lg:hidden bg-bg'>
      <motion.div
        className='absolute h-screen mt-[11.5rem] overflow-hidden bg-bg w-full'
        animate={{x: showNav ? 0 :-3000}}
        transition={{ type: "tween", delay: 0, duration: 0.8}}
      >
        <nav className='text-4xl '>
          <ul className='flex flex-col justify-start items-center space-y-3 mt-8'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className={`transition-colors ${router.pathname === href ? 'text-fg' : ''}`}>
                  {label}
                </UnstyledLink>
              </li>
            ))}
            <li>
              <button className='hover:text-fg transition-colors duration-300' onClick={() => {scrollToContact(); setShowNav(false)}}>
                CONTACT US
              </button>
            </li>
          </ul>
         
          <div className='flex flex-row justify-center items-center text-5xl space-x-2 mt-16'>
            <AiFillFacebook className='hover:text-fg duration-300 hover:-translate-y-[1.5px]'/>
            <AiFillTwitterSquare className='hover:text-fg duration-300 hover:-translate-y-[1.5px]' />
            <AiFillInstagram className='hover:text-fg duration-300 hover:-translate-y-[1.5px]' />
          </div> 
        </nav>

      </motion.div>
      <div className='flex flex-row items-center justify-between px-8 min-h-[90px]'>
        <UnstyledLink href="tel:260-348-2877" className='flex flex-row items-center space-x-2'>
          <FiPhoneCall />
          <div>
            (260) 348-2877
          </div>
        </UnstyledLink>
        <div className='flex flex-row items-center space-x-2'>
          <FiMail />
          <div>
            business@email.com
          </div>
        </div>
        <div className='flex flex-row items-center space-x-2'>
          <SlLocationPin />
          <div>
            Fort Wayne, IN
          </div>
        </div>
      </div>
      <div className='flex flex-row items-center space-x-3'></div>
      <div className='px-8 pb-6 grid grid-rows-1 grid-cols-3 pt-6 bg-bgDark text-bg font-bold'>
        <div>
        <motion.button 
          onClick={() => setShowNav(!showNav)}
          animate={{
            rotate: showNav ? -90 : 0,
          }}
          className='text-4xl flex flex-row items-center justify-start'><AiOutlineMenu /></motion.button>

        </div>
        <div className='text-5xl flex flex-row justify-center items-center'>GGLC</div>

      </div>
    </header> 
  )
}

function DesktopHeader() {

  const router = useRouter()

  return (
    <header className='hidden sticky top-0 z-40 pt-3 lg:block bg-bg'>
    <TopBox />
    <div className='px-36 pb-6 flex items-center justify-between pt-6 bg-bgDark text-bg font-bold'>
      <div className='text-5xl'>GGLC</div>
      <nav>
        <ul className='flex justify-between space-x-8'>
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <UnstyledLink href={href} className={`transition-colors hover:text-green-600 ${router.pathname == href ? 'underline underline-offset-8 decoration-2' : ''}`}>
                {label}
              </UnstyledLink>
            </li>
          ))}
           <li>
              <button className='hover:text-fg transition-colors duration-300' onClick={() => scrollToContact()}>
                CONTACT US
              </button>
            </li>
        </ul>
      </nav>
      <div className='flex flex-row items-center justify-between text-2xl space-x-3'>
        <AiFillFacebook className='hover:text-fg duration-300 hover:-translate-y-[1.5px]'/>
        <AiFillTwitterSquare className='hover:text-fg duration-300 hover:-translate-y-[1.5px]' />
        <AiFillInstagram className='hover:text-fg duration-300 hover:-translate-y-[1.5px]' />
      </div>
    </div>
  </header>
  )
}


export default function Header() {
  const [isVisible, setIsVisible] = React.useState(true);
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <motion.div
      className="sticky top-0 z-40"
      initial={{ translateY: 0 }}
      animate={{ translateY: isVisible ? 0 : -90 }}
      transition={{ duration: 0.4 }}
    >
      <MobileHeader />
      <DesktopHeader />
    </motion.div>
  );
}
