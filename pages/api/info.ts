import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/lib/api/notion';
import { IINfo } from '@/lib/types/notion';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IINfo>
) {
  const response = await client.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || '',
  });

  const data = response.results.reduce((result, record: any) => ({
    ...result,
    [record.properties.ID.rich_text[0].plain_text.trim()]: record.properties.Value.rich_text[0].plain_text.trim(),
  }), {} as IINfo);

  res.status(200).json(data);
}
