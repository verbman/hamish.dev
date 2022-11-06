import Layout from '../components/Layout'
import { BlogPost, LayoutMode } from '../lib/types'
import Link from 'next/link'
import FeatureBox from '../components/FeatureBox'

export default function Research({ layout }: { layout: LayoutMode }) {

  let web: BlogPost = {
    data: {
      layout: "",
      title: "Legislation as Code [Web]",
      author: "",
      date: "",
      categories: [],
      image: "/assets/images/report_web_home.png",
      imagealt: "Legislation as Code [Web]",
      excerpt: "Opportunities, risks, and recommendations",
      link: "https://hamish.dev/research/lac/",
      slug: "",
      featured: false
    },
    content: "",
    filePath: ""
  }

  let print: BlogPost = {
    data: {
      layout: "",
      title: "Legislation as Code [PDF]",
      author: "",
      date: "",
      categories: [],
      image: "/assets/images/report_cover_print.png",
      imagealt: "Legislation as Code [PDF]",
      excerpt: "Opportunities, risks, and recommendations",
      link: "https://www.brainbox.institute/_files/ugd/13cbd1_cf3fd1723fb547c1ac00310ad20c0781.pdf",
      slug: "",
      featured: false
    },
    content: "",
    filePath: ""
  }

  return (
    <Layout layout={layout}>
      <div className="container layout-page">
        <div className="mainheading">
          <h1 className="sitetitle">Research Projects</h1>
          <p className="lead">Thinking, writing, collaborations.</p>
        </div>
        <div className="article-post">
          <section className="featured-posts">
            <div className="section-title">
              <h2><span>Rules as Code and the Resource Management Act</span></h2>
              <p>Over 2019 - 2020 myself, Nadia Webster and staff at the Wellington City Council worked on a #rulesascode project that attempted amongst other things to publish an &ldquo;Open Interpretation&rdquo; of the residential section of the Wellington City Council District Plan.</p>
              <p>The result I believe is quietly significant and deserves documenting and further exploration. My goal is document the project, a task with added significance given the New Zealand Governments recent decision to replace the Resource Management Act and in the process dramatically reduce the number of plans accross the country.</p>
            </div>
          </section>

          <section className="featured-posts">
            <div className="section-title">
              <h2><span>Legislation as Code</span></h2>
              <p>2021 saw the release of <i>&ldquo;Legislation as Code. Opportunities, risks, and recommendations&rdquo;</i> project. Funded by the New Zealand Law Foundation and produced by myself, Tom Barraclough and Curtis Barnes. It is available in both PDF and a website format.</p>
            </div>
            <div className="row research">
              <FeatureBox post={web} buttonText="View online" layout={layout} />
              <FeatureBox post={print} buttonText="View online" layout={layout} />
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
