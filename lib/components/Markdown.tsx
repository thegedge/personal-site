import { isArray, isString, pick } from "lodash";
import React, { createElement } from "react";
import Latex from "react-latex";
//
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import cpp from "react-syntax-highlighter/dist/cjs/languages/prism/cpp";
import glsl from "react-syntax-highlighter/dist/cjs/languages/prism/glsl";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import liquid from "react-syntax-highlighter/dist/cjs/languages/prism/liquid";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import ruby from "react-syntax-highlighter/dist/cjs/languages/prism/ruby";
import rust from "react-syntax-highlighter/dist/cjs/languages/prism/rust";
import sh from "react-syntax-highlighter/dist/cjs/languages/prism/shell-session";
import { prism as syntaxTheme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { MarkdownData, MarkdownNode } from "../markdown";
//
import { Link } from "./Link";

SyntaxHighlighter.registerLanguage("sh", sh);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("glsl", glsl);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("liquid", liquid);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("ruby", ruby);
SyntaxHighlighter.registerLanguage("rust", rust);

const tailwindAlignment = (align?: "left" | "right" | "center") => {
  switch (align) {
    case "left":
      return "text-left";
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "";
  }
};

const MarkdownParagraph = (props: { children: React.ReactNode }) => {
  return <p className="my-4">{props.children}</p>;
};

const MarkdownCode = (props: { language: string; value: string }) => {
  return (
    <SyntaxHighlighter
      language={props.language}
      style={syntaxTheme}
      showLineNumbers
      codeTagProps={{ className: "text-base leading-4" }}
    >
      {props.value}
    </SyntaxHighlighter>
  );
};

const MarkdownInlineCode = (props: { children: React.ReactNode }) => {
  return (
    <code className="inline-block px-2 bg-primary-100 rounded-lg text-base">{props.children}</code>
  );
};

const MarkdownImage = (props: { className?: string; alt: string; src: string }) => {
  return (
    <a href={props.src}>
      <img
        src={props.src}
        alt={props.alt}
        className={`mx-auto text-center italic text-primary-500 ${props.className}`}
      />
    </a>
  );
};

const MarkdownBlockQuote = (props: { children: React.ReactNode }) => {
  if (isArray(props.children) && React.isValidElement(props.children[0])) {
    const firstGrandchild = props.children[0].props.children[0];
    if (!isString(firstGrandchild)) {
      if (firstGrandchild.type.name == "TextRenderer") {
        // If we have `> note: ...` or `> aside: ...`, create a note on the right-hand side of the markdown element.
        // This note is _mostly_ removed from the flow of the rest of the markdown, and will be roughly in line with the
        // element that comes after it.

        const noteMatches = firstGrandchild.props.value.match(/^(?:aside|note): /);
        if (isArray(noteMatches)) {
          // TODO doesn't support more than one paragraph
          const text = firstGrandchild.props.value.substring(noteMatches[0].length);
          return (
            <aside className="relative m-0 w-0 p-0 h-0 overflow-visible left-full">
              <div className="w-48 p-2 border-l-1 text-sm italic bg-primary-50 border-primary-200 ">
                {text}
              </div>
            </aside>
          );
        }
      } else if (firstGrandchild.type == MarkdownImage) {
        // If we have something like this:
        //
        //    > ![test](imgurl)
        //    > some caption text
        //
        // Then convert it to a figure. The first child of a block quote in the above would be a single
        // paragraph element.

        // TODO This "flattening" of the children could probably be made into a function

        const images = [];
        let index = 0;
        let node = props.children[index];
        while (React.isValidElement(node)) {
          if (node.props.children[0].type == MarkdownImage) {
            images.push(
              ...node.props.children.filter((ch: React.ReactElement) => ch.type == MarkdownImage)
            );
            node = props.children[++index];
          } else {
            break;
          }
        }

        if (images.length > 0) {
          const caption = [...props.children.slice(index)];
          const gridClassName =
            images.length > 1
              ? "grid md:grid-cols-2 gap-2 items-center justify-items-center auto-rows-fr"
              : "";

          // TODO better way of making images line up nicely. I want the images to fill out the width, but
          //      I don't want one being taller than others.
          const imgClassName = ""; // images.length > 1 ? "max-h-92" : "";

          return (
            <figure>
              <div className={gridClassName}>
                {images.map((img) => (
                  <MarkdownImage
                    key={img.props.src}
                    className={`${imgClassName} ${img.props.className}`}
                    {...pick(img.props, "alt", "src")}
                  />
                ))}
              </div>
              {caption.length > 0 && (
                <figcaption className="text-base leading-none text-primary-400">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        }
      }
    }
  }

  return <blockquote>{props.children}</blockquote>;
};

const MarkdownLink = (props: { href: string; children: React.ReactNode }) => {
  return <Link href={props.href}>{props.children}</Link>;
};

const MarkdownDescriptionList = (props: { children: React.ReactNode }) => {
  return <dl className="grid grid-cols-deflist gap-x-4 gap-y-4 ml-8 mr-16">{props.children}</dl>;
};

const MarkdownDescriptionTerm = (props: { children: React.ReactNode }) => {
  return <dt className="font-bold text-right">{props.children}</dt>;
};

const MarkdownDescriptionDetails = (props: { children: React.ReactNode }) => {
  return <dd>{props.children}</dd>;
};

const MarkdownTable = (props: { children: React.ReactNode }) => {
  return <table className="mx-auto border-1 border-primary-50">{props.children}</table>;
};

const MarkdownTableRow = (props: { isHeader?: boolean; children: React.ReactNode }) => {
  if (props.isHeader) {
    return <tr className="font-bold bg-primary-200">{props.children}</tr>;
  }
  return <tr className="even:bg-primary-50">{props.children}</tr>;
};

const MarkdownTableCell = (props: {
  isHeader?: boolean;
  align?: "left" | "right" | "center";
  children: React.ReactNode;
}) => {
  return <td className={`py-2 ${tailwindAlignment(props.align)}`}>{props.children}</td>;
};

const MarkdownInlineMath = (props: { value: string }) => {
  const value = `$${props.value}$`;
  return <Latex className="border-black">{value}</Latex>;
};

const MarkdownList = (props: { ordered?: boolean; children: React.ReactNode }) => {
  if (props.ordered) {
    return <ol className="mx-8 my-4">{props.children}</ol>;
  } else {
    return <ul className="mx-8 my-4">{props.children}</ul>;
  }
};

const MarkdownListItem = (props: { children: React.ReactNode }) => {
  return <li>{props.children}</li>;
};

const MarkdownMath = (props: { value: string }) => {
  const value = `$$${props.value}$$`;
  return (
    <Latex className="border-black" displayMode={true}>
      {value}
    </Latex>
  );
};

const MarkdownRoot = (props: { hasNotes: boolean; children: React.ReactNode }) => {
  const additionalClasses = props.hasNotes ? "pr-48" : "";
  return (
    <article className={`text-lg leading-8 md:text-xl md:leading-10 ${additionalClasses}`}>
      {props.children}
    </article>
  );
};

function astToReact(node: MarkdownNode, fullSource: string): React.ReactNode {
  const children = ((node.children || []) as MarkdownNode[]).map((c: MarkdownNode) =>
    astToReact(c, fullSource)
  );

  switch (node.type) {
    case "blockquote":
      return <MarkdownBlockQuote>{children}</MarkdownBlockQuote>;
    case "code":
      return <MarkdownCode language={node.lang} value={node.value} />;
    case "descriptiondetails":
      return <MarkdownDescriptionDetails>{children}</MarkdownDescriptionDetails>;
    case "descriptionlist":
      return <MarkdownDescriptionList>{children}</MarkdownDescriptionList>;
    case "descriptionterm":
      return <MarkdownDescriptionTerm>{children}</MarkdownDescriptionTerm>;
    case "emphasis":
      return <em>{children}</em>;
    case "heading":
      const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
      return createElement(headings[node.depth - 1], {}, children);
    case "html":
      return <div dangerouslySetInnerHTML={{ __html: node.value }} />;
    case "image":
      return <MarkdownImage src={node.url} alt={node.alt} />;
    case "inlineCode":
      return <MarkdownInlineCode>{node.value}</MarkdownInlineCode>;
    case "inlineMath":
      return <MarkdownInlineMath value={node.value} />;
    case "link":
      return <MarkdownLink href={node.url}>{children}</MarkdownLink>;
    case "list":
      return (
        <MarkdownList depth={node.depth || 0} ordered={node.ordered}>
          {children}
        </MarkdownList>
      );
    case "listItem":
      return <MarkdownListItem>{children}</MarkdownListItem>;
    case "math":
      return <MarkdownMath value={node.value} />;
    case "paragraph":
      return <MarkdownParagraph>{children}</MarkdownParagraph>;
    case "root":
      const hasNotes = !!fullSource.match(/^> (?:note|aside): /m);
      return <MarkdownRoot hasNotes={hasNotes}>{children}</MarkdownRoot>;
    case "strong":
      return <strong>{children}</strong>;
    case "table":
      return <MarkdownTable>{children}</MarkdownTable>;
    case "tableCell":
      return (
        <MarkdownTableCell align={node.align} isHeader={node.isHeader}>
          {children}
        </MarkdownTableCell>
      );
    case "tableRow":
      return <MarkdownTableRow isHeader={node.isHeader}>{children}</MarkdownTableRow>;
    case "text":
      return node.value;
    default:
      throw new Error(JSON.stringify(node, null, 2));
  }
}

export default function Markdown(props: { children: MarkdownData }) {
  return <>{astToReact(props.children.node, props.children.source)}</>;
}
