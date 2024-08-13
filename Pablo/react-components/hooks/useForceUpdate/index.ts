import { useState, useCallback } from 'react';

export const useForceUpdate = () => {
  const [_, setValue] = useState(0);

  const update = useCallback(() => {
    setValue((prev) => (prev > 9999 ? 1 : prev + 1));
  }, []);

  return update;
};
