import Head from "next/head";
import React from "react";
import { Body } from "./Body";
import { Header } from "./Header";

export const Layout = (props: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) => {
  return (
    <>
      <Head>
        <title key="title">Jason Gedge{props.title && ` - ${props.title}`}</title>
        {props.description && <meta name="description" content={props.description} />}
      </Head>

      {/* <div className="flex flex-col"> */}
      <div className="flex flex-1 flex-col p-4 md:flex-row xl:container xl:mx-auto">
        <Header className="flex-0 mx-auto max-w-1/4" />
        <Body className="flex-1 px-4 max-w-3/4 overflow-x-hidden" {...props} />
      </div>
      {/* <footer className="flex-0">test</footer> */}
      {/* </div> */}
    </>
  );
};
