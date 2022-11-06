import Link from 'next/link'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import AuthorAvatar from './AuthorAvatar'
import { SvgLinkType } from '../lib/types'
import Mastodon from './icons/Mastodon'
import Twitter from './icons/Twitter'
import SvgLink from './SvgLink'

export default function Author({ author }: { author: string }) {

  const a = publicRuntimeConfig.authors[author];
  const green = "#1C9963";

  let twitterIcon: SvgLinkType = {
    link: a.twitter,
    label: "Follow on Twitter",
    colour: green,
    width: "18",
    height: "18",
    className: "follows",
    text: "",
    comp: Twitter
  }

  let mastordonIcon: SvgLinkType = {
    link: a.mastodon,
    label: "Follow on Mastodon",
    colour: green,
    width: "18",
    height: "18",
    className: "follows",
    text: "",
    comp: Mastodon
  }

  return (<div className="row post-top-meta">
    <div className="col-xs-12 col-md-2 col-lg-1 text-md-left mb-4 mb-md-0 authoravatar"><AuthorAvatar author={a} /></div>
    <div className="col-xs-12 col-md-9 col-lg-10 text-md-left">
      <Link target="_blank" className="author-name" href={a.web}>{a.display_name}</Link>
      <SvgLink props={mastordonIcon} />
      <SvgLink props={twitterIcon} />
      <span className="author-description">{a.description}</span>
    </div>
  </div>
  );
}
