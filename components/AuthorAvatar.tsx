import Image from 'next/image';
import { Author } from '../lib/types'

export default function AuthorAvatar({ author }: { author: Author }) {

  if (author.avatar) {
    return <Image className="author-thumb" src={author.avatar} width={72} height={72} alt={author.display_name} />
  } else {
    return <Image className="author-thumb" width={72} height={72} src="" alt={author.display_name} />
  }

}
