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

  const ns2 = createNameSpace('rootClass', { separators: ['--', '-'] });
  // TODO add test
  expect(ns2().root).toEqual('r-o-ot-c-lass');

  expect(ns2('child').value).toEqual('root-class__child');
  // Test chaining with different separators
  expect(ns2('child1', 'id1')('child2').value).toEqual('root-class__child1-child2');
  // Test reusing a cache ID with a custom separator
  expect(ns2['id1']('child3').value).toEqual('root-class__child1-child3');
  // Test in-place custom separator
  expect(ns2('child1', 'id2', '__')('child2', undefined, '-').value).toEqual('root-class__child1-child2');
});
