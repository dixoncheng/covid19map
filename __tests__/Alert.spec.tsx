import React from "react";
import { mount } from "enzyme";
import Alert from "components/Alert";
import data from "./news.json";

test("Displays alert text", () => {
  const wrapper = mount(<Alert data={data.news} />);
  expect(wrapper.html()).toMatch(data.news);
});
