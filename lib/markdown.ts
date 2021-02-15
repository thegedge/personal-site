export interface Node {
  children?: MarkdownNode[];
}

export type MarkdownNode = Node &
  (
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
    | MarkdownTableCell
    | MarkdownTableRow
    | MarkdownText
  );

export interface MarkdownData {
  node: MarkdownNode;
  source: string;
}

// Standard markdown elements

export interface MarkdownBlockquote {
  type: "blockquote";
}

export interface MarkdownInlineCode {
  type: "inlineCode";
  value: string;
}

export interface MarkdownCode {
  type: "code";
  lang: string;
  value: string;
}

export interface MarkdownEmphasis {
  type: "emphasis";
}

export interface MarkdownHeading {
  type: "heading";
  depth: number;
}

export interface MarkdownHtml {
  type: "html";
  value: string;
}

export interface MarkdownInlineMath {
  type: "inlineMath";
  value: string;
}

export interface MarkdownImage {
  type: "image";
  url: string;
  alt: string;
}

export interface MarkdownLink {
  type: "link";
  url: string;
  title: string;
}

export interface MarkdownList {
  type: "list";
  ordered: boolean;
  start: number;
  spread: boolean;
  depth?: number;
}

export interface MarkdownListItem {
  type: "listItem";
  ordered: boolean;
  checked?: boolean;
  spread: boolean;
}

export interface MarkdownMath {
  type: "math";
  value: string;
}

export interface MarkdownParagraph {
  type: "paragraph";
}

export interface MarkdownRoot {
  type: "root";
}

export interface MarkdownStrong {
  type: "strong";
}

export interface MarkdownTable {
  type: "table";
  align: ("left" | "right" | "center" | null)[];
}

export interface MarkdownTableCell {
  type: "tableCell";
  align?: "left" | "right" | "center";
  isHeader?: boolean;
}

export interface MarkdownTableCell {
  type: "tableCell";
  align?: "left" | "right" | "center";
  isHeader?: boolean;
}

export interface MarkdownTableRow {
  type: "tableRow";
  isHeader?: boolean;
}

export interface MarkdownText {
  type: "text";
  value: string;
}

// From remark-deflist

export interface MarkdownDescriptionDetails {
  type: "descriptiondetails";
}

export interface MarkdownDescriptionList {
  type: "descriptionlist";
}

export interface MarkdownDescriptionTerm {
  type: "descriptionterm";
}
