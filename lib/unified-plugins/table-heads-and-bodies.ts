import { isArray } from "lodash";
import { Plugin, Transformer } from "unified";
import { Parent } from "unist";
import visit from "unist-util-visit";
import { MarkdownTable, MarkdownTableCell, MarkdownTableRow } from "../markdown";

// Add <thead> and <tbody> nodes

function addAlignToCells(node: MarkdownTableCell, index: number, parent?: Parent) {
  const align = parent?.align;
  if (isArray(align)) {
    node.align = align[index];
  }
}

function addAlignToRows(node: MarkdownTableRow, _index: number, parent?: Parent) {
  if (parent && parent.type == "tableRow") {
    node.align = (parent as MarkdownTableRow).align;
  }
}

function addTheadAndTbody(node: MarkdownTable) {
  const children = node.children;
  node.children = [
    {
      type: "tableHead",
      align: node.align,
      children: [children[0]],
    },
  ];

  if (children.length > 1) {
    node.children.push({
      type: "tableBody",
      align: node.align,
      children: children.slice(1),
    });
  }
}

const tableHeadsAndBodies: Plugin = () => {
  const transformer: Transformer = (tree, _file) => {
    visit(tree, "table", addTheadAndTbody);
    visit(tree, "tableRow", addAlignToRows);
    visit(tree, "tableCell", addAlignToCells);
  };

  return transformer;
};

export default tableHeadsAndBodies;
