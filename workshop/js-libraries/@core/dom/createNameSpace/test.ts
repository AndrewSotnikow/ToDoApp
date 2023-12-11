// npx jest -i @core/dom/createNameSpace/test.ts
import { createNameSpace } from './index';

test(`${createNameSpace.name} test`, async () => {
  const ns = createNameSpace('ROOtCLass');

  expect(ns().root).toEqual('r-o-ot-c-lass');
  expect(ns('child').value)
    .toEqual('r-o-ot-c-lass--child');
  expect(
    ns('child1', 'id0')('child2')('child3').value
  ).toEqual(`r-o-ot-c-lass--child1--child2--child3`);
  expect(ns['id0']('child4').value)
    .toEqual('r-o-ot-c-lass--child1--child4');
  expect(ns['123']('child4').value)
    .toEqual('r-o-ot-c-lass--child4');

  // const ns2 = createNameSpace('rootClass', ['' ... ]);
  // TODO add test
  // test case with separators
  // test case with third argument (separator in place) -> ns('child1', 'id0', ' ...')
});
