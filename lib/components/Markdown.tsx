import { isArray, pick } from "lodash";
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

const MarkdownParagraph = (props: { children: React.ReactNode }) => {
  return <p className="px-4 my-4" {...props} />;
};

const MarkdownCode = (props: { language: string; value: string }) => {
  return (
    <div className="mx-4 md:mx-12 text-sm font-mono">
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

const MarkdownImage = (props: { className?: string; alt: string; src: string }) => {
  // const ref = React.useRef<HTMLElement>();
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
          images.push(...node.props.children.filter((ch) => ch.type == MarkdownImage));
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

        // TODO better way of making images line up nicely
        const imgClassName = images.length > 1 ? "max-h-64" : "";

        return (
          <figure className="mx-8 lg:mx-16">
            <div className={gridClassName}>
              {images.map((img) => (
                <MarkdownImage
                  className={`${imgClassName} ${img.props.className}`}
                  {...pick(img.props, "alt", "src")}
                />
              ))}
            </div>
            {caption.length > 0 && (
              <figcaption className="font-semibold text-sm italic">{caption}</figcaption>
            )}
          </figure>
        );
      }
    }
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
    paragraph: MarkdownParagraph,
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

  let additionalClasses = "";
  if (props.children.match(/^> (?:note|aside): /m)) {
    additionalClasses = "pr-48";
  }

  return (
    <ReactMarkdown
      className={`text-lg leading-8 ${additionalClasses}`}
      renderers={renderers}
      plugins={[remarkGfm, remarkMath, deflist]}
      allowDangerousHtml
    >
      {props.children}
    </ReactMarkdown>
  );
}
