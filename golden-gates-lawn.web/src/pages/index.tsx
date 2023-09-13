import axios from 'axios';
import {AnimatePresence, motion, useAnimation, useInView} from 'framer-motion'
import getConfig from 'next/config';
import * as React from 'react';
import { useEffect } from 'react';
import {BiRightArrowCircle} from 'react-icons/bi'
import {BsArrowRight, BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'
import {VscCircleFilled} from 'react-icons/vsc'
import ReactStars from 'react-stars';

import GalleryCarousel from '@/components/GalleryCarousel';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import NewsCard from '@/components/NewsCard';
import NextImage from '@/components/NextImage';

import { ImageType } from '@/types/ImageType';
import { NewsType } from '@/types/NewsType';
import ServiceType from '@/types/ServiceType';
import { TestimonialsType } from '@/types/TestimonialsType';

export function ServicesSection({ services }: HomePageProps) {




  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.STRAPI_PUBLIC_API_URL;

  const [enter, setEnter] = React.useState(0)
  const [scrollEffect, setScrollEffect] = React.useState(false);

  const [range, setRange] = React.useState(1)
  const [visibleId, setVisibleId] = React.useState(0)
  const serviceLength = (services?.length || 1)

  useEffect(() => {

    if (window.innerWidth < 1024) {
      setRange(1)
    } else {
      setRange(4)
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 350) {
        setScrollEffect(true)
      }
    };
    const handleResize = () => {
      const innerWidth = window.innerWidth
      if (innerWidth >= 1024) {
        setRange(4)
      } else {
        setRange(1)
      }

    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };


  }, []);

  const clickDot = (index: number) => {
    //
    setVisibleId(Math.ceil(index/range) * range)
  }

  const dots = []
  for (let i = 0; i < Math.ceil(serviceLength/range); i++) {
    dots.push(
      <button onClick={() => clickDot(i)}>
        <VscCircleFilled  className={` cursor-pointer duration-500 ${Math.ceil(visibleId/range) == i ? 'text-fg scale-150' : ''}`}/>
      </button>
    )
  }

  // this handles the transition for the divs 


  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleId((visibleId) => (visibleId + range  >= serviceLength ? 0 : (visibleId + range)) )
    }, 5000);
    return () => clearInterval(interval);
  }, [visibleId, range, serviceLength]);

  const leftButtonClick = () => {
    if ((visibleId - range) < 0) {
      setVisibleId((Math.ceil(serviceLength/range) * range) - range)
    } else{
      setVisibleId(visibleId - range)
    }
  }

  const rightButtonClick = () => {
    setVisibleId((visibleId) => (visibleId + range  >= serviceLength ? 0 : (visibleId + range)) )
  }

  return (
    <section className='relative pb-8 pt-24 lg:px-36 leafpattern'>

      <h2 className='text-base flex flex-row justify-center'>
        <UnstyledLink 
          href='/services'
          onMouseEnter={() => setEnter(1)}
          onMouseLeave={() => setEnter(0)}
          className='relative flex flex-row justify-center items-center border-2 p-3 text-fg transition-colors hover:border-fg duration-300 w-[140px]'>
          <div className={`flex flex-row items-center space-x-2 transition-tranform duration-300 ${enter == 1? 'translate-x-[2px]': ''}`}>
            <div>
              Services
            </div>
          </div>
        </UnstyledLink>
      </h2>
      <h3 className='text-3xl flex flex-row justify-center pt-12'>We offer a number of
        <div className='text-fg'>&nbsp;services</div>
      </h3>
      <p className='lg:px-32 px-16 flex flex-row items-center justify-center pt-3 text-center'>Grading & resloping, turf installations, outdoor steps, garden decorations. We offer it all. We are devoted to
        providing our customers with industry standard quality of service.
      </p>
      <div className='relative'>
        <div className={`relative px-16 lg:px-0 w-full mt-20 flex lg:grid lg:grid-cols-4 lg:gap-4 items-center justify-between flex-col
        text-bg transition-transform duration-1000 ${scrollEffect ? ' translate-x-0 opacity-100' : '-translate-x-full opacity-50'}`}>
          <div className='absolute flex inset-y-1/2 flex-center justify-between w-full items-center text-fg text-6xl' id="arrows">
            <div id="leftButton" className='lg:inset-0 lg:-translate-x-20 hover:-translate-y-2 transition-transform duration-300'>
              <button onClick={() => leftButtonClick()}><BsChevronCompactLeft /></button>
            </div>
            <div id="rightButton" className='lg:inset-0 lg:translate-x-20 hover:-translate-y-2  transition-transform duration-300'>
              <button onClick={() => rightButtonClick()}><BsChevronCompactRight /></button>
            </div>
          </div>

          {services?.map((service, id) => {
            const x = (id >= (visibleId) && id < (visibleId + range))
            if (x) return (
            <AnimatePresence>

             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1  }}
               exit={{ opacity: 0 }}
               transition={{duration: 0.2, delay: 0.13}}
               key={id}
               className={`relative lg:h-[380px] max-h-[300px] md:max-h-[380px] max-w-[400px] rounded bg-brown grid grid-rows-6 transition duration-300 hover:-translate-y-2 overflow-hidden ease-in-out ${x ? 'block' : 'hidden'}`}>
                 <div className="aspect-w-3 aspect-h-4 row-span-3 overflow-hidden rounded">
                   {service.displayImage && service.displayImage.formats && service.displayImage.formats.small && (
                     <NextImage
                       src={apiUrl + service.displayImage.formats.thumbnail.url}
                       alt={service.displayImage.alt}
                       width={service.displayImage.formats.small.width}
                       height={service.displayImage.formats.small.height}
                     />
                   )}
                 </div>
                 <div className='row-span-3'>
                   <div className='flex flex-row mt-2 mx-4'>
                     <h4 className='font-normal flex flex-row justify-between w-full'>
                       {service.title.toUpperCase()}
                       <div className='text-2xl'>
                         <BiRightArrowCircle className='mt-[1px]'/>
                       </div>
                     </h4>
                   </div>
                   <p className='mx-4 text-sm font-light mt-1 text-gray-200'>{service.description}</p>
                 </div>
             </motion.div>
             </AnimatePresence>
           )
          })}
        </div>
      </div>
      <div id="servicesBottomSection" className='flex flex-col justify-center items-center pb-10'>
        <div id="pagination" className='mt-10 flex flex-row text-gray-400 text-2xl'>
          {dots}
        </div>

        <UnstyledLink
        className='text-fg font-bold mt-8 text-lg space-x-2 flex translate-x-2 flex-row items-center hover:translate-x-6 duration-500 transition-transform'
        href='/services'>
          <div>
            VIEW ALL 
          </div>
          <BsArrowRight className='text-2xl'/>
        </UnstyledLink>
      </div>
    </section>
  )
}


