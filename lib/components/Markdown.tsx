import { isArray, isNil, isString, pick } from "lodash";
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
import { KeyCounter, useCounter } from "../counter";
import { Alignment, MarkdownData, MarkdownNodes } from "../markdown";
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

const tailwindAlignment = (align?: Alignment) => {
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

const MarkdownHeading = (props: { offset: number; level: number; children: React.ReactNode }) => {
  let className = "flex place-items-center -mx-6";
  let ruleClassName = "bg-primary-100";
  switch (props.level) {
    case 1:
      className += " mt-8";
      ruleClassName += " h-1";
      break;
    case 2:
      className += " mt-8";
      ruleClassName += " h-0.5";
      break;
    case 3:
      ruleClassName += " h-px";
      break;
    case 4:
      ruleClassName = "hidden";
      break;
  }

  const children = [
    <div key={1} className={`w-4 mr-2 ${ruleClassName}`} />,
    <div key={2} className="flex-initial">
      {props.children}
    </div>,
    <div key={3} className={`flex-1 mx-2 ${ruleClassName}`} />,
  ];

  const headings = ["h1", "h2", "h3", "h4", "h5", "h6"].slice(props.offset);
  return createElement(headings[props.level - 1], { className }, children);
};

const MarkdownParagraph = (props: { children: React.ReactNode }) => {
  return <p className="my-4">{props.children}</p>;
};

const MarkdownCode = (props: { language: string; value: string }) => {
  const className = "text-sm my-4 leading-0 md:text-base md:leading-4";
  if (isNil(props.language)) {
    return <code className={`${className}`}>{props.value}</code>;
  }

  const [language, nolines] = props.language.split("--", 2);
  return (
    <div className={className}>
      <SyntaxHighlighter
        language={language}
        style={syntaxTheme}
        showLineNumbers={nolines !== "nolines"}
      >
        {props.value}
      </SyntaxHighlighter>
    </div>
  );
};

const MarkdownInlineCode = (props: { children: React.ReactNode }) => {
  return <code className="inline p-1 bg-primary-100 rounded-lg">{props.children}</code>;
};

const MarkdownImage = (props: { className?: string; alt: string; src: string }) => {
  if (props.src.match(/https:\/\/www.youtube.com\/embed\/\w+/)) {
    return (
      <div className="embed-container">
        <iframe src={props.src} frameBorder="0" allowFullScreen></iframe>
      </div>
    );
  }

  return (
    <a href={props.src}>
      <img
        src={props.src}
        alt={props.alt}
        className={`mx-auto text-center italic text-primary-500 ${
          props.className || "my-4 w-full"
        }`}
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

          const imgClassName = images.length > 1 ? "" : "w-full";

          return (
            <figure className="my-4">
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
  return (
    <KeyCounter prefix="dl">
      <dl className="grid grid-cols-deflist gap-x-4 gap-y-4 ml-8 mr-16">{props.children}</dl>
    </KeyCounter>
  );
};

const MarkdownDescriptionTerm = (props: { children: React.ReactNode }) => {
  const key = useCounter();
  return (
    <dt key={key} className="font-bold text-right">
      {props.children}
    </dt>
  );
};

const MarkdownDescriptionDetails = (props: { children: React.ReactNode }) => {
  const key = useCounter();
  return <dd key={key}>{props.children}</dd>;
};

const MarkdownTable = (props: { children: React.ReactNode }) => {
  return (
    <KeyCounter prefix="table">
      <table className="mx-auto border-1 border-primary-50">{props.children}</table>
    </KeyCounter>
  );
};

const MarkdownTableRow = (props: { isHeader?: boolean; children: React.ReactNode }) => {
  let className = "even:bg-primary-50";
  if (props.isHeader) {
    className = "font-bold bg-primary-200";
  }

  const key = useCounter();
  return (
    <KeyCounter prefix="row">
      <tr key={key} className={className}>
        {props.children}
      </tr>
    </KeyCounter>
  );
};

const MarkdownTableCell = (props: {
  isHeader?: boolean;
  align?: Alignment | null;
  children: React.ReactNode;
}) => {
  const key = useCounter();
  return (
    <td key={key} className={`px-4 py-2 ${tailwindAlignment(props.align)}`}>
      {props.children}
    </td>
  );
};

const MarkdownInlineMath = (props: { value: string }) => {
  const value = `$${props.value}$`;
  return <Latex className="border-black">{value}</Latex>;
};

const MarkdownList = (props: { nested: boolean; ordered?: boolean; children: React.ReactNode }) => {
  let listType;
  if (props.ordered) {
    listType = "ol";
  } else {
    listType = "ul";
  }

  const className = props.nested ? "ml-8" : "ml-8 my-4";

  const list = createElement(listType, {
    className,
    children: props.children,
  });
  return <KeyCounter prefix={listType}>{list}</KeyCounter>;
};

const MarkdownListItem = (props: { children: React.ReactNode }) => {
  const key = useCounter();
  return <li key={key}>{props.children}</li>;
};

const MarkdownMath = (props: { value: string }) => {
  const value = `$$${props.value}$$`;
  return (
    <Latex className="border-black" displayMode={true}>
      {value}
    </Latex>
  );
};

const MarkdownRoot = (props: { children: React.ReactNode }) => {
  return <>{props.children}</>;
};

function astToReact(node: MarkdownNodes, offsetHeadings: number, index = 0): React.ReactNode {
  let children: React.ReactNode = [];
  if ("children" in node && isArray(node.children)) {
    children = (node.children as MarkdownNodes[]).map((c, index) =>
      astToReact(c, offsetHeadings, index)
    );
  }

  switch (node.type) {
    case "blockquote":
      return <MarkdownBlockQuote key={index}>{children}</MarkdownBlockQuote>;
    case "code":
      return <MarkdownCode key={index} language={node.lang} value={node.value} />;
    case "definition":
      return <></>;
    case "descriptiondetails":
      return <MarkdownDescriptionDetails key={index}>{children}</MarkdownDescriptionDetails>;
    case "descriptionlist":
      return <MarkdownDescriptionList key={index}>{children}</MarkdownDescriptionList>;
    case "descriptionterm":
      return <MarkdownDescriptionTerm key={index}>{children}</MarkdownDescriptionTerm>;
    case "emphasis":
      return <em key={index}>{children}</em>;
    case "heading":
      return (
        <MarkdownHeading key={index} offset={offsetHeadings} level={node.depth}>
          {children}
        </MarkdownHeading>
      );
    case "html":
      return <div key={index} dangerouslySetInnerHTML={{ __html: node.value }} />;
    case "image":
      return <MarkdownImage key={index} src={node.url} alt={node.alt} />;
    case "inlineCode":
      return <MarkdownInlineCode>{node.value}</MarkdownInlineCode>;
    case "inlineMath":
      return <MarkdownInlineMath key={index} value={node.value} />;
    case "link":
      return (
        <MarkdownLink key={index} href={node.url}>
          {children}
        </MarkdownLink>
      );
    case "list":
      return (
        <MarkdownList key={index} ordered={node.ordered} nested={node.depth > 0}>
          {children}
        </MarkdownList>
      );
    case "listItem":
      return <MarkdownListItem key={index}>{children}</MarkdownListItem>;
    case "math":
      return <MarkdownMath key={index} value={node.value} />;
    case "paragraph":
      return <MarkdownParagraph key={index}>{children}</MarkdownParagraph>;
    case "root":
      return <MarkdownRoot key={index}>{children}</MarkdownRoot>;
    case "strong":
      return <strong key={index}>{children}</strong>;
    case "table":
      return <MarkdownTable key={index}>{children}</MarkdownTable>;
    case "tableBody":
      return <tbody key={index}>{children}</tbody>;
    case "tableCell":
      return (
        <MarkdownTableCell key={index} align={node.align} isHeader={node.isHeader}>
          {children}
        </MarkdownTableCell>
      );
    case "tableHead":
      return (
        <thead key={index} className="bg-primary-200 font-bold">
          {children}
        </thead>
      );
    case "tableRow":
      return (
        <MarkdownTableRow key={index} isHeader={node.isHeader}>
          {children}
        </MarkdownTableRow>
      );
    case "text":
      return node.value;
    case "thematicBreak":
      return <hr key={index} className="my-4" />;
    default:
      throw new Error(JSON.stringify(node, null, 2));
  }
}

export default function Markdown(props: { offsetHeadings?: number; children: MarkdownData }) {
  return <>{astToReact(props.children.node, props.offsetHeadings || 0)}</>;
}
