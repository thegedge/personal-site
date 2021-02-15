import { keyBy, mapValues, min, tail } from "lodash";
import tailwindColors from "tailwindcss/colors";

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

  const minLeadingSpace = min(allStrings.map((s) => s.match(/^\s*/)?.length || 0)) || 0;

  return allStrings.map((s) => s.substr(minLeadingSpace)).join("\n");
};

export interface Color {
  fg: string;
  bg: string;
}

export const stableColors = (data: any[]): Record<string, Color> => {
  let index = 0;
  return mapValues(keyBy(data.sort()), () => {
    const c = index++ % (Object.keys(tailwindColors).length - 2);
    // Too colorful right now
    // return {
    // bg: `bg-tag${c}-500 hover:bg-tag${c}-400`,
    // fg: `text-tag${c}-200 hover:text-tag${c}-100`,
    // };
    return {
      bg: `bg-primary-500 hover:bg-primary-400`,
      fg: `text-primary-200 hover:text-primary-100`,
    };
  });
};

/**
 * Linear interpolation between two values.
 *
 * @param a value 1
 * @param b value 2
 * @param alpha the portion of `a` to contribute
 */
export const lerp = (a: number, b: number, alpha: number) => {
  return a * alpha + (1 - alpha) * b;
};
