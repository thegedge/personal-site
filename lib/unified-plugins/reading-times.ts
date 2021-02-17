import { isArray, sumBy, words } from "lodash";
import { Plugin, Transformer } from "unified";
import { Node } from "unist";
import is from "unist-util-is";
import { MarkdownText } from "../markdown";

const READING_WORDS_PER_MINUTE = 175.0;

function calculateReadingTime(node: Node) {
  let readingTime = 0;
  if (is<MarkdownText>(node, "text")) {
    readingTime = words(node.value).length / READING_WORDS_PER_MINUTE;
  }

  if (isArray(node.children)) {
    node.children.forEach(calculateReadingTime);
    readingTime += sumBy(node.children, "readingTime");
  }

  node.readingTime = readingTime;
}

const readingTimes: Plugin = () => {
  const transformer: Transformer = (tree, _file) => {
    calculateReadingTime(tree);
  };

  return transformer;
};

export default readingTimes;
