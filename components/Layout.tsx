import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import Head from 'next/head'
import HeadBar from './HeadBar'
import Footer from './Footer'
import { LayoutMode } from '../lib/types'

export default function Layout({ children, layout }: {
  children: React.ReactElement, layout: LayoutMode
}) {

  return (
    <>
      <Head>
        <title>{publicRuntimeConfig.title} | {publicRuntimeConfig.description}</title>
        <meta name="generator" content="NextJS" />
        <meta property="og:title" content={publicRuntimeConfig.title} />
        <meta property="og:locale" content="en_US" />
        <meta name="description" content={publicRuntimeConfig.description} />
        <meta property="og:description" content={publicRuntimeConfig.description} />
        <link rel="canonical" href={publicRuntimeConfig.url} />
        <meta property="og:url" content={publicRuntimeConfig.url}  />
        <meta property="og:site_name" content={publicRuntimeConfig.title} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:title" content={publicRuntimeConfig.title} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" type="application/rss+xml" title={`RSS Feed for `+publicRuntimeConfig.url} href="/feed.xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"WebSite","description":"`+publicRuntimeConfig.description+`","headline":"`+publicRuntimeConfig.title+`","name":"`+publicRuntimeConfig.title+`","url":"`+publicRuntimeConfig.url+`"}` }} />
      </Head>
      {!layout.wait && <HeadBar {...layout} />}
      {!layout.wait && <main className={`container mx-auto flex-1 ` + (layout.mode ? 'text-light' : 'text-dark')}>
        <div className='darkmode'>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" checked={layout.mode} id="flexSwitchCheckDefault" onChange={layout.switch} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{(layout.mode ? ' Dark mode' : ' Light mode')}</label>
          </div>
        </div>
        {children}
      </main>}
      {!layout.wait && <Footer {...layout} />}
    </>
  );
}
