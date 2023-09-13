

import axios from "axios"

import Layout from "@/components/layout/Layout"
import { monthNames } from "@/components/NewsCard"

import { NewsType } from "@/types/NewsType"

type ArticlePageProps = {
  data: NewsType
}

export default function NewsArticle( props: ArticlePageProps ) {

  const { title, createdAt, author, content } = props.data

  const parsedDate = new Date(createdAt)

  return (
    <Layout>
      <div className="leafpattern min-h-screen lg:px-60 pt-24 pb-12 md:px-28 px-8">
        <div id="metadata" className="bg-brown text-bg w-full flex flex-col justify-center items-center pt-3 rounded-t-lg">
          <h1 className="text-5xl mb-2">{title}</h1>
          <div className='text-sm mb-4 text-gray-200 flex flex-row space-x-3'>
            <div>{`Created: ${monthNames[parsedDate.getMonth()]} ${parsedDate.getDate()},  ${parsedDate.getFullYear()}`}</div>
            <div>Author: {author}</div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 bg-bg p-9 shadow-xl" dangerouslySetInnerHTML={{ __html: (content || "No content")}} />

      </div>
    </Layout>
  )
}


export async function getStaticProps({ params }: { params: {slug: string}}) {

  const resPaths = await axios.get(process.env.STRAPI_PUBLIC_API_URL + `/api/news?filters[slug][$eq]=${params.slug}&populate=*`) 
  const data = resPaths.data.data[0]


  return {
    props: {
      data
    }
  }
}

export async function getStaticPaths() {

  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
  
  const resPaths = await axios.get(process.env.STRAPI_PUBLIC_API_URL + '/api/news?fields[0]=slug') 
  const paths = resPaths.data.data.map((path: { slug: string }) => ({
    params: {slug: path.slug}
  }))

  return {
    paths,
    fallback: true
  }

}