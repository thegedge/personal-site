import { GetStaticProps } from "next";
import React from "react";
import { Presentation as Layout } from "../../../../lib/layouts/Presentation";
import { MarkdownData } from "../../../../lib/markdown";
import { getStaticPresentationProps } from "../../../../lib/presentations";

export default function Presentation(props: { slides: MarkdownData[] }) {
  return <Layout>{props.slides}</Layout>;
}

export const getStaticProps: GetStaticProps = async (_context) => {
  return getStaticPresentationProps(
    "pages/presentations/2018/Constructing_A_Call_Graph_With_Tracepoint/presentation.md"
  );
};

export const config = {
  unstable_runtimeJS: false,
};
