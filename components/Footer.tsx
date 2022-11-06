import Mastodon from "./icons/Mastodon";
import Rss from "./icons/Rss";

export default function Footer({ mode }: { mode: boolean }) {
  let classes = mode ? "bg-black text-light" : "bg-white text-dark";
  return (
    <footer className={`footer ` + classes}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12 py-2 ps-4-md text-center text-md-start">
            &copy; Hamish Fraser
          </div>
          <div className="col-md-5 col-sm-12 py-2 pe-4-md text-center text-md-end">
            <a rel="me" href="https://mastodon.nz/@verbman"><Mastodon width={"18"} height={"18"} color={'#00ab6b'} className="rss-svg" /></a> &nbsp;
            <a target="_blank" rel="noreferrer" href="https://hamish.dev/feed.xml" >
              <Rss width={"18"} height={"18"} className="rss-svg" />
              &nbsp; hamish.dev
            </a>
          </div>
        </div>
      </div>
    </footer>);
}
