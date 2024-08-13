import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../**/stories.tsx'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  addons: ['@storybook/addon-essentials'],

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
