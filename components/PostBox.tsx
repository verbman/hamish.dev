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
  const datetime = dateFormat(date, "yyyy-mm-dd'T'HH:MM:sso");
  const nicecate = dateFormat(date, "dS mmmm, yyyy");

  const subtext = (post.data.excerpt.length > 160) ? post.data.excerpt.replace(/^(.{150}[^\s]*).*/, "$1") + '…' : post.data.excerpt;
  const a = (post.data.author) ? publicRuntimeConfig.authors[post.data.author] : false;

  return (
    <div className="col-lg-4 col-md-6 mb-30px card-group h-entry">
      <div className={`card ` + (layout.mode ? 'bg-dark' : '')+` h-100`}>
        <div className="maxthumb">
          <Link href={post.data.link}>
            <Image className="img-fluid" src={post.data.image} fill={true} priority={true} alt={post.data.imagealt} />
          </Link>
        </div>
        <div className="card-body">
          <h2 className="card-title">
            <Link className={(layout.mode ? 'text-light' : 'text-dark') + ` p-name`} href={post.data.link}>{post.data.title}</Link>
          </h2>
          <h4 className="card-text p-summary">{subtext}</h4>
        </div>
        {a && <div className="card-footer">
          <div className="wrapfooter">
            <span className="meta-footer-thumb">
              <AuthorAvatar author={a} />
            </span>
            <span className="author-meta">
              <span className="post-name"><a className="p-author h-card u-url" href={a.web}>{a.display_name}</a></span><br />

              <time className="post-date dt-published" dateTime={datetime}>{nicecate}</time>
            </span>
            <span className="post-read-more"><a className='u-url' href={publicRuntimeConfig.url+post.data.link} title="Read Post"><ReadMore width={25} height={25} className={"readmore"} color={layout.mode ? '#FFF' : '#111'} /></a></span>
            <div className="clearfix"></div>
          </div>
        </div>}
      </div>
    </div>
  );
}
