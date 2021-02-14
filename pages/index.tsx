import fs from "fs";
import { GetStaticProps } from "next";
import React from "react";
import { Layout } from "../lib/components/Layout";
import { PostList } from "../lib/components/PostList";
import allPosts, { PostData } from "../lib/posts";
import generateRssFeed from "../lib/rss";

export default function Home(props: { posts: PostData[] }) {
  return (
    <Layout description="Jason Gedge's blog index">
      <PostList posts={props.posts} />
    </Layout>
  );
}

export const config = {
  unstable_runtimeJS: false,
};

export const getStaticProps: GetStaticProps = async (_context) => {
  const posts = await allPosts();
  const rss = generateRssFeed(posts);

  fs.writeFileSync("./public/feed.xml", rss);

  return { props: { posts } };
};
