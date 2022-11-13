import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import { LayoutMode } from '../../../lib/types'
import dsaEN from './data/dsa-en.json'
import dsaDA from './data/dsa-da.json'
import parse from 'html-react-parser'

type contentSet = {
  start: string | JSX.Element | JSX.Element[];
  children: string | JSX.Element | JSX.Element[];
  end: string | JSX.Element | JSX.Element[];
}

type dsaT = {
  "id": string,
  "part": string,
  "chapter": string,
  "section": string,
  "article": string,
  "paragraph": string,
  "line": string,
  "listno": string,
  "type": string,
  "element": string,
  "listtype": string,
  "indent": string,
  "content": string,
  "footnotes": number[]
}

interface hold {
  key: number;
  dsa: dsaT;
}

interface holder extends hold {
  content: string;
  holdings: JSX.Element[]
}

const clipBoard = (text: HTMLElement, dsa: dsaT) => {
  var reference = '';
  if (dsa.chapter) reference += 'Chapter ' + dsa.chapter + ', '
  if (dsa.section) reference += 'Section ' + dsa.section + ', '
  if (dsa.article) reference += 'Article ' + dsa.article + ', '
  if (dsa.paragraph) reference += 'Number ' + dsa.paragraph + ', '
  if (dsa.line) reference += 'Paragraph ' + dsa.line + ', '
  navigator.clipboard.writeText(reference + '#' + dsa.id + '\n' + text.innerText);
}


const ACTDIV = (key: number, dsa: dsaT, content: contentSet) => {


  var eleclass = '';
  if (dsa.element === 'p' && +dsa.paragraph > 0) {
    if (+dsa.line > 1) {
      eleclass = 'block count hideno ' + dsa.part;
    } else {
      eleclass = 'block count ' + dsa.part;
    }
  } else {
    eleclass = 'block ' + dsa.part;
  }

  var prefootnote = (dsa.part === 'footnote') ? '(' + dsa.id + ') ' : '';
  var pContent = content.start ? <p>{prefootnote}{content.start}</p> : '';

  return <div key={key} className={eleclass} data-listno={dsa.paragraph} id={dsa.id} onClick={(e) => { clipBoard(e.target as HTMLElement, dsa); (e && e.stopPropagation) ? e.stopPropagation() : null; }} >{pContent}{content.children}{content.end}</div>;
}

const ACTP = (key: number, dsa: dsaT, content: string | JSX.Element | JSX.Element[]) => {
  return <p key={key} className="wid" id={dsa.id} onClick={(e) => { clipBoard(e.target as HTMLElement, dsa); (e && e.stopPropagation) ? e.stopPropagation() : null; }} >{content}</p>;
}

const ACTHeading = (key: number, dsa: dsaT, content: contentSet) => {
  const HeadTag = dsa.element as keyof JSX.IntrinsicElements;
  return <HeadTag key={key} data-listno={dsa.listno} id={dsa.id} onClick={(e) => { clipBoard(e.target as HTMLElement, dsa); (e && e.stopPropagation) ? e.stopPropagation() : null; }} >{content.start}{content.children}{content.end}</HeadTag>;
}

const ACTOL = (key: string, classes: string, content: string | JSX.Element | JSX.Element[]) => {
  return <ol key={key} className={classes}>{content}</ol>;
}

const ACTLI = (key: number, dsa: dsaT, content: contentSet) => {
  return <li key={key} data-listno={dsa.listno} id={dsa.id} onClick={(e) => { clipBoard(e.target as HTMLElement, dsa); (e && e.stopPropagation) ? e.stopPropagation() : null; }}>{content.start}{content.children}{content.end}</li>;
}


const xEle = (h: hold, contents: contentSet) => {
  var headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  if (headings.indexOf(h.dsa.element) >= 0) {
    return ACTHeading(h.key, h.dsa, contents);
  } else if (h.dsa.element == 'li') {
    return ACTLI(h.key, h.dsa, contents);
  } else {
    return ACTDIV(h.key, h.dsa, contents);
  }
}

