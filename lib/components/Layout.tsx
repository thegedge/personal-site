import Head from "next/head";
import React from "react";
import { Body } from "./Body";
import Footer from "./Footer";
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

      <div className="flex flex-col min-h-screen divide-y divide-primary-200">
        <div className="flex flex-1 flex-col divide-y divide-primary-200 p-4 lg:divide-y-0 lg:flex-row xl:container lg:mx-auto lg:pb-0 w-full">
          <Header className="flex-0 mx-auto lg:max-w-1/4 w-full" />
          <Body className="flex-1 px-4 lg:max-w-3/4 overflow-x-hidden" {...props} />
        </div>
        <Footer className="flex-0 text-center text-sm text-primary-400 mx-auto py-4 bg-primary-100 w-full" />
      </div>
    </>
  );
};
