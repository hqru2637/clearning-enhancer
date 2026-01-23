import type { SidebarFolder } from './folder';

export class SidebarItem {
  readonly element: HTMLAnchorElement;
  readonly folder?: SidebarFolder;
  
  constructor(element: HTMLAnchorElement, folder?: SidebarFolder) {
    this.element = element;
    this.folder = folder;
  }

  getNameElement() {
    const el = this.element.querySelectorAll<HTMLSpanElement>('span')[0];
    if (!el) throw new Error('Failed to find element: span[0]');
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
    const span = this.element.querySelectorAll<HTMLSpanElement>('span')[1];
    if (!span) return 0;
    const count = parseInt(span.textContent.trim() || '0', 10);
    return Number.isNaN(count) ? 0 : count;
  }
}