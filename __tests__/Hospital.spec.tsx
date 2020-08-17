import React from "react";
import { mount } from "enzyme";
import Hospital from "components/Hospital";
import data from "./main.json";

const { hospitalTotal } = data.summary[data.summary.length - 1];

test("Displays number of hospital patients", () => {
  const wrapper = mount(<Hospital hospitalTotal={hospitalTotal} />);
  expect(wrapper.text()).toMatch(hospitalTotal.toString());
});
