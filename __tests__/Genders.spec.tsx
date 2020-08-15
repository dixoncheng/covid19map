import React from "react";
import { mount } from "enzyme";
import Genders from "components/Genders";
import data from "./main.json";

test("Displays gender percentages", () => {
  const wrapper = mount(<Genders genders={data.genders} />);
  expect(wrapper.find("strong")).toMatch(`<strong>${1}</strong> women`);
});
