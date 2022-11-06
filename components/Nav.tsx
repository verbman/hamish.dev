import Link from 'next/link';
import Search from './Search'
import { useState } from "react";
import styles from '../styles/Nav.module.css'

export default function Nav({ mode }: { mode: boolean }) {

  const [opennav, setOpennav] = useState(false);

  const burger = (event: React.FormEvent<HTMLButtonElement>) => {
    setOpennav(!opennav);
  }

  return (<>
    <button className="navbar-toggler" onClick={burger} type="button" aria-label="Toggle navigation">
      <span className={`navbar-toggler-icon` + (opennav ? ' up' : '')}></span>
    </button>
    <div className={opennav ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'} >
      <ul className={'navbar-nav ms-auto ' + styles.wrapper}>
        <li className="nav-item">
          <Link className="nav-link" href="/">Blog</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/research">Research</Link>
        </li>
      </ul>
      <Search mode={mode} />
    </div>
  </>);
}
