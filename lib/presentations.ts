import fs from "fs";
import glob from "glob";
import { filter, memoize, orderBy } from "lodash";
import path from "path";
import { MarkdownData, parse } from "./markdown";

export interface PresentationData {
  slug: string;
  title: string;
  description: string | null;
  year: string;
  presented: string;
  presented_at: string;
  published: boolean;
  slides: MarkdownData[];
}

export default memoize(async function (): Promise<PresentationData[]> {
  const matches = glob.sync("_presentations/**/presentation.md");
  const presentations: PresentationData[] = matches.map((match) => {
    const fullPath = path.relative("_presentations", match);
    const { dir: year, name: slug } = path.parse(path.dirname(fullPath));
    const data = memoize(() => {
      const contents = fs.readFileSync(match);
      return parse(contents.toString());
    });

    return {
      slug,
      year,

      get title(): string {
        return data().frontmatter.title;
      },

      get description(): string | null {
        return data().frontmatter.description ?? null;
      },

      get presented(): string {
        return data().frontmatter.presented;
      },

      get presented_at(): string {
        return data().frontmatter.presented_at;
      },

      get slides(): MarkdownData[] {
        return data()
          .source.split("\n---\n")
          .map((slide) => {
            const slideData = parse(slide);
            slideData.frontmatter = data().frontmatter;
            return slideData;
          });
      },

      get published(): boolean {
        return data().frontmatter.published ?? true;
      },

      get markdown(): MarkdownData {
        return data();
      },
    };
  });

  const orderedPresentations = orderBy(presentations, "presented", "desc");
  if (process.env.NODE_ENV == "development") {
    return orderedPresentations;
  }
  return filter(orderedPresentations, "published");
});
