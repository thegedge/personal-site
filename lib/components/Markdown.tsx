import { isArray } from "lodash";
import React from "react";
import Latex from "react-latex";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
//
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
//
import deflist from "remark-deflist";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
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

const MarkdownP = (props: { children: React.ReactNode }) => {
  return <p className="px-4 my-4" {...props} />;
};

const MarkdownCode = (props: { language: string; value: string }) => {
  return (
    <div className="mx-12 text-sm font-mono">
      <SyntaxHighlighter language={props.language} style={syntaxTheme} showLineNumbers>
        {props.value}
      </SyntaxHighlighter>
    </div>
  );
};

const MarkdownInlineCode = (props: { children: React.ReactNode }) => {
  return (
    <code className="inline-block px-2 bg-primary-100 rounded-lg text-base">{props.children}</code>
  );
};

const MarkdownImage = (props: { alt: string; src: string }) => {
  // const ref = React.useRef<HTMLElement>();
  return (
    <>
      <img
        src={props.src}
        alt={props.alt}
        className="mx-auto text-center italic text-primary-500"
      />
      {/* <FontAwesomeIcon icon={faFileImage} forwardedRef={ref} className="hidden" /> */}
    </>
  );
};

const MarkdownBlockQuote = (props: { children: React.ReactNode }) => {
  // If we have something like this:
  //
  //    > ![test](imgurl)
  //    > some caption text
  //
  // Then convert it to a figure. The first child of a block quote in the above would be a single>
  // paragraph element.
  //

  // TODO perhaps best to process the AST, not alter the rendering
  // TODO This "flattening" of the blockquote's children could probably be made into a function
  if (isArray(props.children)) {
    const images = [];
    let index = 0;
    let parent = props.children[index];
    while (React.isValidElement(parent)) {
      if (parent.props.children[0].type == MarkdownImage) {
        images.push(...parent.props.children);
        parent = props.children[++index];
      } else {
        break;
      }
    }

    const caption = [...props.children.slice(index)];
    return (
      <figure className="mx-16">
        <div className={images.length > 2 ? "grid grid-cols-2 gap-2" : ""}>{images}</div>
        {caption.length > 0 && (
          <figcaption className="font-semibold text-sm italic">{caption}</figcaption>
        )}
      </figure>
    );
  }

  return <blockquote {...props} />;
};

const MarkdownLink = (props: { href: string; children: React.ReactNode }) => {
  return <Link {...props} />;
};

const MarkdownDescriptionList = (props: { children: React.ReactNode }) => {
  return <dl className="grid grid-cols-deflist gap-x-4 gap-y-4 ml-8 mr-16 px-4" {...props} />;
};

const MarkdownDescriptionTerm = (props: { children: React.ReactNode }) => {
  return <dt className="font-bold text-right" {...props} />;
};

const MarkdownDescriptionDetails = (props: { children: React.ReactNode }) => {
  return <dd {...props} />;
};

const MarkdownTable = (props: { children: React.ReactNode }) => {
  return <table className="mx-auto border-1 border-primary-50">{props.children}</table>;
};

const MarkdownTableRow = (props: { isHeader: boolean; children: React.ReactNode }) => {
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
  return <td className={`py-2 px-4 ${tailwindAlignment(props.align)}`}>{props.children}</td>;
};

const MarkdownInlineMath = (props: { value: string }) => {
  const value = `$${props.value}$`;
  return <Latex className="border-black">{value}</Latex>;
};

const MarkdownList = (props: { depth: number; ordered?: boolean; children: React.ReactNode }) => {
  const className = props.depth == 0 ? "my-4" : "";
  if (props.ordered) {
    return <ol className={className}>{props.children}</ol>;
  } else {
    return <ul className={className}>{props.children}</ul>;
  }
};

const MarkdownMath = (props: { value: string }) => {
  const value = `$$${props.value}$$`;
  return (
    <Latex className="border-black" displayMode={true}>
      {value}
    </Latex>
  );
};

export default function Markdown(props: { children: string }) {
  const renderers = {
    blockquote: MarkdownBlockQuote,
    paragraph: MarkdownP,
    code: MarkdownCode,
    inlineCode: MarkdownInlineCode,
    link: MarkdownLink,
    linkReference: MarkdownLink,
    table: MarkdownTable,
    tableRow: MarkdownTableRow,
    tableCell: MarkdownTableCell,
    image: MarkdownImage,
    inlineMath: MarkdownInlineMath,
    math: MarkdownMath,
    list: MarkdownList,
    descriptionlist: MarkdownDescriptionList,
    descriptionterm: MarkdownDescriptionTerm,
    descriptiondetails: MarkdownDescriptionDetails,
  };

  return (
    <ReactMarkdown
      className="text-lg leading-8"
      renderers={renderers}
      plugins={[remarkGfm, remarkMath, deflist]}
      allowDangerousHtml
    >
      {props.children}
    </ReactMarkdown>
  );
}
