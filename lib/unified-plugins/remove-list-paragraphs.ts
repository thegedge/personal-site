import { Plugin, Transformer } from "unified";
import visit from "unist-util-visit";
import { MarkdownListItem } from "../markdown";

// Replace the <p> tag in any list item with its children, if it's the only child

function replaceParagraphWithChildren(node: MarkdownListItem) {
  node.children = node.children.flatMap((child) =>
    child.type == "paragraph" ? child.children : child
  );
}

const tableHeadsAndBodies: Plugin = () => {
  const transformer: Transformer = (tree, _file) => {
    visit(tree, "listItem", replaceParagraphWithChildren);
  };

  return transformer;
};

export default tableHeadsAndBodies;
