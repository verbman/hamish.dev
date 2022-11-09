import { NextApiResponse } from 'next';
import nc from 'next-connect';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig()
import { BlogPost } from '../../../lib/types';
import feed from '../../../public/data/feed.json';

const handler = nc();

handler.get(async (req, res: NextApiResponse) => {
  try {
    const postItems = (feed.posts as BlogPost[]).map((page: BlogPost) => {
      const url = `${publicRuntimeConfig.url}/${page.filePath.replace('.mdx', '').replace('.md', '')}`;

      return `<item>
        <title>${page.data.title}</title>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
        <pubDate>${new Date(page.data.date).toUTCString()}</pubDate>
        ${page.data.categories.map((cat: string) => {
        return `<category>${cat}</category>`
      }).join('')
        }
        <description>${page.content}</description>
      </item>`;
    })
      .join('');

    // Add urlSet to entire sitemap string
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
      <title>${publicRuntimeConfig.title}</title>
      <description>${publicRuntimeConfig.description}</description>
      <link>${publicRuntimeConfig.url}</link>
      <atom:link href="${publicRuntimeConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${postItems}
      </channel>
      </rss>`;

    // set response content header to xml
    res.setHeader('Content-Type', 'text/xml');

    return res.status(200).send(sitemap);
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw e;
    }

    //return res.status(500).json({ error: e.message || '' });
  }
});

export default handler;
