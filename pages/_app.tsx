import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title key="title">Jason Gedge</title>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
