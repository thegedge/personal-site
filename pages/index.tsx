import { GetStaticProps } from "next";
import React from "react";
import { Layout } from "../lib/components/Layout";
import { PostList } from "../lib/components/PostList";
import posts, { PostData } from "../lib/posts";

export default function Home(props: { posts: PostData[] }) {
  return (
    <Layout description="Jason Gedge's blog index">
      <PostList posts={props.posts} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (_context) => {
  return { props: { posts: await posts() } };
};
