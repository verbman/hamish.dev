import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import { BlogData, SvgLinkType } from '../lib/types';
import { LayoutMode } from '../lib/types'
import Linkedin from '../components/icons/Linkedin'
import Twitter from '../components/icons/Twitter'
import SvgLink from './SvgLink'

export default function Share({ page, layout }: { page: BlogData, layout: LayoutMode }) {

  let greycolour = layout.mode ? "rgba(255, 255, 255, .44)" : "rgba(0, 0, 0, .44)";

  let twitterIcon: SvgLinkType = {
    comp: Twitter,
    link: `https://twitter.com/intent/tweet?text=` + page.title + `&url=` + publicRuntimeConfig.url + page.link,
    label: "Share on twitter",
    colour: greycolour,
    width: "18",
    height: "18",
    className: "",
    text: ""
  }
  let linkedInIcon: SvgLinkType = {
    comp: Linkedin,
    link: `https://www.linkedin.com/shareArticle?mini=true&url=` + publicRuntimeConfig.url + page.link,
    label: "Share on Linkedin",
    colour: greycolour,
    width: "18",
    height: "18",
    className: "",
    text: ""
  }

  return (<div className="share sticky-top sticky-top-offset">
    <p>Share</p>
    <ul>
      <li className="ms-3 me-3">
        <SvgLink props={twitterIcon} />
      </li>
      <li className="ms-3 me-3">
        <SvgLink props={linkedInIcon} />
      </li>
    </ul>
  </div>
  );
}
