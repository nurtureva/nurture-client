import { Button } from '@/components';
import { ButtonProps } from '@/types';

export default {
  title: 'Button',
  component: Button
};

const Template = (args: ButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  children: 'this is a test'
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  children: 'this is a test'
};
export const Search = Template.bind({});
Search.args = {
  type: 'primary',
  icon: 'search',
  children: 'Search'
};

export const Icon = Template.bind({});
Icon.args = {
  type: 'primary',
  icon: 'email'
};
export const IconSecondary = Template.bind({});
IconSecondary.args = {
  type: 'secondary',
  icon: 'email'
};
