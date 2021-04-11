import { Plugin, Transformer } from "unified";
import { Parent } from "unist";
import visit from "unist-util-visit";
import { MarkdownNode } from "../markdown";

// Turn link references into actual links

interface LinkData {
  label: string | null;
  title: string | null;
  url: string;
}

function collectDefinitions(defs: Record<string, LinkData>) {
  return (node: MarkdownNode, _index: number, _parent?: Parent) => {
    const url = node.url as string;
    defs[node.identifier as string] = {
      url,
      title: (node.title || null) as string | null,
      label: (node.label || null) as string | null,
    };
  };
}

function linkReferenceToLinks(defs: Record<string, LinkData>) {
  return (node: MarkdownNode, index: number, parent?: Parent) => {
    const def = defs[node.identifier as string];
    if (parent && def) {
      const linkNode: MarkdownNode = {
        type: "link",
        url: def.url,
        title: node.title || def.title,
        label: node.label || def.label,
        children: node.children,
      };

      if (node.position) {
        linkNode.position = node.position;
      }

      if (node.data) {
        linkNode.data = node.data;
      }

      parent.children[index] = linkNode;
    }
  };
}

const replaceLinkReferences: Plugin = () => {
  const transformer: Transformer = (tree, _file) => {
    const defs: Record<string, LinkData> = {};
    visit(tree, "definition", collectDefinitions(defs));
    visit(tree, "linkReference", linkReferenceToLinks(defs));
  };

  return transformer;
};

export default replaceLinkReferences;
