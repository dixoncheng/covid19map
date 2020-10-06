import React from 'react';
import { mount } from 'enzyme';
import Alert from 'components/Alert';
import data from './news.json';

describe('Alert bar', () => {
  it('displays the alert text', () => {
    const wrapper = mount(<Alert data={data.news} />);
    expect(wrapper.html()).toMatch(data.news);
  });
});
