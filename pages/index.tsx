import useSWR from 'swr';
import type { NextPage } from 'next';

import { fetcher } from '@/lib/api';
import { IINfo } from '@/lib/types/notion';
import { Page } from '@/components/Page';
import { Loader } from '@/components/ui/Loader';
import { ErrorPage } from '@/components/ErrorPage';

const Home: NextPage = () => {
  const { data, error } = useSWR<IINfo>('/api/info', fetcher);

  if (error) return <ErrorPage />;
  if (!data) return <Loader className="min-h-full" />;

  return (
    <Page className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-5xl font-bold font-serif text-gray-900">{data.name}</h1>
      <p className="my-1 text-base text-gray-700">{data.description}</p>
    </Page>
  );
}

export default Home
