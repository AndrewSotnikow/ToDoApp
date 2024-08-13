// TODO getElementWidthWithoutPaddings -> redundant ?
export const getElementWidthWithoutPaddings = (
  getComputedStyle: Window['getComputedStyle'],
  element?: HTMLElement | null,
): number => {
  if (!element) {
    return 0;
  }
  const computedStyles = getComputedStyle(element, null);
  return element.clientWidth
    - parseFloat(computedStyles.paddingLeft)
    - parseFloat(computedStyles.paddingRight);
};
