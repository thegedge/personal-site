import frontmatter from "@github-docs/frontmatter";
import fs from "fs";
import glob from "glob";
import { filter, memoize, orderBy } from "lodash";
import path from "path";
export interface PostData {
  fullPath: string;
  parent: string;
  slug: string;
  date: string;
  markdown: string;
  title: string;
  tags: string[];
  description: string | null;
  published: boolean;
}

export default memoize(async function (): Promise<PostData[]> {
  const matches = glob.sync("_posts/**/*.md");
  const posts = matches.map((match) => {
    const slug = path.parse(match).name;
    const date = slug.substr(0, 10);
    return {
      fullPath: path.normalize(match),
      parent: path.relative("_posts", path.dirname(match)),
      date,
      slug,

      get published(): boolean {
        return this.frontMatter.published ?? true;
      },

      get description(): string {
        return this.frontMatter.description ?? null;
      },

      get title(): string {
        return this.frontMatter.title;
      },

      get tags(): string[] {
        return this.frontMatter.tags;
      },

      get markdown(): string {
        return this.contents.content;
      },

      get frontMatter(): Record<string, any> {
        return this.contents.data;
      },

      get contents(): Record<string, any> {
        const contents = fs.readFileSync(match);
        return frontmatter(contents.toString());
      },
    };
  });

  const orderedPosts = orderBy(posts, "date", "desc");
  if (process.env.NODE_ENV == "development") {
    return orderedPosts;
  }
  return filter(orderedPosts, "published");
});
