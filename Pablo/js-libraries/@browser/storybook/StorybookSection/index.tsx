import { CSSProperties, FC, Children } from 'react';
import { StorybookSectionProps } from './types';

const wrapElemName = (
  elemName: string,
  style?: {
    isError?: boolean,
  },
) => {
  let readyElemName = elemName;
  let readyStyle: CSSProperties | null = null;
  if (style?.isError) {
    readyStyle = {
      color: 'red',
    };
    readyElemName = 'ERROR';
  }

  // eslint-disable-next-line no-bitwise
  const key = `${readyElemName}--${(Math.random() * 1000) | 0}`;

  return readyStyle
    ? <span key={key} style={readyStyle}>{readyElemName}</span>
    : <span key={key}>{readyElemName}</span>;
};

const getClassNames = (
  componentsNames: StorybookSectionProps['componentsNames'],
  children: StorybookSectionProps['children'],
) => {
  let result = [];
  if (componentsNames && componentsNames.length) {
    result = componentsNames.map((name) => {
      return name
        ? wrapElemName(name)
        : wrapElemName(name, { isError: true });
    });
  } else {
    result = Children.toArray(children).map((child) => {
      // @ts-ignore
      return child?.type?.displayName || child?.type?.name;
    })
      .filter(Boolean)
      .map((name) => wrapElemName(name));
  }
  return result.reduce((res, elem, index) => {
    if (index !== 0) {
      res.push(', ');
    }
    res.push(elem);
    return res;
  }, [] as any[]);
};

export const StorybookSection: FC<StorybookSectionProps> = ({
  children,
  componentsNames,
}) => {
  return (
    <>
      <div className="storybook--section storybook--section--components-names">
        [{getClassNames(componentsNames, children)}]
      </div>
      {children && <section className="storybook--section" style={{ width: '100%' }}>
        {children}
      </section>}
    </>
  );
};
