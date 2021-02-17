import frontmatter from "@github-docs/frontmatter";
import fs from "fs";
import { mapValues } from "lodash";
import remarkDeflist from "remark-deflist";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import unified from "unified";
import readingTimes from "../lib/unified-plugins/reading-times";

function dropPositions(node: any) {
  return mapValues(node, (value, key) => {
    switch (key) {
      case "position":
        return undefined;
      case "children":
        return value.map(dropPositions);
      default:
        return value;
    }
  });
}

const contents = fs.readFileSync("/dev/stdin");
const markdown = frontmatter(contents.toString()).content;
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkDeflist)
  .use(readingTimes);
const tree = processor.runSync(processor.parse(markdown));
console.log(JSON.stringify(dropPositions(tree), null, 2));
