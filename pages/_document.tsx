import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import Document, { DocumentContext, DocumentInitialProps } from 'next/document'
import { Html, Head, Main, NextScript } from 'next/document'
import { getCookie } from 'cookies-next';

type SiteDocumentInitialProps = DocumentInitialProps & {
  mode?: string;
};

class MyDocument extends Document<SiteDocumentInitialProps> {

  static async getInitialProps(ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    let result = initialProps as SiteDocumentInitialProps;
    result.mode = 'dark';

    const cookie = getCookie('reader', ctx)
    if (cookie) {
      const reader = JSON.parse(cookie as string);
      if (reader.mode) {
        result.mode = reader.mode;
      }
    }
    return result
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="generator" content="NextJS" />
          <meta property="og:title" content={publicRuntimeConfig.title} />
          <meta property="og:locale" content="en_US" />
          <meta name="description" content={publicRuntimeConfig.description} />
          <meta property="og:description" content={publicRuntimeConfig.description} />
          <meta property="og:url" content={publicRuntimeConfig.url}  />
          <meta property="og:site_name" content={publicRuntimeConfig.title} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta property="twitter:title" content={publicRuntimeConfig.title} />
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href={publicRuntimeConfig.url} />
          <link rel="alternate" type="application/rss+xml" title={`RSS Feed for `+publicRuntimeConfig.url} href="/feed.xml" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"WebSite","description":"`+publicRuntimeConfig.description+`","headline":"`+publicRuntimeConfig.title+`","name":"`+publicRuntimeConfig.title+`","url":"`+publicRuntimeConfig.url+`"}` }} />
        </Head>
        <body className={this.props.mode}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
