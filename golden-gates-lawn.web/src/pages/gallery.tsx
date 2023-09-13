import axios from 'axios';
import { AnimatePresence, motion, useAnimation, useInView } from 'framer-motion'
import getConfig from "next/config"
import React, { SetStateAction, useEffect, useState } from 'react';
import {AiOutlineClose} from 'react-icons/ai'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'

import Layout from "@/components/layout/Layout";
import NextImage from '@/components/NextImage';

import { GalleryType } from '@/types/GalleryType';
import { NewsType } from '@/types/NewsType';

const variants = {
  enter: (direction: number)  => ({x: 400 * direction}),
  center: { x: 0},
  exit: (direction: number) => ({ x: -400 * direction})
}


const largeVariants = {
  enter: (direction: number)  => ({x: 1600 * direction}),
  center: { x: 0},
  exit: (direction: number) => ({ x: -1600 * direction})
}


type GalleryComponentProps = {
  gallery: GalleryType
  setModal: React.Dispatch<SetStateAction<boolean>>
}


function LargeGalleryComponent(props: GalleryComponentProps) {
  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.STRAPI_PUBLIC_API_URL;


  // modal for image carousel

  const { images, title, date, tags} = props.gallery

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? images.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex >= images.length - 1 ? 0 : prevIndex + 1))
  }


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDirection(1);
  //     setCurrentIndex((prevIndex) => (prevIndex >= images.length - 1 ? 0 : prevIndex + 1))
  //   }, 5000)

  //   return () => clearInterval(interval)

  // }, [currentIndex, images.length])

  return (
    <div className="md:translate-y-0 translate-y-[100px] relative h-screen w-screen text-7xl text-fg bg-opacity-0 bg-gray-300 rounded-lg">
      <div onClick={()=>props.setModal(true)} className="relative w-full h-[240px] md:h-[75%] overflow-hidden  rounded-lg hover:cursor-pointer flex flex-row justify-center backdrop-filter-none">

        <AnimatePresence mode='popLayout' custom={direction}>
          <motion.img
            key={currentIndex}
            src={apiUrl + images[currentIndex]?.url }
            alt={apiUrl + images[currentIndex]?.alt || ""}
            className="relative top-0 left-0 h-full object-cover z-10 rounded-lg"
            variants={largeVariants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{duration: 0.2}}
          />
        </AnimatePresence>
        <div>
          
        </div>
      </div>
      {images.length > 1 && (
        <div className='text-gray-200 '>
          <button className="absolute top-1/2  z-30 transform -translate-y-1/2 focus:outline-none p-2" onClick={() => handlePrev()}>
            <BsChevronCompactLeft className='' />
          </button>
          <button className="absolute top-1/2 right-0 z-30  transform -translate-y-1/2 focus:outline-none p-2" onClick={() => handleNext()}>
            <BsChevronCompactRight  className=''/>
          </button>
        </div>
      )}
      <div className='flex flex-row justify-center mt-3 md:translate-y-0 translate-y-[85px] flex-wrap space-x-2'>
        {images.map((image, id) => {
          return (
            <div key={id} className="overflow-hidden bg-gray-400 bg-opacity-0">
            <NextImage
               onClick={() => setCurrentIndex(id)}
               src={apiUrl + image.url}
               alt={image.alt}
               width={image.width}
               height={image.height}
               className={`object-cover w-24 h-full hover:cursor-pointer ${currentIndex == id && 'border border-yellow-200'}`}
            />
          </div>
          )
        })}

      </div>
    </div>
  )
}


function GalleryComponent(props: GalleryComponentProps) {
  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.STRAPI_PUBLIC_API_URL;


  // modal for image carousel

  const { images, title, date, tags} = props.gallery

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? images.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex >= images.length - 1 ? 0 : prevIndex + 1))
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDirection(1);
  //     setCurrentIndex((prevIndex) => (prevIndex >= images.length - 1 ? 0 : prevIndex + 1))
  //   }, 5000)

  //   return () => clearInterval(interval)

  // }, [currentIndex, images.length])

  return (
    <div className="relative h-[300px] w-full md:max-w-[400px] text-7xl text-fg bg-gray-300 rounded-lg">
      <div onClick={()=>props.setModal(true)} className="relative w-full h-full overflow-hidden  rounded-lg hover:cursor-pointer flex flex-row justify-center">

        <AnimatePresence mode='popLayout' custom={direction}>
          <motion.img
            key={currentIndex}
            src={apiUrl + images[currentIndex]?.url }
            alt={apiUrl + images[currentIndex]?.alt || ""}
            className="relative top-0 left-0 h-full object-cover z-10 rounded-lg"
            variants={variants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{duration: 0.2}}
          />
        </AnimatePresence>
        <div>
          
        </div>
      </div>
      {images.length > 1 && (
        <div className='text-gray-200 border'>
          <button className="absolute top-1/2 -left-6  z-30 transform -translate-y-1/2 focus:outline-none p-2" onClick={() => handlePrev()}>
            <BsChevronCompactLeft className='' />
          </button>
          <button className="absolute top-1/2 -right-6 z-30  transform -translate-y-1/2 focus:outline-none p-2" onClick={() => handleNext()}>
            <BsChevronCompactRight  className=''/>
          </button>
        </div>
      )}
    </div>
  )
}


