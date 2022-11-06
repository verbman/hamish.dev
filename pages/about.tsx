import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import Layout from '../components/Layout'
import { LayoutMode } from '../lib/types'

export default function About({ layout }: { layout: LayoutMode }) {

  return (
    <Layout layout={layout}>
      <div className="container">
        <div className="mainheading">
          <h1 className="sitetitle">{publicRuntimeConfig.title}</h1>
          <p className="lead">
            {publicRuntimeConfig.description}
          </p>
        </div>
        <div className="section-title">
          <h2><span>About</span></h2>
        </div>
        <div className="article-post">
          <div className="row justify-content-between">
            <div className="col-md-8 pr-5">
              <p>Hamish struggles with the rules. Originally a designer, he led his own software development company (<a href="https://verb.nz">Verb</a>) for 20 years during which he also ended up elected to a municipal body as a councillor. In his time there he was fascinated by the future positive and negative impacts he could see technology would have on our democratic institutions. This led him to the New Zealand capital (via 6 years in a bus) to pursue his interest in institution design and technology.</p>
              <p>He spends his time nerding out on the policy, legislation and public service machines and meeting the people operating them. He served for a time as Principal Advisor for the Better Rules policy methodology (within New Zealand&apos;s oldest western government institution) during which he wrote the draft Practical Better Rules Workshop Manual.</p>
              <p>He also co-authored the &ldquo;Legislation as Code&rdquo; New Zealand research report and served as technical lead on an award winning rule-as-code planning tool for the Wellington City Council.</p>
              <p><b>In list form:</b></p>
              <ul>
                <li>&ldquo;Legislation as Code Research&rdquo; researcher, 2019-2021. Funded by the NZ Law Foundation.</li>
                <li>Local Government &ldquo;city planning&rdquo; #RulesAsCode application, 2019-2020 Wellington City Council</li>
                <li>Principal Advisor &ldquo;Better Rules&rdquo;, Department of Internal Affairs 2019-2020</li>
                <li>NZ Govt Service Innovation Lab member 2018-2019, Better Rules ACC Discovery, Rates Rebate application of Legislation as Code.</li>
                <li>GovHack NZ 2017, volunteer organiser</li>
                <li>Elected Councillor, District Services Committee Chairman 2012-2015, Timaru District Council.</li>
                <li>Managing Director of Verb, Dec 1999 - present day.</li>
              </ul>
            </div>
            <div className="col-md-4">
              <div className="sticky-top sticky-top-80">
                <h6>Links:</h6>
                <a title="Facilitating Digital Civic Infrastructure" href="https://verb.nz">Verb</a><br />
                <a title="A place for grounded experimentation, case studies &amp; moving beyond the theoretical." href="https://dlslab.nz">Digital Legal Systems Lab</a><br />
                <a title={publicRuntimeConfig.mastodon_username} href={publicRuntimeConfig.authors.Hamish.mastodon}>Mastodon</a><br />
                <a title={publicRuntimeConfig.twitter_username} href={publicRuntimeConfig.authors.Hamish.twitter}>Twitter</a><br />
                <a title="Why am I on here?" href="https://www.linkedin.com/in/hamishfraser/">Linkedin</a><br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
