declare module "mdast-add-list-metadata" {
  import { Plugin } from "unified";

  declare const addListMetadata: Plugin<[]>;

  export = addListMetadata;
}
