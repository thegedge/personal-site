declare module "@github-docs/frontmatter" {
  declare interface Frontmatter<T extends Record<string, any>> {
    content: string;
    data: T;
  }

  declare const frontmatter: <T = Record<string, any>>(content: string) => Frontmatter<T>;

  export = frontmatter;
}
