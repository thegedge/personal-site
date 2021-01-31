export const externalUrlAccessible = async (url: string) => {
  const response = await fetch(url, { method: "HEAD", redirect: "manual" });
  return response.status >= 200 && response.status < 400;
};

export const isExternalUrl = (url: string) => {
  return url.startsWith("http") || url.startsWith("//");
};
