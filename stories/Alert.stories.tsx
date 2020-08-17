import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Alert, { IProps } from "components/Alert";
import data from "__tests__/news.json";

export default {
  title: "Alert",
  component: Alert,
} as Meta;

const Template: Story<IProps> = (args) => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: data.news,
};
