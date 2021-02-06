import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    const gaScript = `
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-34893540-1']);
      _gaq.push(['_setDomainName', 'gedge.ca']);
      _gaq.push(['_setAllowLinker', true]);
      _gaq.push(['_trackPageview']);

      (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    `;

    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />

          <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico" />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
            rel="stylesheet"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS feed for my blog posts"
            href="/rss.xml"
          />

          <meta name="author" content="Jason Gedge" />

          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

          <script src="/vendor/js/jquery.min.js"></script>
          <script src="/vendor/js/snap.svg-min.js"></script>

          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: gaScript }}></script>
        </Head>

        <body className="h-screen max-h-screen min-h-screen font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
