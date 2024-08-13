import { Plugin } from 'vite';

export const transformContentPlugin = (
  settings: {
    enforce: Plugin['enforce'],
    transform: Plugin['transform'],
    generateBundle?: Plugin['generateBundle'],
  },
): Plugin => {
  return {
    name: 'transform-content-plugin',
    enforce: settings.enforce,
    transform: settings.transform,
    generateBundle: settings.generateBundle,
  };
};
