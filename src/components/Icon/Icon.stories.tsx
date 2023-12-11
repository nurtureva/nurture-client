import { Icon } from '@/components';

export default {
  title: 'Icon',
  component: Icon
};

const Template = (args) => <Icon {...args} />;

export const Email = Template.bind({});
Email.args = {
  type: 'email'
};
