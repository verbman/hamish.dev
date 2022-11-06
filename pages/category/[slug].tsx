import { BlogPost, Tag, LayoutMode } from '../../lib/types'
import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../../components/Layout'
import PostBox from '../../components/PostBox'
import feed from '../../public/data/feed.json'

interface Params extends ParsedUrlQuery {
  slug: string;
}

export default function Category({ category, layout }: { category: Tag, layout: LayoutMode }) {

  let posts: BlogPost[] = [];
  for (var i = 0; i < feed.posts.length; i++) {
    if (feed.posts[i].data.categories.indexOf(category.name) !== -1) {
      posts.push(feed.posts[i]);
    }
  }

  return (
    <Layout layout={layout}>
      <div className="container drop">
        <div className="row">
          <section className="recent-posts">
            <div className="section-title">
              <h2><span>Category: {category.name}</span></h2>
            </div>
            <div className="row listrecent">
              {posts && posts.map((p: BlogPost, index: number) => {
                return <PostBox post={p} key={index} layout={layout} />
              })}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params!;
  let category = feed.categories[0];
  for (var i = 0; i < feed.categories.length; i++) {
    if (feed.categories[i].slug === slug) {
      category = feed.categories[i] as Tag;
      break;
    }
  }
  return {
    props: {
      category
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  //  Get files from the posts dir
  const paths = feed.categories.map((t) => {
    return {
      params: {
        slug: t.slug
      }
    }
  })
  return {
    paths,
    fallback: false,
  }
}
