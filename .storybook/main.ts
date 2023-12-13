import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['./stories/*.stories.@(ts|tsx)', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
  // viteFinal: (config) => {
  //   config.resolve.alias = {
  //     react: 'preact/compat',
  //     'react-dom': 'preact/compat'
  //   };
  //   return config;
  // }
};
export default config;
