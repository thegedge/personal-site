import { ceil, map, some, sum } from "lodash";
import moment from "moment";
import { GetStaticProps } from "next";
import React from "react";
import { BsCalendar, BsClock } from "react-icons/bs";
import { HorizontalList, VerticalList } from "../../lib/components/List";
import { Layout } from "../../lib/layouts/Layout";
import allPresentations, { PresentationData } from "../../lib/presentations";

export default function Presentations(props: { presentations: PresentationData[] }) {
  return (
    <Layout title="Presentations" description="An index for Jason Gedge's presentations">
      <VerticalList>
        {props.presentations.map((presentation) => {
          let readingTime: number | null = null;
          if (some(presentation.slides, "node.readingTime")) {
            readingTime = sum(map(presentation.slides, "node.readingTime"));
          }

          return (
            <p className="text-left w-full" key={`${presentation.year}-${presentation.slug}`}>
              <a
                href={`/presentations/${presentation.year}/${encodeURIComponent(
                  presentation.slug
                )}`}
                className="text-xl"
              >
                {presentation.title}
              </a>
              <HorizontalList border spacing={2} className="my-0">
                <p className="text-primary-400">
                  <BsCalendar className="align-baseline" />{" "}
                  <time dateTime={presentation.presented}>
                    {moment(presentation.presented).format("LL")}
                  </time>
                </p>
                {readingTime && (
                  <p className="font-thin text-primary-400 pl-2">
                    <BsClock className="align-baseline" /> {ceil(readingTime)} minute read
                  </p>
                )}
              </HorizontalList>
            </p>
          );
        })}
      </VerticalList>
    </Layout>
  );
}

// TODO can we make this the default?
export const config = {
  unstable_runtimeJS: false,
};

export const getStaticProps: GetStaticProps = async (_context) => {
  const presentations = await allPresentations();
  return { props: { presentations } };
};
