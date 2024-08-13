// npx jest -i @core/dom/createNameSpace/test.ts
import { createNameSpace } from './index';

test(`${createNameSpace.name} test`, async () => {
  const ns = createNameSpace('root', {
    separators: ['-', '--', '__'],
  });

  expect(ns.root()).toEqual('root');
  expect(ns.get('id1').child('c11').child('c22').value()).toEqual('root-c11--c22');
  expect(
    ns
      .child('c1')
      .child('c2')
      .child('c3', 'id1')
      .child('c4')
      .value(),
  ).toEqual('root-c1--c2__c3__c4');
  expect(ns.get('id1').child('c11').child('c22').value())
    .toEqual('root-c1--c2__c3-c11--c22');
  expect(ns.get('id1').child('c11', '', '__').child('c22', '', '<').value())
    .toEqual('root-c1--c2__c3__c11<c22');

  const ns1 = createNameSpace('root');
  expect(ns1.child('c1').child('c2').child('c3').value()).toEqual('root--c1--c2--c3');
});