export default function DSA({ layout }: { layout: LayoutMode }) {

  const router = useRouter()
  var dsa = (router.query.lang == "da") ? dsaDA : dsaEN;
  
  var lastIndent: number = 0;
  var thisIndent: number = 0;
  var nextIndent: number = 0;
  var lastPara: number = 0;
  var thisPara: number = 0;
  var nextPara: number = 0;
  var holders: holder[] = [];
  var outputs: JSX.Element[] = [];
  var processed: boolean = false;
  var paraHolder: null | holder = null;
  var messyPara: boolean = false;
  var notTheSamePara: boolean;

  var i = 0;

  while (i < dsa.length) {
    processed = false;
    lastIndent = i > 0 ? +dsa[i - 1].indent : 0;
    thisIndent = +dsa[i].indent;
    nextIndent = (i + 1) < dsa.length ? +dsa[i + 1].indent : 0;
    lastPara = i > 0 ? +dsa[i - 1].paragraph : 0;
    thisPara = +dsa[i].paragraph;
    nextPara = (i + 1) < dsa.length ? +dsa[i + 1].paragraph : 0;
    notTheSamePara = (thisPara != lastPara || ((i > 0) && dsa[i].article != dsa[i - 1].article) || ((i > 0) && dsa[i].section != dsa[i - 1].section));
    messyPara = (thisPara > 0 && (+dsa[i].line > 0 || (thisPara === nextPara && +dsa[i + 1].line > 0)));

    if (thisIndent < lastIndent) {
      for (var k = lastIndent - 1; k >= thisIndent; k--) {
        var z = holders.pop();
        if (z) {
          var temp = xEle({ key: z.key, dsa: z.dsa }, { start: parse(z.content), children: ACTOL(i + "ol", dsa[i - 1].listtype, z.holdings), end: '' });
          if (thisIndent > 0) {
            holders[thisIndent - 1].holdings.push(temp);
          } else {
            if (paraHolder !== null) {
              if (z.dsa.element === 'p') {
                if (z.content) paraHolder.holdings.push(ACTP(z.key, z.dsa, parse(z.content)));
              } else {
                paraHolder.holdings.push(temp);
              }
              if (notTheSamePara) {
                outputs.push(xEle({ key: paraHolder.key, dsa: paraHolder.dsa }, { start: '', children: paraHolder.holdings, end: '' }));
                paraHolder = null;
              }
            } else {
              outputs.push(temp);
            }
          }
        }
      }
    }

    if (paraHolder != null && notTheSamePara) {
      outputs.push(xEle({ key: paraHolder.key, dsa: paraHolder.dsa }, { start: '', children: paraHolder.holdings, end: '' }));
      paraHolder = null;
    }
    if (messyPara && paraHolder === null) {
      paraHolder = { key: i, dsa: dsa[i], content: '', holdings: [] }
    }

    if (nextIndent > thisIndent) {
      holders.push({ key: i, dsa: dsa[i], content: dsa[i].content, holdings: [] });
      processed = true;
    } else if (thisIndent > 0) {
      holders[thisIndent - 1].holdings.push(xEle({ key: i, dsa: dsa[i] }, { start: parse(dsa[i].content), children: '', end: '' }));
      processed = true;
    }
    if (!processed) {
      if (paraHolder !== null) {
        if (dsa[i].element === 'p') {
          if (dsa[i].content) paraHolder.holdings.push(ACTP(i, dsa[i], parse(dsa[i].content)));
        } else {
          paraHolder.holdings.push(xEle({ key: i, dsa: dsa[i] }, { start: parse(dsa[i].content), children: '', end: '' }));
        }
      }
      if (paraHolder === null) {
        outputs.push(xEle({ key: i, dsa: dsa[i] }, { start: parse(dsa[i].content), children: '', end: '' }))
      }
    }
    i++;
  }

  return (
    <Layout layout={layout}>
      <div className="container">
        <style global jsx>{`
          body {
            counter-reset: section;      
          }
          .act {
            line-height: 1.6em;
            font-size: 0.8em;
          }
          .act div,.act div p{
            position:relative;
          }
          .act div p{
            margin-bottom: 0.6rem;
          }
          /* id hover state */
          h1,h2,h3,h4,h5,h6{
            position:relative;
          }
          .act div:hover:after,.act li:hover:after,.act h1:hover:after,.act h2:hover:after,.act h3:hover:after,.act h4:hover:after,.act h5:hover:after,.act div p.wid:hover:after{
            content: "#" attr(id);
            position:absolute;
            right: 0em;
            top: -2.2em;
            display:block;
            background-color: rgba(125,125,125,0.5);
            padding: 4px 10px;
            font-size: 13px;
            font-weight: normal;
          }
          .act h1:hover:after,.act h2:hover:after,.act h3:hover:after,.act h4:hover:after,.act h5:hover:after{
            top: -1.8em;
          }
          .act sup,.act sub{
            font-size: 0.9em;
            font-weight: bold;
          }
          div.count{
            padding-left:5em;
          }
          .act ol{
            padding-left: 3em;
            margin-left: 0;
            list-style-type: none;
            counter-reset: countaway;
          }
          .act ol li{
            counter-increment: countaway;
            position:relative;
          }
          .act ol li:before {
            margin: 0 0 0 -3em;
            width: 3em;
            display:inline-block;
            text-align: right;
            padding: 0 1em 0 0;
          }
          .act ol.alpha li:before {
            content: "(" counter(countaway, lower-alpha) ")";
          }
          .act ol.DASH li:before {
            content: "—";
          }
          .act ol.roman li:before {
            content: "(" counter(countaway, lower-roman) ")";
          }
          .act ol.ARAB{
            padding-left:0;
          }
          .act h1{ font-size:2.6em; }
          .act h2{ font-size:2.2em; margin-top:1.6em; }
          .act h3{ font-size:1.8em; }
          .act h4{ font-size:1.4em; margin-top:0.6em;}
          .act h5{ font-size:1em; }
          .act h6{ font-size:0.8em; }
          div.count:before {
            counter-increment: section;
            content: attr(data-listno) ".";
            margin-left: -5em;
            position: absolute;
            text-align: right;
            width: 4em;
          }
          div.count.hideno:before{
            
          }
          div.count.preamble:before {
            content: "(" attr(data-listno) ") ";
          }
          .uc { text-transform: uppercase; }
          .underline { text-transform: underline; }
          .sc { font-variant: small-caps; }
          .article-post p { 
            margin: 0 0 0.6rem 0; 
            -webkit-transition: background-color 300ms linear;
            -ms-transition: background-color 300ms linear;
            transition: background-color 300ms linear; 
          }

          .act>div,.act h1,.act h2,.act h3,.act h4,.act h5,.act h6 { 
            opacity: 0.7;
          }

          .act div:hover,.act h1:hover,.act h2:hover,h3:hover,h4:hover,h5:hover,h6:hover,li:hover,.act div p.wid:hover { 
            background-color: rgba(125,125,125,0.5); 
            opacity: 1;
          }
          
          @media screen and (min-width: 1500px) {
            .act div:hover:after,.act li:hover:after{
              top: -2.4em;
            }
            .act h1:hover:after,.act h2:hover:after,.act h3:hover:after,.act h4:hover:after,.act h5:hover:after,.act div p.wid:hover:after{
              top: -1.8em;
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
        <article>
          <div className="row justify-content-between act">
            {outputs}
          </div>
        </article>
      </div>
    </Layout>
  );
}
