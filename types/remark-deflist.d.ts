declare module "remark-deflist" {
  import { Plugin } from "unified"; // eslint-disable-line import/no-extraneous-dependencies

  declare const remarkDeflist: Plugin<[]>;

  export = remarkDeflist;
}
