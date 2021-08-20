import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import Ages from 'components/Ages';
import data from './main.json';
// @ts-ignore
import theme from 'lib/theme.ts';

describe('Age graph', () => {
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <Ages ages={data.ageRows} />
    </ThemeProvider>
  );
  it('displays an age graph', () => {
    setTimeout(() => {
      expect(wrapper.find('.recharts-bar-rectangle').length).toBeGreaterThan(0);
    }, 10);
  });
});
