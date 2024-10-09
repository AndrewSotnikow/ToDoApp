import { createClassName } from '#libraries/dom/createClassName';
import { SVGAttributes, FC } from 'react';
import { createNameSpace } from '#libraries/dom/createNameSpace';

export type CheckIconProps = {
  native?: SVGAttributes<HTMLOrSVGElement>;
};

export const CheckIcon: FC<CheckIconProps> = ({ native = {} }) => {
  return (
    <svg
      {...native}
      height={native?.height || 7}
      width={native?.width || 7}
      className={createClassName([
        ns.root(),
        'icon', native.className || '',
      ])}
      viewBox="0 0 10 9"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M3.31476 8.35849L0.132954 4.94149C-0.044318 4.75349 -0.044318 4.44749 0.132954 4.25749L0.775678 3.57449C0.95295 3.38649 1.24113 3.38649 1.4184 3.57449L3.63657 5.96649L8.5811 0.641488C8.75837 0.453488 9.04655 0.453488 9.22382 0.641488L9.86655 1.32549C10.0438 1.51349 10.0438 1.82049 9.86655 2.00749L3.95748 8.35849C3.78021 8.54649 3.49203 8.54649 3.31476 8.35849Z" />
    </svg>
  );
};

const ns = createNameSpace(Object.keys({ CheckIcon })[0]);
