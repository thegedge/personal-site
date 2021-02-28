import frontmatter from "@github-docs/frontmatter";
import remarkDeflist from "remark-deflist";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import unified from "unified";
import { Data, Node, Position } from "unist";
import readingTimes from "./unified-plugins/reading-times";
import removeListParagraphs from "./unified-plugins/remove-list-paragraphs";
import tableHeadsAndBodies from "./unified-plugins/table-heads-and-bodies";

export interface MarkdownData {
  node: MarkdownNodes;
  frontmatter: Record<string, any>;
  source: string;
}

export type MarkdownNodes =
  | MarkdownBlockquote
  | MarkdownCode
  | MarkdownDescriptionList
  | MarkdownDescriptionDetails
  | MarkdownDescriptionTerm
  | MarkdownEmphasis
  | MarkdownHeading
  | MarkdownHtml
  | MarkdownImage
  | MarkdownInlineCode
  | MarkdownInlineMath
  | MarkdownLink
  | MarkdownList
  | MarkdownListItem
  | MarkdownMath
  | MarkdownParagraph
  | MarkdownRoot
  | MarkdownStrong
  | MarkdownTable
  | MarkdownTableBody
  | MarkdownTableCell
  | MarkdownTableHead
  | MarkdownTableRow
  | MarkdownText
  | MarkdownThematicBreak;

export interface MarkdownNode extends Node {
  data?: Data;
  position?: Position;
  children: MarkdownNodes[];
}

// Standard markdown elements

export interface MarkdownBlockquote extends MarkdownNode {
  type: "blockquote";
}

export interface MarkdownInlineCode extends MarkdownNode {
  type: "inlineCode";
  value: string;
}

export interface MarkdownCode extends MarkdownNode {
  type: "code";
  lang: string;
  value: string;
}

export interface MarkdownEmphasis extends MarkdownNode {
  type: "emphasis";
}

export interface MarkdownHeading extends MarkdownNode {
  type: "heading";
  depth: number;
}

export interface MarkdownHtml extends MarkdownNode {
  type: "html";
  value: string;
}

export interface MarkdownInlineMath extends MarkdownNode {
  type: "inlineMath";
  value: string;
}

export interface MarkdownImage extends MarkdownNode {
  type: "image";
  url: string;
  alt: string;
}

export interface MarkdownLink extends MarkdownNode {
  type: "link";
  url: string;
  title: string;
}

export interface MarkdownList extends MarkdownNode {
  type: "list";
  ordered: boolean;
  start: number;
  spread: boolean;
}

export interface MarkdownListItem extends MarkdownNode {
  type: "listItem";
  ordered: boolean;
  checked?: boolean;
  spread: boolean;
}

export interface MarkdownMath extends MarkdownNode {
  type: "math";
  value: string;
}

export interface MarkdownParagraph extends MarkdownNode {
  type: "paragraph";
}

export interface MarkdownRoot extends MarkdownNode {
  type: "root";
}

export interface MarkdownStrong extends MarkdownNode {
  type: "strong";
}

export interface MarkdownTable extends MarkdownNode {
  type: "table";
  align: ("left" | "right" | "center" | null)[];
}

export interface MarkdownTableBody extends MarkdownNode {
  type: "tableBody";
  align?: ("left" | "right" | "center")[];
}

export interface MarkdownTableCell extends MarkdownNode {
  type: "tableCell";
  align?: "left" | "right" | "center";
  isHeader?: boolean;
}

export interface MarkdownTableHead extends MarkdownNode {
  type: "tableHead";
  align?: ("left" | "right" | "center")[];
}

export interface MarkdownTableRow extends MarkdownNode {
  type: "tableRow";
  isHeader?: boolean;
  align?: ("left" | "right" | "center")[];
}

export interface MarkdownText extends MarkdownNode {
  type: "text";
  value: string;
}

export interface MarkdownThematicBreak extends MarkdownNode {
  type: "thematicBreak";
}

// From remark-deflist

export interface MarkdownDescriptionDetails extends MarkdownNode {
  type: "descriptiondetails";
}

export interface MarkdownDescriptionList extends MarkdownNode {
  type: "descriptionlist";
}

export interface MarkdownDescriptionTerm extends MarkdownNode {
  type: "descriptionterm";
}

export function parse(source: string): MarkdownData {
  const fm = frontmatter(source);
  const markdown = fm.content;
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkDeflist)
    .use(removeListParagraphs)
    .use(tableHeadsAndBodies)
    .use(readingTimes);

  return {
    node: processor.runSync(processor.parse(markdown)) as MarkdownNodes,
    frontmatter: fm.data,
    source: fm.content,
  };
}
