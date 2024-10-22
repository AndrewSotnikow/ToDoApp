import { SVGAttributes, FC } from 'react';
import { createClassName } from '#libraries/dom/createClassName';
import { createNameSpace } from '#libraries/dom/createNameSpace';

export type CrossIconProps = {
  native?: SVGAttributes<HTMLOrSVGElement>;
};

export const CrossIcon: FC<CrossIconProps> = ({ native = {} }) => (
    <svg
      {...native}
      height={native?.height || 7}
      width={native?.width || 7}
      className={createClassName([ns.root(), 'icon', native.className || ''])}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M14.1454 0.318191L8 6.46364L1.85455 0.318191C1.65082 0.114457 1.3745 5.49446e-07 1.08637 5.49446e-07C0.798248 5.49446e-07 0.521925 0.114457 0.318191 0.318191C0.114457 0.521926 0 0.798248 0 1.08637C0 1.3745 0.114457 1.65082 0.318191 1.85455L6.46364 8L0.318191 14.1454C0.114457 14.3492 0 14.6255 0 14.9136C0 15.2018 0.114457 15.4781 0.318191 15.6818C0.521925 15.8855 0.798248 16 1.08637 16C1.3745 16 1.65082 15.8855 1.85455 15.6818L8 9.53636L14.1454 15.6818C14.3492 15.8855 14.6255 16 14.9136 16C15.2018 16 15.4781 15.8855 15.6818 15.6818C15.8855 15.4781 16 15.2018 16 14.9136C16 14.6255 15.8855 14.3492 15.6818 14.1454L9.53636 8L15.6818 1.85455C15.8855 1.65082 16 1.3745 16 1.08637C16 0.798248 15.8855 0.521926 15.6818 0.318191C15.4781 0.114457 15.2018 0 14.9136 0C14.6255 0 14.3492 0.114457 14.1454 0.318191Z" />
    </svg>
);

const ns = createNameSpace(Object.keys({ CrossIcon })[0]);