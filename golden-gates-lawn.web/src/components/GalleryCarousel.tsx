import { AnimatePresence, motion } from "framer-motion"
import getConfig from "next/config"
import { useState } from "react"
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'

import { ImageType } from "@/types/ImageType"

const variants = {
  enter: (direction: number)  => ({x: 500 * direction}),
  center: { x: 0},
  exit: (direction: number) => ({ x: -500 * direction})
}

type CarouselProps = {
  images: ImageType[]
}

export default function GalleryCarousel(props: CarouselProps) {
  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.STRAPI_PUBLIC_API_URL;

  const { images } = props

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1);

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
    <div className="relative min-h-[250px] w-full text-7xl rounded-lg text-fg bg-gray-100">
      <div className="relative w-full h-full overflow-hidden min-h-[250px] rounded-lg">

        <AnimatePresence mode='popLayout' custom={direction}>
          <motion.img
            key={currentIndex}
            src={apiUrl + images[currentIndex]?.url }
            alt={apiUrl + images[currentIndex]?.alt || ""}
            className="absolute top-0 left-0 w-full h-full object-cover z-10 rounded-lg"
            variants={variants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{duration: 0.5}}
          />
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <>
          <button className="absolute top-1/2 -left-16 transform -translate-y-1/2 focus:outline-none p-2" onClick={() => handlePrev()}>
            <BsChevronCompactLeft />
          </button>
          <button className="absolute top-1/2 -right-16 transform -translate-y-1/2 focus:outline-none p-2" onClick={() => handleNext()}>
            <BsChevronCompactRight />
          </button>
        </>
      )}
    </div>
  )
}
