import { find, isNil } from "lodash";
import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import Error from "next/error";
import React from "react";
import { Presentation as Layout } from "../../../lib/layouts/Presentation";
import allPresentations, { PresentationData } from "../../../lib/presentations";

export default function Presentation(props: { presentation?: PresentationData | null }) {
  if (isNil(props.presentation)) {
    return <Error statusCode={404} />;
  }

  return <Layout presentation={props.presentation}></Layout>;
}

export const config = {
  unstable_runtimeJS: false,
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const presentation =
    find(await allPresentations(), { year: params?.year, slug: params?.slug }) ?? null;
  return { props: { presentation } };
}

export async function getStaticPaths(_context: GetStaticPathsContext) {
  const presentations = await allPresentations();
  const paths = presentations.map((presentation) => ({
    params: {
      year: presentation.year,
      slug: presentation.slug,
    },
  }));
  return { paths, fallback: false };
}
