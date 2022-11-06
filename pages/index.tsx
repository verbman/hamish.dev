import { GetStaticProps } from 'next'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import { BlogPost, LayoutMode } from '../lib/types'
import Layout from '../components/Layout'
import FeatureBox from '../components/FeatureBox'
import PostBox from '../components/PostBox'
import CaretUp from '../components/icons/CaretUp'
import feed from '../public/data/feed.json'

export default function Home({ layout }: { layout: LayoutMode }) {

  const fposts = feed.posts.filter(post => {
    return post.data.featured;
  });

  //const nposts = sorted.filter(post => {
  //  return !post.data.featured;
  //}).slice(0, 6);

  const nposts = feed.posts.slice(0, 6);

  return (
    <Layout layout={layout}>
      <div className="container">
        <div className="mainheading">
          <h1 className="sitetitle">{publicRuntimeConfig.title}</h1>
          <p className="lead">
            {publicRuntimeConfig.description}
          </p>
        </div>
        <section className="featured-posts h-feed">
          <div className="section-title">
            <h2><span className="p-name">Featured</span></h2>
          </div>
          <div className="row">
            {fposts && fposts.map((p: BlogPost, index: number) => {
              return <FeatureBox post={p} buttonText="" key={index} layout={layout} />
            })}
          </div>
        </section>
        <section className="recent-posts h-feed">
          <div className="section-title">
            <h2><span className="p-name">All Posts</span></h2>
          </div>
          <div className="row listrecent">
            {nposts && nposts.map((p: BlogPost, index: number) => {
              return <PostBox post={p} key={index} layout={layout}/>
            })}
          </div>
        </section>
        <div className="bottompagination">
          <div className="pointerup"><CaretUp width={25} height={25} color={layout.mode ? '#333' : '#eaeaea' } className={''} /></div>
          <span className="navigation" role="navigation"></span>
        </div>
      </div>
    </Layout>
  )
}
