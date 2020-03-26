import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/icons/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link rel="apple-touch-icon" href="/icons/apple-icon.png"></link>
          <meta name="theme-color" content="#51b6b0" />

          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Bowlby+One&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"
          />
          <link
            href="https://unpkg.com/leaflet-geosearch@latest/assets/css/leaflet.css"
            rel="stylesheet"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-93113-28"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-93113-28');
              `
            }}
          />
          <meta property="og:url" content="https://covid19map.nz/" />
          <meta property="og:title" content="Covid-19 Map NZ" />
          <meta
            property="og:description"
            content="A visual look at the current Covid-19 cases in New Zealand"
          />
          <meta
            property="og:image"
            content="https://covid19map.nz/C19-FBshare2.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:locale" content="en_nz" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
