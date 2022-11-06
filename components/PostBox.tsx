import Link from 'next/link'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import dateFormat from "dateformat"
import { BlogPost, LayoutMode } from '../lib/types'
import Image from 'next/image'
import AuthorAvatar from './AuthorAvatar'
import ReadMore from './icons/ReadMore'

export default function PostBox({ post, layout }: { post: BlogPost, layout: LayoutMode }) {
  const date = (post.data && post.data.date) ? new Date(post.data.date) : new Date();
  const nicecate = dateFormat(date, "dS mmmm, yyyy");

  const subtext = (post.data.excerpt.length > 160) ? post.data.excerpt.replace(/^(.{150}[^\s]*).*/, "$1") + '…' : post.data.excerpt;
  const a = (post.data.author) ? publicRuntimeConfig.authors[post.data.author] : false;

  return (
    <div className="col-lg-4 col-md-6 mb-30px card-group">
      <div className={`card ` + (layout.mode ? 'bg-dark' : '')+` h-100`}>
        <div className="maxthumb">
          <Link href={post.data.link}>
            <Image className="img-fluid" src={post.data.image} fill={true} priority={true} alt={post.data.imagealt} />
          </Link>
        </div>
        <div className="card-body">
          <h2 className="card-title">
            <Link className={layout.mode ? 'text-light' : 'text-dark'} href={post.data.link}>{post.data.title}</Link>
          </h2>
          <h4 className="card-text">{subtext}</h4>
        </div>
        {a && <div className="card-footer">
          <div className="wrapfooter">
            <span className="meta-footer-thumb">
              <AuthorAvatar author={a} />
            </span>
            <span className="author-meta">
              <span className="post-name"><a href={a.web}>{a.display_name}</a></span><br />

              <span className="post-date">{nicecate}</span>
            </span>
            <span className="post-read-more"><a href={post.data.link} title="Read Post"><ReadMore width={25} height={25} className={"readmore"} color={layout.mode ? '#FFF' : '#111'} /></a></span>
            <div className="clearfix"></div>
          </div>
        </div>}
      </div>
    </div>
  );
}
