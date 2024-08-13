import type { Preview } from '@storybook/react';
// import {
//   settings as createClassNameSettings,
// } from '#libraries/dom/createClassName';
// import {
//   settings as createNameSpaceSettings,
// } from '#libraries/dom/createNameSpace';
// import {
//   settings as transformClassNameSettings,
//   transformClassName,
// } from '#libraries/dom/transformClassName';
import './storybook.sass';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

// createNameSpaceSettings.transformClassName = transformClassName;
// createClassNameSettings.transformClassName = transformClassName;
// transformClassNameSettings.skipped = [
//   'storybook-root',
//   'theme-blue',
// ];

export default preview;
