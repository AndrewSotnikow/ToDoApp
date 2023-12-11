export const toKebabCase = (string: string): string => {
  const skipSymbols = '-0123456789';
  return Array.from(string)
    .reduce((result, symbol) => {
      const index = result.length - 1;
      const partOfString = result[index] || '';

      if (symbol === ' ') {
        return [
          ...result,
          ...(partOfString ? [''] : []),
        ];
      }

      if (
        partOfString
        && symbol.toUpperCase() === symbol
        && !skipSymbols.includes(symbol)
      ) {
        result.push(symbol.toLowerCase());
        return result;
      }

      result[index] = `${result[index]}${symbol.toLowerCase()}`;

      return result;
    }, [''] as string[])
    .join('-');
};
