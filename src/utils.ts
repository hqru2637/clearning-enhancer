export interface HoverStyle {
  default: Partial<CSSStyleDeclaration>;
  hovered: Partial<CSSStyleDeclaration>;
}

export function applyHoverStyle(element: HTMLElement, style: HoverStyle) {
  Object.assign(element.style, style.default);

  element.addEventListener('mouseover', () => {
    Object.assign(element.style, style.hovered);
  });

  element.addEventListener('mouseout', () => {
    Object.assign(element.style, style.default);
  });
}