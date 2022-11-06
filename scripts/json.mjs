import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const generateJson = async () => {
  const POSTS_DIR = path.join(process.cwd(), 'blogposts');
  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((filePath) => filePath !== '.DS_Store') // only needed for macOS
    .map((filePath) => {
      const source = fs.readFileSync(path.join(POSTS_DIR, filePath));
      const { content, data } = matter(source);
      data.slug = filePath.replace(".mdx", "");
      data.link = '/' + data.slug;
      return {
        content,
        data,
        filePath,
      };
    })
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  let temp = [];
  posts.forEach((p) => {
    p.data.categories.forEach((s) => {
      if (!temp.includes(s)) {
        let name = s;
        let slug = s.replace(/ /g, '-').toLowerCase();
        temp.push({ slug, name });
      }
    });
  });
  let finalObj = {
    categories: temp,
    posts: posts
  }

  // Create sitemap file
  fs.writeFileSync('./public/data/feed.json', JSON.stringify(finalObj));
};

generateJson();
