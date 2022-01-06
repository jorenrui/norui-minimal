import useSWR from 'swr';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { HiExternalLink } from 'react-icons/hi';

import { fetcher } from '@/lib/api';
import { IINfo } from '@/lib/types/notion';
import { formatRichText } from '@/lib/helper/formatRichText';
import { Page } from '@/components/Page';
import { Loader } from '@/components/ui/Loader';
import { ErrorPage } from '@/components/ErrorPage';

export const getStaticProps: GetStaticProps = async () =>{
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/info`);
  const data = await response.json();

  return {
    props: {
      data,
    },
  }
}

interface IProps {
  data: IINfo;
}

const Home: NextPage<IProps> = ({ data: initialData }) => {
  const { data, error } = useSWR<IINfo>('/api/info', fetcher, { fallbackData: initialData });

  if (error) return <ErrorPage />;
  if (!data) return <Loader className="min-h-full" />;

  return (
    <Page className="flex items-center justify-center">
      <div className="p-4 flex flex-col justify-center gap-4 lg:flex-row">
        <div className="flex-1">
          <Image alt={`${data.name}'s profile picture`} src={data.profile_picture} className="image grayscale" height={400} width={300} objectFit="cover" />
        </div>

        <div className="flex-1 max-w-lg my-auto">
          <h1 className="my-2 text-5xl font-bold font-serif text-gray-900">{formatRichText(data.name)}</h1>
          <p className="my-1 text-sm text-gray-700">{formatRichText(data.headline)}</p>
          <p className="my-4 text-base text-gray-900">{formatRichText(data.description)}</p>

          {Object.keys(data.links || {}).length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {Object.keys(data.links).map((link_description) => {
                const content = data.links[link_description][0];
                if (!content) return;

                return (
                  <li key={data.links[link_description][0].href}>
                    <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center underline underline-offset-2 decoration-2 text-gray-700 cursor-pointer">
                      {link_description}
                      <HiExternalLink className="ml-1 h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </Page>
  );
}

export default Home
