// npx jest -i @core/pathes/removeSlashes/test.ts
import { removeSlashes } from './index';

test(`${removeSlashes.name} test`, () => {
  expect(removeSlashes(undefined as any)).toEqual('');
  expect(removeSlashes(' ')).toEqual('');
  expect(removeSlashes('asd')).toEqual('asd');
  expect(removeSlashes('as/d')).toEqual('as/d');
  expect(removeSlashes('as/d/')).toEqual('as/d');
  expect(removeSlashes('asd/')).toEqual('asd');
});
