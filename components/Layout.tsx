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
        <title>{publicRuntimeConfig.title + ' : ' + publicRuntimeConfig.description}</title>
      </Head>
      <HeadBar {...layout} />
      <main className={`container mx-auto flex-1 ` + (layout.mode ? 'text-light' : 'text-dark')}>
        <div className='darkmode'>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" checked={layout.mode} id="flexSwitchCheckDefault" onChange={layout.switch} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{(layout.mode ? ' Dark mode' : ' Light mode')}</label>
          </div>
        </div>
        {children}
      </main>
      <Footer {...layout} />
    </>
  );
}
