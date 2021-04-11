import frontmatter from "@github-docs/frontmatter";
import addListMetadata from "mdast-add-list-metadata";
import remarkDeflist from "remark-deflist";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import unified from "unified";
import { Node } from "unist";
import readingTimes from "./unified-plugins/reading-times";
import removeListParagraphs from "./unified-plugins/remove-list-paragraphs";
import replaceLinkReferences from "./unified-plugins/replace-link-references";
import tableHeadsAndBodies from "./unified-plugins/table-heads-and-bodies";

export interface MarkdownData {
  node: MarkdownNodes;
  frontmatter: Record<string, any>;
  source: string;
}

export type MarkdownNodes =
  | MarkdownBlockquote
  | MarkdownCode
  | MarkdownDefinition
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

export interface MarkdownNode<Children = MarkdownNodes> extends Node {
  children: Children[];
}

export type Alignment = "left" | "right" | "center" | null;

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

export interface MarkdownList extends MarkdownNode<MarkdownListItem> {
  type: "list";
  ordered: boolean;
  start: number;
  spread: boolean;
  depth: number;
}

export interface MarkdownListItem extends MarkdownNode {
  type: "listItem";
  ordered: boolean;
  checked?: boolean;
  spread: boolean;
  index: number;
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

export interface MarkdownTable
  extends MarkdownNode<MarkdownTableHead | MarkdownTableBody | MarkdownTableRow> {
  type: "table";
  align: Alignment[];
}

export interface MarkdownTableBody extends MarkdownNode<MarkdownTableRow> {
  type: "tableBody";
  align?: Alignment[];
}

export interface MarkdownTableCell extends MarkdownNode {
  type: "tableCell";
  align?: Alignment;
  isHeader?: boolean;
}

export interface MarkdownTableHead extends MarkdownNode<MarkdownTableRow> {
  type: "tableHead";
  align?: Alignment[];
}

export interface MarkdownTableRow extends MarkdownNode<MarkdownTableCell> {
  type: "tableRow";
  isHeader?: boolean;
  align?: Alignment[];
}

export interface MarkdownText extends MarkdownNode {
  type: "text";
  value: string;
}

export interface MarkdownThematicBreak extends MarkdownNode {
  type: "thematicBreak";
}

export interface MarkdownDefinition extends MarkdownNode {
  type: "definition";
  identifier: string;
  url: string;
  label: string;
  title: string | null;
}

// From remark-deflist

export interface MarkdownDescriptionDetails extends MarkdownNode {
  type: "descriptiondetails";
}

export interface MarkdownDescriptionList
  extends MarkdownNode<MarkdownDescriptionDetails | MarkdownDescriptionTerm> {
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
    .use(addListMetadata)
    .use(removeListParagraphs)
    .use(replaceLinkReferences)
    .use(tableHeadsAndBodies)
    .use(readingTimes);

  return {
    node: processor.runSync(processor.parse(markdown)) as MarkdownNodes,
    frontmatter: fm.data,
    source: fm.content,
  };
}
