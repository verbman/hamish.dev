import Layout from '../../components/Layout'
import { LayoutMode } from '../../lib/types'
import dsa from '../../public/data/dsa.json'

type LawStruct = {
  id: string;
  part: string;
  chapter: string;
  section: string;
  article: string;
  paragraph: string;
  type: string;
  element: string;
  listtype: string;
  listno: string;
  indent: string;
  content: string;
  footnotes: number[];
}

export default function About({ layout }: { layout: LayoutMode }) {

  
  let rows = [];
  var i = 0;
  while (i < dsa.length) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    rows.push(<p key={i} id={dsa[i].id} dangerouslySetInnerHTML={{ __html: dsa[i].content }}></p>);
    i++;
  }

  return (
    <Layout layout={layout}>
      <div className="container">
        <style global jsx>{`
          .uc { text-transform: uppercase; }
          .underline { text-transform: underline; }
          .sc { font-variant: small-caps; }
          .article-post p { margin: 0 0 0.6rem 0; -webkit-transition: background-color 300ms linear;
            -ms-transition: background-color 300ms linear;
            transition: background-color 300ms linear; }
          p:hover { background-color: rgba(155,155,155,0.3); }
          article { font-size: 0.8em; line-height: 1em;}
          @media (max-width: 600px) {
            article {
              background: blue;
            }
          }
        `}</style>
        <div className="mainheading">
          <h1 className="sitetitle">Digital Services Act</h1>
          <p className="lead">
            {i} data points of experiment with law
          </p>
        </div>
        <div className="section-title">
          <h2><span>Select:</span></h2>
        </div>
        <article className="article-post">
          <div className="row justify-content-between">
            {rows}
          </div>
        </article>
      </div>
    </Layout>
  );
}

/*
export const getStaticProps: GetStaticProps = async (context) => {
  
  return {
    props: {
      lines: dsa
    }
  }
}
*/