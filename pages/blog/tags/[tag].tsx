import { flatMap, uniq } from "lodash";
import React from "react";
import { PostList } from "../../../lib/components/PostList";
import { Layout } from "../../../lib/layouts/Layout";
import allPosts, { PostData } from "../../../lib/posts";

export default function PostsByTag(props: { tag: string; posts: PostData[] }) {
  return (
    <Layout
      description={`Jason Gedge's blog (posts by tag ${props.tag})`}
      title={`Blog (by tag ${props.tag})`}
    >
      <h1>Posts for tag `{props.tag}`</h1>
      <PostList posts={props.posts} />
    </Layout>
  );
}

const posts = async (tag: string) => {
  const posts = await allPosts();
  return posts.filter((post) => post.tags.includes(tag));
};

export const config = {
  unstable_runtimeJS: false,
};

export async function getStaticProps({ params }: any) {
  return { props: { tag: params.tag, posts: await posts(params.tag) } };
}

export async function getStaticPaths(_context: any) {
  const tags = uniq(flatMap(await allPosts(), "tags"));
  const paths = tags.map((tag) => ({ params: { tag: tag } }));
  return { paths, fallback: false };
}
