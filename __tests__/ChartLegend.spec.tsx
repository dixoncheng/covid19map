import React from 'react';
import { mount } from 'enzyme';
import ChartLegend from 'components/ChartLegend';

const data = [{ title: 'Active' }, { title: 'Recovered' }, { title: 'Deaths' }];

describe('Chart legend', () => {
  it('displays chart legend labels', () => {
    const wrapper = mount(<ChartLegend items={data} />);
    for (const k in data) {
      expect(wrapper.text()).toMatch(data[k].title);
    }
  });
});
