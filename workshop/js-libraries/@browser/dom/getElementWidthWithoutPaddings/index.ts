import { getElementWidthWithoutPaddings as core } from '#libraries/@core/dom/getElementWidthWithoutPaddings';

export const getElementWidthWithoutPaddings = (element?: HTMLElement | null): number => {
  return core(window.getComputedStyle, element);
};