type GalleryCarouselModalProps = {
  currentGallery: GalleryType
  setModal: React.Dispatch<SetStateAction<boolean>>

}

function GalleryCarouselModal({setModal, currentGallery}: GalleryCarouselModalProps) {
  return (
    <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.20}}
      className='fixed top-0 left-0 z-[100] h-screen w-screen bg-black text-white bg-opacity-80'>
      <div className='w-full h-full relative'>
        <button className='text-4xl p-3' onClick={() => setModal(false)}>
          <AiOutlineClose  />
        </button>
        <LargeGalleryComponent setModal={setModal} gallery={currentGallery}/>
      </div>
    </motion.div>

  )
}


export default function GalleryPage(props: GalleryPageProps ) {
  const { tags, galleries } = props

  const controls = useAnimation()
  const ref = React.useRef(null)
  const inView = useInView(ref)

  // helper set and function for filtering the tags

  const [tagsSet, setTagsState] = useState((new Set()))

  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modal])


  const tagsChanger = (x: string) => {
    setTagsState((prevSet) => {
      const r = new Set(prevSet)
      if (r.has(x)) {
        r.delete(x)
      } else {
        r.add(x)
        return r
      }

      return r
    })
  }

  const tagsClear = () => {
    setTagsState(new Set())
  }


  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const [inputValue, setInputValue] = useState('');
  const [descending, setDescending] = useState(true)

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  const comparator = (a: NewsType, b: NewsType): number => {
    const aD = new Date(a.createdAt)
    const bD = new Date(b.createdAt)
    return descending ? (aD.getTime() - bD.getTime()): (bD.getTime() - aD.getTime())
  }

  const checkTags = (x: GalleryType) => {
    if (tagsSet.size <= 0) {
      return true
    }

    for (let i = 0; i < x.tags.length; i++) {
      if (tagsSet.has(x.tags[i].name)) {
        return true
      }
    }


    return false
  }

  const [currentModalGallery, setCurrentModalGallery] = useState(0)


  // event listener for escape button

  useEffect(() => {
    const handleEscapeKey = (event: { key: string; }) => {
      if (event.key === 'Escape') {
        // Add your code here to handle the escape key press
        // For example, you can close a modal, hide a menu, or perform any desired action
        setModal(false)
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);


  return (
    <Layout>
      {modal && (
        <GalleryCarouselModal currentGallery={galleries[currentModalGallery]} setModal={setModal} />
      )}
      <motion.div 
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={squareVariants}
        className='autumnpattern min-h-[34rem] pb-24 lg:px-24 md:px-24 px-8 pt-24'
      >

        <div className='space-y-8 mb-9 flex-col justify-center items-center md:items-start md:justify-start'>
          <h1 className='flex flex-col justify-center items-center md:justify-start md:items-start text-5xl font-secondary font-normal'>Gallery</h1>

          <div className='flex flex-wrap flex-row justify-left mb-4'>
           <button 
              onClick={() => tagsClear()} className={` mr-2 min-w-[70px] mb-2 h-10 flex flex-row space-x-2 items-center justify-center p-2 px-4 rounded-3xl border transition-colors duration-300 ${tagsSet.size <= 0 ? 'bg-fg text-white' : 'bg-bg text-fg'}`}>
                All
            </button>
            {tags.map((tag, id) => (
              <button 
                key={id}
                onClick={() => tagsChanger(tag)} className={` mr-2 mb-2 flex flex-row space-x-2 items-center justify-center p-2 px-4 h-10 rounded-3xl min-w-[70px] border transition-colors duration-300 ${tagsSet.has(tag) ? 'bg-fg text-white' : 'bg-bg text-fg'}`}>
                  {tag}
              </button>
            ))}
            </div>

          <div id="galleryItems" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-10'>

            <AnimatePresence >
            {galleries.filter((x) => checkTags(x)).map((x, id) => {
              return (
                  <motion.div key={id}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onClick={() => setCurrentModalGallery(id)}
                    className='rounded-lg max-w-[400px] '
                    >
                    <GalleryComponent setModal={setModal} gallery={x} />
                    <div className='flex flex-row px-3 py-1 pt-2 justify-between items-center font-secondary'>
                      <h4 className='text-gray-700 font-semibold font-secondary'>{x.title}</h4>
                      <div className='text-sm text-gray-500'>{x.date}</div>
                    </div>
                  </motion.div>
              )
              })
            }
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </Layout>

  )
}


type GalleryPageProps = {
  galleries: GalleryType[]
  tags: string[]
}


const squareVariants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0.85 }
};


export type TagsType = {
  name: string
}


export async function getStaticProps() {

  const galleryData= await axios.get(process.env.STRAPI_PUBLIC_API_URL + '/api/galleries?populate=*')
  const galleries = await galleryData.data.data

  const tagsData= await axios.get(process.env.STRAPI_PUBLIC_API_URL + '/api/tags?populate=*')
  const tags: string[] = await (tagsData.data.data.map((tag: TagsType) => tag.name))

  // get tags from the internet


  return {
    props: {
      galleries,
      tags
    },
  }
}