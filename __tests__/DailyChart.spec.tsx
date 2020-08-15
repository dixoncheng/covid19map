import React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import DailyChart from "components/DailyChart";
import data from "./main.json";
// @ts-ignore
import theme from "lib/theme.ts";

test("Displays a daily cases graph", () => {
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <DailyChart summary={data.summary} />
    </ThemeProvider>
  );
  setTimeout(() => {
    expect(wrapper.find(".recharts-line").length).toBeGreaterThan(0);
  }, 10);
});
