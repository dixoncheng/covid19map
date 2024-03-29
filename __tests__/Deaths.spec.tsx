import React from 'react';
import { mount } from 'enzyme';
import Deaths from 'components/Deaths';
import data from './main.json';

const { deathsTotal } = data.summary[data.summary.length - 1];

describe('Deaths graphic', () => {
  it('displays number of deaths', () => {
    const wrapper = mount(<Deaths deathsTotal={deathsTotal} />);
    expect(wrapper.text()).toMatch(deathsTotal.toString());
  });
});
