import { Client } from '@notionhq/client';

export const client = new Client({ auth: process.env.NOTION_API });
