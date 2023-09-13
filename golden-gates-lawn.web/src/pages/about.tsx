import axios from "axios";
import getConfig from "next/config";

import Layout from "@/components/layout/Layout";

import { ImageType } from "@/types/ImageType";

type TeamType = {
  name: string;
  profession: string;
  picture: ImageType;
};

type AboutPageProps = {
  data: {
    main: string;
    mission: string;
  };
  team: TeamType[];
};

export default function AboutPage(props: AboutPageProps) {
  const { team, data } = props;

  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.STRAPI_PUBLIC_API_URL;

  return (
    <Layout>
      <div className="min-h-screen pt-24 leafpattern flex flex-col items-center pb-20 md:px-32 px-10 lg:px-72">
        <h1 className="font-secondary text-6xl font-normal">WHO WE ARE</h1>
        <div
          className="space-y-4 font-secondary font-normal mt-12 bg-transparent"
          dangerouslySetInnerHTML={{ __html: data.main || "No content" }}
        />
        <h2 className="font-secondary text-3xl font-normal mt-20 ">OUR TEAM</h2>
        <div id="line" className="h-[0.5px] w-full bg-gray-600 mt-2 mb-6"></div>
        <section className="flex flex-row flex-wrap justify-center space-x-12">
          {team.map((person, id) => {
            return (
              <div key={id} className="mt-6">
                <div className="w-[200px] h-[200px] rounded-full overflow-hidden border">
                  <img
                    src={apiUrl + person.picture.formats.thumbnail.url}
                    alt={apiUrl + person.picture.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-row justify-center mt-3">{person.name}</div>
                <div className="font-secondary w-full flex flex-row justify-center text-gray-800 text-sm">{person.profession}</div>
              </div>
            );
          })}
        </section>



        <h2 className="font-secondary text-3xl font-normal tracking-wider pt-20">OUR MISSION</h2>
        <div id="line" className="h-[0.5px] w-full bg-gray-600 mt-2"></div>
        <div
          className="px-10 space-y-4 font-secondary font-normal mt-12"
          dangerouslySetInnerHTML={{ __html: data.mission || "No content" }}
        />
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const resPaths = await axios.get(process.env.STRAPI_PUBLIC_API_URL + `/api/about?populate=*`);
  const data = resPaths.data.data;

  const resPeople = await axios.get(process.env.STRAPI_PUBLIC_API_URL + `/api/people?populate=*`);
  const team = resPeople.data.data;

  return {
    props: {
      data,
      team,
    },
  };
}
