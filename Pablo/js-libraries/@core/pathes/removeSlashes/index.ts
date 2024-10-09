export const removeSlashes = (
  str: string,
  settings?: {
    slash?: '/' | '\\',
    position?: 'start' | 'end' | 'both',
  },
) => {
  const {
    slash = '/',
    position = 'both',
  } = settings || {};

  if (str?.trim?.()?.length > 1) {
    let result = str.trim();

    if (
      (position === 'start' || position === 'both')
      && str[0] === slash
    ) {
      result = result.substring(1);
    }

    if (
      (position === 'end' || position === 'both')
      && str[str.length - 1] === slash
    ) {
      result = result.slice(0, str.length - 1);
    }

    return result;
  }

  return '';
};
