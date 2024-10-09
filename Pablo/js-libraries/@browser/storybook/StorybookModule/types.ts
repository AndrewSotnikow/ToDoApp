import { FC, ReactNode } from 'react';
import { StorybookHeaderProps } from '#libraries/@browser/storybook/StorybookHeader/types';
import { StorybookSectionProps } from '#libraries/@browser/storybook/StorybookSection/types';

export type StorybookModuleProps = {
  columnsNames: string[];
  contentRender: (
    columnName: string,
    components: {
      Header: FC<StorybookHeaderProps>;
      Section: FC<StorybookSectionProps>;
    },
  ) => ReactNode;
};
