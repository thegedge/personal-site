import { findIndex, isNil } from "lodash";
import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import Error from "next/error";
import Head from "next/head";
import React from "react";
import { Link } from "../../lib/components/Link";
import Markdown from "../../lib/components/Markdown";
import { PostPublishedAndMetadata } from "../../lib/components/PostList";
import { Layout } from "../../lib/layouts/Layout";
import posts, { PostData } from "../../lib/posts";

export default function Post(props: {
  post?: PostData | null;
  newer?: PostData | null;
  older?: PostData | null;
}) {
  if (isNil(props.post)) {
    return <Error statusCode={404} />;
  }

  return (
    <Layout title={props.post.title} description={props.post.description}>
      <div className="px-4">
        <h1 className="my-2">{props.post.title}</h1>
        <PostPublishedAndMetadata post={props.post} />
        <article className="text-lg leading-8 md:text-xl md:leading-10">
          <Markdown offsetHeadings={1}>{props.post.markdown}</Markdown>
        </article>
      </div>
      <div className="flex mt-6 px-4 pt-4 border-t-1 gap-x-4">
        {props.newer && (
          <div className="flex-1">
            <Head>
              <link rel="next" href={`/blog/${props.newer.slug}`} />
            </Head>
            <Link href={`/blog/${props.newer.slug}`}>‹ Newer: {props.newer.title}</Link>
          </div>
        )}
        {props.older && (
          <div className="flex-1 text-right">
            <Head>
              <link rel="prev" href={`/blog/${props.older.slug}`} />
            </Head>
            <Link href={`/blog/${props.older.slug}`}>Older: {props.older.title} ›</Link>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const config = {
  unstable_runtimeJS: false,
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const allPosts = await posts();
  const postIndex = findIndex(allPosts, { slug: params?.slug?.toString() });

  return {
    props: {
      post: allPosts[postIndex] || null,
      newer: allPosts[postIndex - 1] || null,
      older: allPosts[postIndex + 1] || null,
    },
  };
}

export async function getStaticPaths(_context: GetStaticPathsContext) {
  const allPosts = await posts();
  const paths = allPosts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return { paths, fallback: false };
}
