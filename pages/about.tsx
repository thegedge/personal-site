import { orderBy } from "lodash";
import { GetStaticProps } from "next";
import React from "react";
import { Layout } from "../lib/components/Layout";
import Markdown from "../lib/components/Markdown";
import posts, { PostData } from "../lib/posts";

export default function About(props: { posts: PostData[] }) {
  return (
    <Layout title="About Me" description="A few things about me">
      <Markdown>
        {`
The name's **Jason Gedge**, but you've probably already figured that out.
I'm a **problem solver**, with software being my medium of choice. Naturally, that led me to
becoming a **software developer**.

In 2011, I received my **Master of Science** degree in Computing Science from
the University of Alberta. My research took me into the field of **computer
vision**, perhaps one of the fields of research I find most interesting. I also
enjoy dabbling in **computer graphics**, **image processing**, and
**computational photography** (kind of a hybrid of all of the above).  In a
more general sense, I am a big fan of processing and/or producing visual data.

Outside of school and work, I also enjoy _composing music_ and _playing guitar_. In 2015
I became more interested in maintaining better health, so I became a runner. I've since
ran several half-marathons, and aim to run 20km every week. I grew up in the lovely Canadian province of
[Newfoundland and Labrador](https://en.wikipedia.org/wiki/Newfoundland_and_Labrador).
These days I'm working at **Shopify**, previously working for **YouTube**.

If you happen to be interested in me and/or what I do, be sure to check me out on
[GitHub](https://www.github.com/thegedge/), or perhaps even some of
my [Tweeting](https://www.twitter.com/thegedge/).
        `}
      </Markdown>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (_context) => {
  const allPosts = orderBy(await posts(), "date", "desc");
  return { props: { posts: allPosts } };
};
