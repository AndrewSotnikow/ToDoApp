import {
  mockMutationObserver,
  mockResizeObserver,
} from '#libraries/@node/tests/mocks';

import {
  beLikeBrowser,
  runInServerEnv,
} from '#libraries/@node/tests/envs';

const g = global as any;

mockMutationObserver();
mockResizeObserver();

g.runInServerEnv = runInServerEnv;

beLikeBrowser();
