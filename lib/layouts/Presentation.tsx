import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import Markdown from "../components/Markdown";
import { PresentationData } from "../presentations";
import { Layout } from "./Layout";

export const Presentation = (props: { presentation: PresentationData }) => {
  return (
    <Layout title={props.presentation.title} description={props.presentation.description}>
      <div className="my-8 p-8 text-lg font-bold bg-yellow-100 rounded border-yellow-200 border-4 text-yellow-600">
        <IoWarningOutline size={32} /> Presentations are a work in progress. The content is here,
        but "flattened", so it lacks progressive disclosure. <IoWarningOutline size={32} />
      </div>
      <article className="text-lg leading-8 md:text-xl md:leading-10">
        {props.presentation.slides.map((slide, index) => (
          <section className="flex flex-col px-4 my-4 bg-gray-50 border-gray-200 border-1 rounded min-h-128">
            <div className="flex-1">
              <Markdown>{slide}</Markdown>
            </div>
            <div className="flex-0 text-base text-right py-2 text-primary-400">
              {index + 1} / {props.presentation.slides.length}
            </div>
          </section>
        ))}
      </article>
    </Layout>
  );
};