function HeroSection({ data }: HomePageProps) {
  const { heading, subheading, video } = data || {
    heading: 'Loading...',
    subheading: 'Loading...',
    video: null,
  };
  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.STRAPI_PUBLIC_API_URL;



  return (
    <section className="relative">
      <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
        <div id="fade" className="absolute -z-0 w-full h-full">
          {video && (
            <video
              key={video.id}
              className="absolute w-full h-full transition-opacity duration-1000 object-cover"
              autoPlay
              loop
              muted
            >
              <source src={apiUrl + video.url} type={video.mime} />
            </video>
          )}
        </div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute px-16 lg:px-36 z-20 text-bg flex flex-col w-full">
          <h1 className="flex flex-row items-center justify-center mt-52 mb-3 text-fg text-center">
            {heading}
          </h1>
          <p className="flex flex-row justify-center mb-8 text-lg text-center">
            {subheading}
          </p>
          <div id="buttons" className="flex flex-row justify-center space-x-4">
            <UnstyledLink href='/quote' className="p-3 w-[125px] transition duration-300 hover:-translate-y-1 flex items-center justify-center rounded-sm bg-fg">
              Get a Quote
            </UnstyledLink>
            <UnstyledLink href='/about' className="p-3 w-[125px] transition duration-300 hover:-translate-y-1 flex items-center justify-center rounded-sm bg-bg text-fg">
              About Us
            </UnstyledLink>
          </div>
        </div>
      </div>
    </section>
  );
}


