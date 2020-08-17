import React from "react";
import { mount } from "enzyme";
import Cases from "components/Cases";
import data from "./main.json";

const { confirmedTotal, probableTotal, combinedTotal } = data.summary[
  data.summary.length - 1
];

describe('Case summary numbers', () => {
  const wrapper = mount(
    <Cases
      confirmedTotal={confirmedTotal}
      probableTotal={probableTotal}
      combinedTotal={combinedTotal}
    />
  );
  test("confirmed number matches the data", () => {
    expect(wrapper.text()).toMatch(confirmedTotal.toString());
  });
  test("probable number matches the data", () => {
    expect(wrapper.text()).toMatch(probableTotal.toString());
  });
  test("combined number matches the data", () => {
    expect(wrapper.text()).toMatch(combinedTotal.toString());
  });
});

