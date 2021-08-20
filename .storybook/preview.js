import { ThemeProvider } from "styled-components";
import { Styles } from "pages/_app";

// @ts-ignore
import theme from "lib/theme.ts";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Bowlby+One&display=swap"
        rel="stylesheet"
      />
      <ThemeProvider theme={theme}>
        <Styles />
        <Story />
      </ThemeProvider>
    </>
  ),
];
