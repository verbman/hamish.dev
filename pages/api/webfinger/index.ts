import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const webfinger = `{
  "subject":"acct:verbman@mastodon.nz",
  "aliases": [
    "https://mastodon.nz/@verbman",
    "https://mastodon.nz/users/verbman"
  ],
  "links": [
    {
      "rel":"http://webfinger.net/rel/profile-page",
      "type":"text/html",
      "href":"https://mastodon.nz/@verbman"
    },
    {
      "rel":"self",
      "type":"application/activity+json",
      "href":"https://mastodon.nz/users/verbman"
    },
    {
      "rel":"http://ostatus.org/schema/1.0/subscribe",
      "template":"https://mastodon.nz/authorize_interaction?uri={uri}"
    }
  ]
}`;

    // set response content header to xml
    res.setHeader('Content-Type', 'application/jrd+json');

    return res.status(200).send(webfinger);
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw e;
    }

    return res.status(500).json({ error: e.message || '' });
  }
});

export default handler;
