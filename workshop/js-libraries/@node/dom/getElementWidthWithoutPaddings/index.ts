import { getElementWidthWithoutPaddings as core } from '#libraries/@core/dom/getElementWidthWithoutPaddings';

const mockGetComputedStyle = (() => {}) as unknown as Parameters<typeof core>[0];

export const getElementWidthWithoutPaddings = (element?: HTMLElement | null): number => {
  return core(mockGetComputedStyle, element);
};
