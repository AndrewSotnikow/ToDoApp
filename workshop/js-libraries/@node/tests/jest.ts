import { Cheerio, load } from '#packages/@modules/cheerio';

export const getElement = (
  htmlString: string,
  selector: string,
) => {
  const el = load(htmlString)(selector);
  expect(el.length > 0).toEqual(true);
  return el;
};

export const checkContent = (
  elem: Cheerio<any>,
  value: string,
) => expect(elem.text()).toEqual(value);

export const checkHasClass = (
  elem: Cheerio<any>,
  className: string,
  result: boolean,
) => expect(elem.hasClass(className)).toEqual(result);

export const checkAttr = (
  elem: Cheerio<any>,
  attrName: string,
  attrValue: string,
) => expect(elem.attr(attrName)).toEqual(attrValue);
