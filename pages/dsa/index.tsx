import Layout from '../../components/Layout'
import { LayoutMode } from '../../lib/types'
import dsa from '../../public/data/dsa.json'


export default function DSA({ layout }: { layout: LayoutMode }) {

  function swapPForDiv(elment : string) : string{
    return elment === 'p'?'div':elment;
  }
  

  let output= '',eleclass='',elelist = '',elelistclose = '',olclass='',datalistno = '',elementClose = '';//
  var i = 0;
  var lastIndent: number = 0;
  var thisIndent: number = 0;
  var nextIndent: number = 0;
  var elementCloseSet: string[] = [];
  while (i < dsa.length) {
    /* indent class */
    lastIndent = i > 0 ? +dsa[i-1].indent : 0;
    thisIndent = +dsa[i].indent;
    nextIndent = (i+1) < dsa.length ? +dsa[i+1].indent : 0;
    /* element class */
    eleclass = (dsa[i].element === 'p' && dsa[i].listno) ? ' class="count '+ dsa[i].part +'"' : ' class="'+ dsa[i].part +'"';
    
    
    /* start list */
    if ( thisIndent < nextIndent){
      /* list type class */
      olclass = ((i+1) < dsa.length) ? ' class="'+dsa[i+1].listtype+'"' : '';
      elelist = "<ol"+olclass+">";
      elementCloseSet.push('</'+swapPForDiv(dsa[i].element)+'>');
    }else{
      elelist = "";
    }

    datalistno = ( dsa[i].listno ) ? ' data-listno="'+dsa[i].listno+'"' : '';

    if( nextIndent > thisIndent){
      elementClose = '';
    }else{
      elementClose = '</'+swapPForDiv(dsa[i].element)+'>';
      /* close list */
      if(dsa[i].element === 'li' && (nextIndent < thisIndent)){
        elementClose +=  "</ol>"
      }
    }
    if( nextIndent < thisIndent){
      for(var h = nextIndent; h < thisIndent; h++){
        elementClose += elementCloseSet.pop();
      }
    }


    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    output+=(elelistclose+'<'+swapPForDiv(dsa[i].element)+eleclass+datalistno+' key="'+i+'" id="'+dsa[i].id+'">'+dsa[i].content+elementClose+elelist);
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
          .act div{
            margin-bottom: 1rem;
            position:relative;
          }
          .act div:hover:after,.act li:hover:after{
            content: "#" attr(id);
            position:absolute;
            right:0;
            top:-2em;
            display:block;
            background-color:#888;
            padding:3px 5px;
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
          .act h2{ font-size:2.2em; margin-top:2em; }
          .act h3{ font-size:1.8em; }
          .act h4{ font-size:1.4em; }
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
          div.count.preamble:before {
            content: "(" attr(data-listno) ") ";
          }
          .uc { text-transform: uppercase; }
          .underline { text-transform: underline; }
          .sc { font-variant: small-caps; }
          .article-post p { margin: 0 0 0.6rem 0; -webkit-transition: background-color 300ms linear;
            -ms-transition: background-color 300ms linear;
            transition: background-color 300ms linear; }

          p:hover,h1:hover,h2:hover,h3:hover,h4:hover,h5:hover,h6:hover,li:hover { background-color: rgba(155,155,155,0.3); }
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
        <article>
          <div className="row justify-content-between act" dangerouslySetInnerHTML={{ __html: output }}>
          </div>
        </article>
      </div>
    </Layout>
  );
}
