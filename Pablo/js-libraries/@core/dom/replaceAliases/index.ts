import { Mappings } from './types';

export const replaceAliases = (
  content: string,
  mappings: Mappings,
) => {
  let result = content;
  Object.keys(mappings).forEach((alias) => {
    if (result.indexOf(alias) > -1) {
      result = result.replace(
        new RegExp(alias, 'g'),
        mappings[alias],
      );
    }
  });
  return result;
};
