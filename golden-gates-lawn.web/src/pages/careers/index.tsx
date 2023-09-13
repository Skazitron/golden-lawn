import axios from "axios";

import Layout from "@/components/layout/Layout";
import UnstyledLink from "@/components/links/UnstyledLink";

export type JobType = {
  name: string
  description: string
  date: string
  slug: string
  content: string
}


type CareerPageProps = {
  data: {
    paragraph: string;
  };
  jobs: JobType[]
};


export default function CareerPage(props: CareerPageProps) {
  const {  data, jobs} = props;

  return (
    <Layout>
      <div className="min-h-screen pt-24 leafpattern flex flex-col items-center pb-20 md:px-32 px-10 lg:px-72">
        <h1 className="font-secondary text-6xl font-normal">JOIN OUR TEAM</h1>
        <div
          className="space-y-4 font-secondary font-normal mt-12"
          dangerouslySetInnerHTML={{ __html: data.paragraph || "No content" }}
        />

        <h2 className="font-secondary text-3xl font-normal tracking-wider pt-20">ROLES AVAILABLE</h2>
        <div id="line" className="h-[0.5px] w-full bg-gray-600 mt-2 mb-6"></div>
        {
          jobs && jobs.length > 0 ? jobs.map((job, id) => {
            return (
              <UnstyledLink href={`/careers/${job.slug}`} className="bg-white shadow-xl mb-8 px-6 py-4 hover:scale-105 transition-transform duration-300" key={id}>
                <h3>{job.name}</h3>
                <p className="mt-2 mb-2 text-sm">{job.description}</p>
                <div className="flex flex-row justify-between">
                  <div className=" text-gray-600 text-sm">{job.date}</div>
                </div>
              </UnstyledLink>
            )
          }) : (
            <div>No Roles Available</div>
          )
        }
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const resData = await axios.get(process.env.STRAPI_PUBLIC_API_URL + `/api/career-page?populate=*`);
  const data = resData.data.data;
  const resJobs = await axios.get(process.env.STRAPI_PUBLIC_API_URL + `/api/jobs?populate=*`);
  const jobs = resJobs.data.data

  return {
    props: {
      data,
      jobs
    },
  };
}