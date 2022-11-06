import Link from 'next/link'
import { BlogPost } from '../lib/types'
import feed from '../public/data/feed.json'
import dateFormat from "dateformat"
import { useState, useRef, useEffect } from "react"
import styles from '../styles/Search.module.css'

export default function Search({ mode }: { mode: boolean }) {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [query, setQuery] = useState("");
  const [dropdown, setDropdown] = useState(false);
  let tempPosts: BlogPost[] = [];

  if (query.length > 0) {
    tempPosts = [];
    let q = query.toLowerCase();
    (feed.posts as BlogPost[]).map((post: BlogPost) => {
      if (post.content.toLowerCase().includes(q) || post.data.categories.indexOf(q) > -1 || post.data.author.toLowerCase().includes(q) || post.data.title.toLowerCase().includes(q)) {
        tempPosts.push(post)
      }
    })
  }

  if (!dropdown && tempPosts.length > 0) {
    setDropdown(true)
  } else if (dropdown && query.length == 0) {
    setDropdown(false)
  }

  const eventCatch = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setQuery('');
      setDropdown(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", eventCatch);
    return () => document.removeEventListener('click', eventCatch);
  }, [])


  const inputEvent = (event: React.FormEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value)
  }

  const inputEventFocus = (event: React.FormEvent<HTMLInputElement>) => {
    if (query === event.currentTarget.value && !dropdown) {
      setDropdown(true)
    } else {
      setQuery(event.currentTarget.value);
    }
  }

  return (
    <div className={styles.searchwrap} ref={ref}>
      <form className="bd-search">
        <input type="text" className="form-control text-small launch-modal-search" name="q" onFocus={inputEventFocus} onChange={inputEvent} placeholder="Type and enter..." />
      </form>

      {<div className={`list-group ` + styles.list}>
        {tempPosts.map((post, index) => {
          return <Link key={index} className={`list-group-item ` + (mode ? 'list-group-item-dark' : '')} href={post.data.link}>{post.data.title}<br /><em>({dateFormat(post.data.date, "dS mmmm, yyyy")})</em></Link>
        })}
      </div>}
    </div>
  );
}
