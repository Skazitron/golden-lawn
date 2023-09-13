import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import getConfig from "next/config";
import React, { useState } from "react";
import { BiRightArrowCircle } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";

import Layout from "@/components/layout/Layout";
import NextImage from "@/components/NextImage";

import { HomePageProps} from "@/pages";



export default function ServicesPage(props: HomePageProps) {
  return (
    <Layout>
      <ServicesSection services={props.services || []}/>
    </Layout>
  )
}

export function ServicesSection({ services }: HomePageProps) {



  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.STRAPI_PUBLIC_API_URL;

  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };



  return (
    <motion.section
      initial={{scale: 0.85, opacity: 0}}
      animate={ {scale: 1, opacity: 1}}
      transition={{duration: 0.5}}
     className='relative pb-24 md:px-24 px-8 pt-24 lg:px-32 leafpattern'>

      <h2 className='flex flex-col justify-center items-center md:justify-start md:items-start text-5xl font-secondary font-normal mb-8'>Our Services</h2>
      <div className="flex items-center w-full md:w-[300px] ">
             <input
               type="text"
               value={inputValue}
               onChange={(e) => handleInputChange(e)}
               placeholder="Search"
               className="px-4 py-2 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none rounded-l-lg w-full"
             />
             <button className="flex items-center justify-center bg-fg text-white px-4 py-2 rounded-r-lg">
               <RiSearchLine className="text-xl" />
             </button>
          </div>
      <div className='relative'>
        <div className={` space-y-8 lg:space-y-0 mb-16 irelative lg:px-0 w-full mt-12 flex lg:grid lg:grid-cols-4 lg:gap-4 lg:gap-y-8 items-center justify-between flex-col
        text-bg`}>
          {services?.map((service, id) => {
            if (service.title.toLowerCase().includes(inputValue.toLowerCase())) return (
              <AnimatePresence key={id}>
                <motion.div 
                   initial={{opacity: 0}}
                   animate={{opacity: 1}}
                   exit={{opacity: 0}}
                   transition={{duration: 0.25}}
                   className="relative lg:h-[380px] max-h-[300px] md:max-h-[380px] max-w-[400px] rounded bg-brown grid grid-rows-6 transition duration-300 hover:-translate-y-2 overflow-hidden ease-in-out ">

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

    </motion.section>
  )
}


export async function getStaticProps() {

  const resServices = await axios.get(process.env.STRAPI_PUBLIC_API_URL + '/api/services?populate=*')
  const services = await resServices.data.data


  return {
    props: {
      services,
    },
  }
}