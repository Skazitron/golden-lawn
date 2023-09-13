import axios from 'axios';
import { AnimatePresence, motion, useAnimation, useInView } from 'framer-motion'
import React, { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai'
import { RiSearchLine } from 'react-icons/ri';

import Layout from "@/components/layout/Layout";
import NewsCard from '@/components/NewsCard';

import { NewsType } from '@/types/NewsType';

type NewsPageProps = {
  news: NewsType[]
}


export default function NewsPage(props: NewsPageProps ) {
  const { news } = props

  const controls = useAnimation()
  const ref = React.useRef(null)
  const inView = useInView(ref)

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

  return (
    <Layout>

      <motion.div 
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={squareVariants}
        className='dirtpattern min-h-[34rem] pb-24 lg:px-24 md:px-24 px-8 pt-24'
      >

        <div className='space-y-8 mb-9 flex-col justify-center items-center md:items-start md:justify-start'>
          <h2 className='flex flex-col justify-center items-center md:justify-start md:items-start text-5xl font-normal font-secondary'>Blog & News</h2>
          <div className="flex items-center w-full md:w-[300px]">
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
          <button onClick={() => setDescending(!descending)} className='flex flex-row space-x-2 items-center justify-center bg-fg p-2 px-3 text-white rounded-3xl'>
            <div>Date</div> <AiFillCaretDown className={`${descending ? '' : 'rotate-180'}`} />
          </button>
          <div id="news" className='flex flex-col space-y-6 items-center md:space-y-0 md:grid lg:grid-rows-1 lg:grid-cols-4 md:grid-cols-2 md:grid-rows-2  md:gap-5'>
            <AnimatePresence>
              {news.sort((a,b) => comparator(a,b)).filter((newsItem) => newsItem.title.toLowerCase().includes(inputValue.toLowerCase())).map((filteredNewsItem, index) => (
                <div key={index}>
                  <NewsCard
                    createdAt={filteredNewsItem.createdAt}
                    slug={filteredNewsItem.slug}
                    image={filteredNewsItem.displayImage}
                    title={filteredNewsItem.title}
                    description={filteredNewsItem.description}
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </Layout>

  )
}


const squareVariants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0.85 }
};


export async function getStaticProps() {

  const newsData= await axios.get(process.env.STRAPI_PUBLIC_API_URL + '/api/news?fields[0]=title&fields[1]=description&fields[2]=slug&fields[3]=createdAt&fields[4]=author&populate[0]=displayImage')
  const news = await newsData.data.data

  return {
    props: {
      news
    },
  }
}