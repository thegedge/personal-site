import fs from "fs";
import glob from "glob";
import { filter, memoize, orderBy } from "lodash";
import path from "path";
import { MarkdownData, parse } from "./markdown";

export interface PostData {
  slug: string;
  date: string;
  markdown: MarkdownData;
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
    const data = memoize(() => {
      const contents = fs.readFileSync(match);
      return parse(contents.toString());
    });

    return {
      date,
      slug,

      get published(): boolean {
        return data().frontmatter.published ?? true;
      },

      get description(): string | null {
        return data().frontmatter.description ?? null;
      },

      get title(): string {
        return data().frontmatter.title;
      },

      get tags(): string[] {
        return data().frontmatter.tags;
      },

      get markdown(): MarkdownData {
        return data();
      },
    };
  });

  const orderedPosts = orderBy(posts, "date", "desc");
  if (process.env.NODE_ENV == "development") {
    return orderedPosts;
  }
  return filter(orderedPosts, "published");
});
