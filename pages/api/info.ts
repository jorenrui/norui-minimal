import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/lib/api/notion';
import { IINfo } from '@/lib/types/notion';

interface IOption {
  id: string;
  name: string;
  color: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IINfo | unknown>
) {
  try {
    const response = await client.databases.query({
      database_id: process.env.NOTION_DATABASE_ID || '',
    });

    const data = response.results.reduce((result, record: any) => {
      const field: string = record.properties.ID.rich_text[0]?.plain_text.trim() || '';
      const name: string = record.properties.Name.title[0]?.plain_text.trim() || '';
      const types: string[] = record.properties.Type.multi_select?.map((item: IOption) => item.name) || ['rich text'];

      if (field === 'links') {
        return ({
          ...result,
          [field]: {
            ...(result[field] || {}),
            [name]: record.properties.Value.rich_text,
          },
        });
      }

      return ({
        ...result,
        [field]: types.includes('file')
          ? record.properties.File.files[0]?.file.url
          : record.properties.Value.rich_text,
      });
    }, {} as IINfo);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
}
