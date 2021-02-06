import { PostData } from "./posts";

const generateRssItem = (post: PostData) => `
  <item>
    <title>${post.title}</title>
    <link>https://gedge.ca/blog/${post.slug}</link>
    <guid isPermaLink="false">https://gedge.ca/blog/${post.slug}</guid>
    <description>${post.description || ""}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  </item>`;

const generateRssFeed = (posts: PostData[]) => `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Gedge's Blog</title>
  <link href="http://www.gedge.ca/" />
  <copyright>Copyright 2021, Jason Gedge</copyright>
  <description>Ramblings of Jason Gedge</description>
  <language>en</language>
  <pubDate>${new Date(posts[0].date).toUTCString()}</pubDate>
  <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
  <atom:link href="https://gedge.ca/rss.xml" rel="self" type="application/rss+xml"/>
  ${posts.map(generateRssItem).join("")}
</channel>
</rss>
`;

export default generateRssFeed;
