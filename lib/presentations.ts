import frontmatter from "@github-docs/frontmatter";
import fs from "fs";
import { parse } from "./markdown";

export async function getStaticPresentationProps(path: string) {
  const content = fs.readFileSync(path).toString();
  const fm = frontmatter(content);
  const slides = fm.content.split("\n---\n").map((slide) => {
    const data = parse(slide);
    data.frontmatter = fm;
    return data;
  });

  return { props: { slides } };
}
