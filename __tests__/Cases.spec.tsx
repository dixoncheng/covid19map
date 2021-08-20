import React from 'react';
import { mount } from 'enzyme';
import Cases from 'components/Cases';
import data from './main.json';

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
  it('has confirmed number matches the data', () => {
    expect(wrapper.text()).toMatch(confirmedTotal.toString());
  });
  it('has probable number matches the data', () => {
    expect(wrapper.text()).toMatch(probableTotal.toString());
  });
  it('has combined number matches the data', () => {
    expect(wrapper.text()).toMatch(combinedTotal.toString());
  });
});