function TestimonialsSection({testimonials}: HomePageProps) {

  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.STRAPI_PUBLIC_API_URL;

  const [testimonialIndex, setTestimonialIndex] = React.useState(0)

  useEffect(() => {
    //
    const interval = setInterval(() => {
      if (typeof testimonials === 'undefined') {
        return
      }
      setTestimonialIndex((testimonialIndex) => ((testimonialIndex + 1) % testimonials.length))
    }, 7000)

    return () => clearInterval(interval);
  }, [testimonialIndex, testimonials])



  return (
    <div className="relative min-h-[300px] lg:px-36 px-16 lg:grid lg:grid-rows-1 lg:grid-cols-2 flex flex-col justify-between text-white gap-16 lg:py-16 lg:items-start items-center">
      <div className='relative z-10'>
        <h2 className='flex text-fg flex-row text-3xl lg:mt-0 mt-16 lg:justify-start justify-center lg:text-left text-center'>Testimonials</h2>
        <div className='mt-3 flex lg:justify-start justify-center text-center lg:text-start'>Our testimonials showcase our commitment to quality and professionalism in landscaping. These client stories attest to why we're a trusted choice for outdoor transformations.</div>
        <div id="banners" className='flex flex-row w-full lg:items-start lg:justify-start mt-8 space-x-4 items-center justify-center'>
          <div className='h-10 w-28 bg-fg rounded-3xl flex justify-center items-center hover:-translate-y-1 transition-transform duration-300'>Learn More</div>
          <div className='h-10 w-28 bg-bg rounded-3xl text-bgDark flex justify-center items-center hover:-translate-y-1 transition-transform duration-300'>Get a Quote</div>
        </div>
      </div>
      <div style={{filter: 'brightness(70%)'}}  className="absolute w-full h-full bg-[url('/images/soil2.jpg')] -z-0"></div>
      <div className="absolute w-full h-full opacity-20 bg-gradient-to-b from-black to-fg z-0"></div>
      <div id="testimonialCard" className='relative h-64 w-[30rem] lg:scale-100 scale-75'>
        {
          
          testimonials?.map((testimonial, id) => (
            <div key={id} className={`absolute h-64 w-[30rem] rounded-tr-[70px] rounded-bl-[70px] bg-bgDark grid grid-cols-2 grid-rows-1 transition-opacity duration-1000 ${id == testimonialIndex ? 'opacity-100' : 'opacity-0'}`}>
              <div id="testimonailImage" className="ml-5 h-56 w-48 rounded-lg -translate-y-2 overflow-hidden">
                <NextImage            
                  src={apiUrl + testimonial.picture.url}
                  alt={testimonial.picture.alt}
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center'
                /> 
              </div>
              <div id="testimonialsText" className='mb-6 mt-3 mr-6'>
                <div id="stars" className='mb-2 text-xs font-light text-gray-200 flex flex-row items-center space-x-3 bg-no-repeat'>
                  <ReactStars 
                    count={5}
                    value={testimonial.rating}
                    size={14}
                    color1="#808080"
                    color2="#ffd700"
                    edit={false}
                    half={true}
                  />
                  <div>{testimonial.rating}/5</div>
                </div>
                <div id="textbody" className='font-light leading-4 text-sm text-gray-200'>{testimonial.description}</div>
                <div id="testimonialAuthor" className='mt-3'>
                  <div className='text-fg'>{testimonial.name}</div>
                  <div className='text-bg text-sm font-light'>{testimonial.profession}</div>
                </div>
              </div>
            </div>
          ))

        }

      </div>

    </div>
  );
}


