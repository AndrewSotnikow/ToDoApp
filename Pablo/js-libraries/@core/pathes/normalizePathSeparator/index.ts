export const normalizePathSeparator = (
  originalPath: string,
  separator = '/',
) => {
  const regex = /[\\/]/g;
  return originalPath.replace(regex, separator);
};
