import { marked } from 'marked'
import dateFormat from "dateformat"
import { BlogPost, LayoutMode, PrevNext } from '../lib/types'
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/image'
import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../components/Layout'
import Author from '../components/Author'
import Share from '../components/Share'
import Categories from '../components/Categories'
import NextPrevious from '../components/NextPrevious'
import feed from '../public/data/feed.json'

interface Params extends ParsedUrlQuery {
  slug: string;
}

export default function Blog({ post, prevNext, layout }: { post: BlogPost, prevNext: PrevNext, layout: LayoutMode }) {
  const date = (post.data && post.data.date) ? new Date(post.data.date) : new Date();
  const datetimer = dateFormat(date, "yyyy-mm-dd");
  const nicecate = dateFormat(date, "dS mmmm, yyyy");

  var img = (post.data.image) ? <Image fill={true} priority={true} src={post.data.image} alt={post.data.imagealt} /> : <></>;

  return (
    <Layout layout={layout}>
      <div className="container drop">
        <div className="row">
          <div className="col-md-2 pl-0">
            <Share page={post.data} layout={layout} />
          </div>
          <div className="col-md-9 flex-first flex-md-unordered">
            <div className="mainheading">
              {post.data.author && <Author author={post.data.author} />}
              <h1 className="posttitle">{post.data.title}</h1>
            </div>

            <div className="featured-image img-fluid">{img}</div>

            <div className='article-post' dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}></div>

            <p>
              <small><span className="post-date"><time className="post-date" dateTime={datetimer}>{nicecate}</time></span></small>
            </p>

            {post.data.categories.length > 0 && <Categories categories={post.data.categories} />}

          </div>
        </div>
        <NextPrevious prevnext={prevNext} layout={layout} />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params!;
  let post = feed.posts[0];
  let prevNext: PrevNext = {
    previous: null,
    next: null
  }
  for (var i = 0; i < feed.posts.length; i++) {
    if (feed.posts[i].data.slug === slug) {
      post = feed.posts[i];
      if (i - 1 >= 0) {
        prevNext.next = feed.posts[i - 1].data
      }
      if (i + 1 < feed.posts.length) {
        prevNext.previous = feed.posts[i + 1].data
      }
      break;
    }
  }
  return {
    props: {
      post,
      prevNext
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = feed.posts.map((post) => {
    let slug = post.data.slug;
    return {
      params: {
        slug
      }
    }
  })
  return {
    paths,
    fallback: false
  }
}
