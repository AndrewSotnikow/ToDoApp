import { JSDOM } from 'jsdom';

const dom = new JSDOM();

const g = global as any;

export const beLikeBrowser = () => {
  g.document = dom.window.document;
  g.window = dom.window;
  g.navigator = dom.window.navigator;
  g.MouseEvent = dom.window.MouseEvent;
  g.Event = dom.window.Event;
};

export const beLikeServer = () => {
  delete g.document;
  delete g.window;
  delete g.navigator;
  delete g.MouseEvent;
  delete g.Event;
};

export const runInServerEnv = (func: typeof Function) => {
  beLikeServer();
  const result = func();
  beLikeBrowser();
  return result;
};
