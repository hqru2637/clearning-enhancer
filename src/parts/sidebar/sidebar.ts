import { SidebarFolder } from './folder';
import { SidebarItem } from './item';

export class Sidebar {
  /** nav#main-menu */
  readonly element: HTMLElement;

  private constructor(element: HTMLElement) {
    this.element = element;
    console.log('[Sidebar] initialized');
  }

  getEntries(): (SidebarFolder | SidebarItem)[] {
    const lis = this.element.querySelectorAll<HTMLLIElement>('.menu-inner > ul > li');
    console.log('lis:', lis);
    return Array.from(lis, (li) => {
      const isFolder = li.classList.contains('main-menu-folder');
      if (isFolder) {
        const folder = li.querySelector<HTMLDivElement>('div.main-menu-folder-wrap');
        if (!folder) {
          console.error('Failed to find folder element', li);
          throw new Error();
        };

        return new SidebarFolder(folder);
      } else {
        const a = li.querySelector<HTMLAnchorElement>('a');
        if (!a) {
          console.error('Failed to find item element', li);
          throw new Error();
        }

        return new SidebarItem(a);
      }
    });
  }

  getAllItems(): SidebarItem[] {
    const items: SidebarItem[] = [];
    for (const entry of this.getEntries()) {
      if (entry instanceof SidebarItem) {
        items.push(entry);
      } else if (entry instanceof SidebarFolder) {
        items.push(...entry.getItems());
      }
    }
    return items;
  }

  static load(): Sidebar | undefined {
    const nav = document.querySelector<HTMLElement>('nav#main-menu');
    if (!nav) return undefined;
    return new Sidebar(nav);
  }
}