import { motion } from 'framer-motion'
import getConfig from "next/config"

import UnstyledLink from "@/components/links/UnstyledLink"
import NextImage from "@/components/NextImage"

import { ImageType } from "@/types/ImageType"

type NewsCardProps = {
  image: ImageType
  title: string
  description: string
  slug: string
  createdAt: string
}

export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function NewsCard(props: NewsCardProps) {
  const { image, title, description, slug, createdAt } = props
  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.STRAPI_PUBLIC_API_URL;
  const parsedDate = new Date(createdAt)

  return (
      <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.25}}
        className="h-[420px] max-w-[350px] bg-white shadow-xl grid grid-rows-2 pb-3 border">
        <div className="overflow-hidden bg-gray-400 bg-opacity-50">
          <NextImage
             src={apiUrl + image.url}
             alt={image.alt}
             width={image.width}
             height={image.height}
             className='object-cover h-full'
          />
        </div>
        <div className="px-3 mt-3 space-y-4 flex-col flex justify-between">
          <div className='overflow-hidden text-ellipsis'>
            <h3 className='px-3'>{title}</h3>
            <p className="text-gray-500  px-3">{description}</p>
          </div>
          <div className='mx-3 flex flex-row justify-between items-center'>
            <UnstyledLink className=" text-sm text-gray-600 hover:text-fg transition-colors duration-300" href={`/news/${slug}`}>Read More</UnstyledLink>
            <div className='text-sm text-gray-600'>{`${monthNames[parsedDate.getMonth()]} ${parsedDate.getDate()},  ${parsedDate.getFullYear()}`}</div>
          </div>
        </div>
      </motion.div>
  )

}