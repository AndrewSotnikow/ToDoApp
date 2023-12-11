// npx jest -i @core/strings/toKebabCase/test.ts
import { toKebabCase } from './index';

test(`${toKebabCase.name} test`, () => {
  expect(toKebabCase('')).toEqual('');
  expect(toKebabCase(' ')).toEqual('');
  expect(toKebabCase('String')).toEqual('string');
  expect(toKebabCase('String  s /123')).toEqual('string-s-/123');
  expect(toKebabCase('  StringCamel  s 123')).toEqual('string-camel-s-123');
  expect(toKebabCase('someFunction')).toEqual('some-function');
  expect(toKebabCase('some-function-function')).toEqual('some-function-function');
  expect(toKebabCase('some--function--function')).toEqual('some--function--function');
  expect(toKebabCase('soMEFunction')).toEqual('so-m-e-function');
});
