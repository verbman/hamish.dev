export type LayoutMode = {
  mode: boolean;
  wait: boolean;
  switch: (event: React.FormEvent<HTMLInputElement>) => void;
};

export type BlogPost = {
  data: BlogData;
  content: string;
  filePath: string;
};

export type BlogData = {
  layout: string;
  title: string;
  author: string;
  date: string;
  categories: string[];
  image: string;
  imagealt: string;
  excerpt: string;
  link: string;
  slug: string;
  featured: boolean;
};

export type Img = {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: string;
}

export type Author = {
  name: string;
  display_name: string;
  email: string;
  web: string;
  twitter: string;
  mastodon: string;
  description: string;
  avatar: string;
}

export type SvgLinkType = {
  comp: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  link: string;
  label: string;
  colour: string;
  width: string;
  height: string;
  className: string;
  text: string;
}

export type Tag = {
  name: string;
  slug: string;
}

export type PrevNext = {
  previous: BlogData | null;
  next: BlogData | null;
}
