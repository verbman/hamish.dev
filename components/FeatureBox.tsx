import Link from 'next/link'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import dateFormat from "dateformat"
import { BlogPost, LayoutMode } from '../lib/types'
import Image from 'next/image'
import AuthorAvatar from './AuthorAvatar'
import ReadMore from './icons/ReadMore'

export default function FeatureBox({ post, buttonText, layout }: { post: BlogPost, buttonText: string, layout: LayoutMode }) {
  const date = (post.data && post.data.date) ? new Date(post.data.date) : new Date();
  const datetime = dateFormat(date, "yyyy-mm-dd'T'HH:MM:sso");
  const nicecate = dateFormat(date, "dS mmmm, yyyy");

  const subtext = (post.data.excerpt.length > 80) ? post.data.excerpt.replace(/^(.{100}[^\s]*).*/, "$1") + '…' : post.data.excerpt;
  const a = (post.data.author) ? publicRuntimeConfig.authors[post.data.author] : false;

  return (
    <div className="col-md-6 mb-30px h-entry">
      <div className="listfeaturedtag h-100">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-5 pr-lg-0 pe-lg-0">
            <div className="">
              <div className="wrapthumbnail">
                <Link href={post.data.link}>
                  <Image className="featured-box-img-cover" src={post.data.image} fill={true} priority={true} alt={post.data.imagealt} />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-7 ps-lg-0">
            <div className="h-100 card-group">
              <div className={`card rounded-0 ` + (layout.mode ? 'bg-dark' : '') + ` rounded-lg-end`}>
                <div className="card-body">
                  <h2 className="card-title">
                    <Link className={(layout.mode ? 'text-light' : 'text-dark') + ` p-name`} href={post.data.link}>{post.data.title}</Link>
                  </h2>
                  <p className="card-text p-summary">{subtext}</p>
                  {buttonText && <a href={post.data.link} className="btn btn-info">{buttonText}</a>}
                </div>
                {a && <div className="card-footer b-0 mt-auto">
                  <div className="wrapfooter">
                    <span className="meta-footer-thumb">
                      <AuthorAvatar author={a} />
                    </span>
                    <span className="author-meta">
                      <span className="post-name"><a className="p-author h-card u-url" href={a.web}>{a.display_name}</a></span><br />
                      <time className="post-date dt-published" dateTime={datetime}>{nicecate}</time>
                    </span>
                    <span className="post-read-more"><a className='u-url' href={publicRuntimeConfig.url + post.data.link} title="Read Post"><ReadMore width={25} height={25} className={"readmore"} color={layout.mode ? '#FFF' : '#111'} /></a></span>
                    <div className="clearfix"></div>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
