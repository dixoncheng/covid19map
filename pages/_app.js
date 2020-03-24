// import App from 'next/app'
import { ThemeProvider, createGlobalStyle, css } from "styled-components";

function MyApp({ Component, pageProps }) {
  const theme = {
    font: '"Nunito", sans- serif',
    teal: "#51b6b0",
    green: "#aacd6e",
    light: "#edf3f0",
    dark: "#204e61",
    sm: "700px",
    md: "800px",
    fontFancy: "'Bowlby One', cursive"
  };
  return (
    <ThemeProvider theme={theme}>
      <Styles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;

const Styles = createGlobalStyle`
  ${({ theme }) => css`
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: "Nunito", sans-serif;
      background: ${theme.light};
    }
    button {
      cursor: pointer;
    }
  `}
`;
