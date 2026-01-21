import type { SidebarFolder } from './folder';

export class SidebarItem {
  readonly element: HTMLAnchorElement;
  readonly folder?: SidebarFolder;
  
  constructor(element: HTMLAnchorElement, folder?: SidebarFolder) {
    this.element = element;
    this.folder = folder;
  }

  getNameElement() {
    const el = this.element.querySelector<HTMLSpanElement>('span.c-name');
    if (!el) throw new Error('Failed to find element: span.c-name');
    return el;
  }

  getName() {
    const span = this.getNameElement();
    return span.textContent.trim();
  }

  getLink() {
    return this.element.href;
  }

  getNotificationCount() {
    const span = this.element.querySelector<HTMLSpanElement>('span.attention');
    if (!span) return 0;
    const count = parseInt(span.textContent.trim() || '0', 10);
    return Number.isNaN(count) ? 0 : count;
  }
}