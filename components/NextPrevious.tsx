import Link from 'next/link'
import { LayoutMode, PrevNext } from '../lib/types';

export default function NextPrevious({ prevnext, layout }: { prevnext: PrevNext, layout: LayoutMode }) {

  let border = layout.mode ? 'border-dark' : 'border-light';
  let txtcolor = layout.mode ? 'text-light' : 'text-dark';

  return (<div className={`row d-flex justify-content-between pt-3 mt-5 font-weight-bold border-top ` + border}>
    <div className="col-md-6 prev fs-6">
      {prevnext.previous && <>
        <b>Previous:</b><br />
        <Link className={`fw-lighter text-decoration-underline ` + txtcolor} href={prevnext.previous.link}>{prevnext.previous.title}</Link>
      </>
      }
    </div>
    <div className="col-md-6 next text-md-end fs-6">
      {prevnext.next && <>
        <b>Next:</b><br />
        <Link className={`fw-lighter text-decoration-underline ` + txtcolor} href={prevnext.next.link}>{prevnext.next.title}</Link>
      </>
      }
    </div>
  </div>
  );
}
