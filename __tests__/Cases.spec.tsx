import React from "react";
import { mount } from "enzyme";
import Cases from "components/Cases";
import data from "./main.json";

const { confirmedTotal, probableTotal, combinedTotal } = data.summary[
  data.summary.length - 1
];

test("Displays case summary numbers", () => {
  const wrapper = mount(
    <Cases
      confirmedTotal={confirmedTotal}
      probableTotal={probableTotal}
      combinedTotal={combinedTotal}
    />
  );
  expect(wrapper.text()).toMatch(confirmedTotal.toString());
  expect(wrapper.text()).toMatch(probableTotal.toString());
  expect(wrapper.text()).toMatch(combinedTotal.toString());
});
