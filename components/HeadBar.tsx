import Link from 'next/link';
import Nav from './Nav'

export default function HeadBar({ mode }: { mode: boolean }) {
  let classes = mode ? "navbar-dark bg-black" : "navbar-light bg-white";
  let svgfill = mode ? "#FFF" : "#111";

  return (<nav className={`navbar navbar-expand-lg ` + classes + ` fixed-top topnavigation nav-down`}>
    <div className="container pe-lg-5">
      <Link className="navbar-brand" aria-label="Home" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="none" d="M0 0h24v24H0z" />
          <path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zm-6-2h5V9.157l-6-5.454-6 5.454V19h5v-6h2v6z" fill={svgfill} />
        </svg>
      </Link>
      <Nav mode={mode} />
    </div>
  </nav>)
}