const squareVariants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0.85 }
};


type GallerySectionProps = {
  images: ImageType[]
  newsArray: NewsType[]
  carouselParagraph: string
}

function GallerySection( props: GallerySectionProps) {

  const { images, newsArray } = props

  const controls = useAnimation()
  const ref = React.useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);


  const news = []
  for (let i = 0; i < Math.min(newsArray.length, 4); i++) {
    news.push(
      <NewsCard createdAt={newsArray[i].createdAt} slug={newsArray[i].slug} image={newsArray[i].displayImage} title={newsArray[i].title} description={newsArray[i].description} />
    )
  }

  return (
    <motion.div 
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={squareVariants}
      className='dirtpattern min-h-[34rem] pb-24 lg:px-24 md:px-24 px-8 pt-24'
    >
      <div>
        <div
          className='flex flex-col lg:grid grid-cols-2 grid-rows-1 gap-16 lg:text-left text-center p-10 bg-white shadow-xl '
        >
          <div className='lg:py-6 flex flex-col justify-center items-center space-y-4'>
            <h2 className='text-bgDark text-4xl '>Shaping <span className='text-fg'>Fort Wanyne's</span> landscape since 1989.</h2>
            <p className=' text-bgDark mt-4'>{props.carouselParagraph}</p>
            <div className='mt-12 flex flex-row items-center justify-center space-x-4'>

              <UnstyledLink href="/about" className='text-white h-10 w-28 bg-fg rounded-3xl flex justify-center items-center hover:-translate-y-1 transition-transform duration-300'>Read More</UnstyledLink>
              <UnstyledLink href="/quote" className='text-white h-10 w-28 bg-fg rounded-3xl flex justify-center items-center hover:-translate-y-1 transition-transform duration-300'>Get a Quote</UnstyledLink>
            </div>
          </div>

          <GalleryCarousel images={images}/>

      </div>

      </div>
      <div className='hidden md:block mt-20'>

        {newsArray.length > 0 && (<h2 className='mb-9 text-bgDark'>Latest News</h2>)}
        <div id="news" className='hidden md:grid lg:grid-rows-1 lg:grid-cols-4 md:grid-cols-2 md:grid-rows-2  gap-4'>
          {news}
        </div>
      </div>
    </motion.div>
  )
}




export default function HomePage({ data, services, testimonials, news }: HomePageProps) {

  return (
    <Layout>
      <HeroSection data={data} />
      <ServicesSection services={services} />
      <TestimonialsSection testimonials={testimonials}/>
      <GallerySection carouselParagraph={data?.carouselParagraph || "Loading..."} newsArray={news || []} images={data?.pictures || []} />
    </Layout>
  );
}

type VideoType = {
  name: string
  alternativeText: string | null
  caption: string | null
  mime: string
  url: string
  id: number
}
 
export type HomePageProps = {
  data?: {
    id: number
    heading: string
    subheading: string
    pictures: ImageType[]
    carouselSubheading: string
    carouselParagraph: string
    carouselPictures: ImageType[]
    video: VideoType
  }
  services?: ServiceType[]
  testimonials?: TestimonialsType[]
  news?: NewsType[]
}
 
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const resData = await axios.get(process.env.STRAPI_PUBLIC_API_URL + '/api/homepage?populate=*')
  const data = await resData.data.data

  const resServices = await axios.get(process.env.STRAPI_PUBLIC_API_URL + '/api/services?populate=*')
  const services = await resServices.data.data


  const newsData= await axios.get(process.env.STRAPI_PUBLIC_API_URL + '/api/news?fields[0]=title&fields[1]=description&fields[2]=slug&fields[3]=createdAt&populate[0]=displayImage')
  const news = await newsData.data.data



  const resTestimonials = await axios.get(process.env.STRAPI_PUBLIC_API_URL + '/api/testimonials?populate=*') 
  const testimonials = await resTestimonials.data.data

  return {
    props: {
      data,
      services,
      testimonials,
      news
    },
  }
}