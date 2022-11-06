import Link from 'next/link'
import feed from '../public/data/feed.json'
import { Tag } from '../lib/types'

export default function Categories({ categories }: { categories: string[] }) {

  var cats: Tag[] = []
  for (var i = 0; i < categories.length; i++) {
    let temp = feed.categories.find(c => c.name === categories[i]);
    if (temp) cats.push(temp);
  }

  return (<div className="after-post-cats">
    <ul className="tags mb-4">
      {cats.map((cat: Tag, index: number) => {
        return <li key={index}><Link className="smoothscroll" href={`/category/` + cat.slug}>{cat.name}</Link></li>
      })}
    </ul>
  </div>
  );
}
