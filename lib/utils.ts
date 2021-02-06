import { min, tail } from "lodash";

export const externalUrlAccessible = async (url: string) => {
  const response = await fetch(url, { method: "HEAD", redirect: "manual" });
  return response.status >= 200 && response.status < 400;
};

export const isExternalUrl = (url: string) => {
  return url.startsWith("http") || url.startsWith("//");
};

export const dedent = (strings: TemplateStringsArray, ...values: any[]) => {
  const allStrings = strings
    .map((string, i) => string + (values[i] || ""))
    .join("")
    .split("\n");

  if (allStrings[0].length == 0) allStrings.shift();
  if (tail(allStrings).length == 0) allStrings.pop();

  const minLeadingSpace = min(allStrings.map((s) => s.match(/^\s*/).length));

  return allStrings.map((s) => s.substr(minLeadingSpace)).join("\n");
};
