import { flatMap, uniq } from "lodash";
import React from "react";
import { Layout } from "../../../lib/components/Layout";
import { PostList } from "../../../lib/components/PostList";
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

export async function getStaticProps({ params }) {
  return { props: { tag: params.tag, posts: await posts(params.tag) } };
}

export async function getStaticPaths(_context) {
  const tags = uniq(flatMap(await allPosts(), "tags"));
  const paths = tags.map((tag) => ({ params: { tag: tag } }));
  return { paths, fallback: false };
}
