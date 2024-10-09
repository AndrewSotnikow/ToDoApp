import { FC } from 'react';
import { StorybookHeaderProps } from './types';

export const StorybookHeader: FC<StorybookHeaderProps> = ({ children }) => {
  return (
    <h3
      style={{
        fontSize: '1.02rem',
        marginTop: '35px',
        marginBottom: '10px',
      }}
      className="storybook--header"
    >
      ∘ {children}
    </h3>
  );
};
