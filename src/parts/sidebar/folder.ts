import { SidebarItem } from './item';

export class SidebarFolder {
  /** div.main-menu-folder-wrap */
  readonly element: HTMLDivElement;

  constructor(element: HTMLDivElement) {
    this.element = element;
  }

  getItems() {
    const lis = this.element.querySelectorAll<HTMLLIElement>('ul > li');
    return Array.from(lis, (li) => {
      const a = li.querySelector<HTMLAnchorElement>('a');
      if (!a) {
        console.error('Failed to find item element', li);
        throw new Error();
      }
      return new SidebarItem(a, this);
    })
  }

  getLabelElement() {
    const el = this.element.querySelector<HTMLDivElement>('div.main-menu-folder-toggle');
    if (!el) {
      console.error('Failed to find folder label element', this.element);
      throw new Error();
    }
    return el;
  }

  getName(): string {
    const label = this.getLabelElement();
    if (!label) return '';
    return Array.from(label.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent?.trim() ?? '')
      .join('');
  }

  open() {
    const ul = this.element.querySelector<HTMLUListElement>('ul.main-menu-folder-children');
    if (!ul) throw new Error('Failed to find folder children element');

    const label = this.getLabelElement();
    if (!label) throw new Error('Failed to find folder label element');

    const icon = label.querySelector('i');
    if (!icon) throw new Error('Failed to find folder icon element');
    
    ul.style.display = 'table';
    icon.classList.remove('fa-folder');
    icon.classList.add('fa-folder-open');
  }

  close() {
    const ul = this.element.querySelector<HTMLUListElement>('ul.main-menu-folder-children');
    if (!ul) throw new Error('Failed to find folder children element');

    const label = this.getLabelElement();
    if (!label) throw new Error('Failed to find folder label element');

    const icon = label.querySelector('i');
    if (!icon) throw new Error('Failed to find folder icon element');

    ul.style.display = 'none';
    icon.classList.remove('fa-folder-open');
    icon.classList.add('fa-folder');
  }
}