import React from "react";
import { mount } from "enzyme";
import Genders from "components/Genders";
import data from "./main.json";

describe('Gender percentages', () => {
  const wrapper = mount(<Genders genders={data.genders} />);
  const male = wrapper.find(".female strong");
  const female = wrapper.find(".male strong");
  test("male percentage is greater than zero", () => {
    expect(parseInt(male.text())).toBeGreaterThan(0);
  });
  test("female percentage is greater than zero", () => {
    expect(parseInt(female.text())).toBeGreaterThan(0);
  });
})
