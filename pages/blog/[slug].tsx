import { findIndex, isNil } from "lodash";
import moment from "moment";
import Error from "next/error";
import Head from "next/head";
import React from "react";
import { Layout } from "../../lib/components/Layout";
import { Link } from "../../lib/components/Link";
import Markdown from "../../lib/components/Markdown";
import posts, { PostData } from "../../lib/posts";

export default function Post(props: { post?: PostData; newer?: PostData; older?: PostData }) {
  if (isNil(props.post)) {
    return <Error statusCode={404} />;
  }

  return (
    <Layout title={props.post.title} description={props.post.description}>
      <time dateTime={props.post.date} className="font-thin italic text-gray-400">
        {moment(props.post.date).format("LL")}
      </time>
      <h1>{props.post.title}</h1>
      <Markdown>{props.post.markdown}</Markdown>
      <div className="flex mt-6 px-8 pt-4 border-t-1">
        {props.newer && (
          <>
            <Head>
              <link rel="next" href={`/blog/${props.newer.slug}`} />
            </Head>
            <Link href={`/blog/${props.newer.slug}`}>‹ Newer: {props.newer.title}</Link>
          </>
        )}
        <div className="flex-1"></div>
        {props.older && (
          <>
            <Head>
              <link rel="prev" href={`/blog/${props.older.slug}`} />
            </Head>
            <Link href={`/blog/${props.older.slug}`}>Older: {props.older.title} ›</Link>
          </>
        )}
      </div>
    </Layout>
  );
}

export const config = {
  unstable_runtimeJS: false,
};

export async function getStaticProps({ params }) {
  const allPosts = await posts();
  const postIndex = findIndex(allPosts, { slug: params.slug });

  let post: PostData;
  if (postIndex != -1) {
    post = allPosts[postIndex];
  }

  return {
    props: {
      post,
      newer: allPosts[postIndex - 1] || null,
      older: allPosts[postIndex + 1] || null,
    },
  };
}

export async function getStaticPaths(_context) {
  const allPosts = await posts();
  const paths = allPosts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return { paths, fallback: false };
}
