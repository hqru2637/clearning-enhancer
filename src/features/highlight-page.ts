import { Sidebar } from '../parts';
import { applyHoverStyle } from '../utils';

export class HighlightPage {
  static readonly BREADCRUMB_ID = 'breadcrumbs';

  constructor() {
    this.init();

    console.log('[HighlightPage] initialized');
  }

  private init(): void {
    const sidebar = Sidebar.load();
    if (!sidebar) return console.error('Failed to load sidebar');

    const allItems = sidebar.getAllItems();
    // improve sidebar item appearance
    for (const item of allItems) {
      item.element.style.padding = '4px 18px 4px 8px';
      item.element.title = item.getName();
      item.element.style.height = '40px';
      item.getNameElement().classList.add('multiline-ellipsis', 'height-auto');
    }

    const breadcrumbs = this.getBreadcrumbs();
    if (breadcrumbs.length === 0) return;

    const currentPage = breadcrumbs[1];
    if (!currentPage) return;

    const currentPageName = currentPage.textContent!.replace('…', '').trim();
    console.log('current page:', currentPageName);

    const currentItem = allItems.find((item) => item.getName().startsWith(currentPageName));
    if (!currentItem) return console.error('Current item not found in sidebar', currentPageName, allItems);

    // open and highlight current folder
    if (currentItem.folder) {
      currentItem.folder.open(); // open if inside a folder

      const folderEl = currentItem.folder.getLabelElement();
      applyHoverStyle(folderEl, {
        default: {
          backgroundColor: '#646464',
        },
        hovered: {
          backgroundColor: '#eeeeee',
        }
      });
    }

    // highlight current item
    {
      applyHoverStyle(currentItem.element, {
        default: {
          fontWeight: 'bold',
          color: '#f0f0f0',
          backgroundColor: '#6e6e6e',
        },
        hovered: {
          color: '#1e1e1e',
          backgroundColor: '#eeeeee',
        }
      });
    }
  }

  private getBreadcrumbs(): Element[] {
    const breadcrumb = document.getElementById(HighlightPage.BREADCRUMB_ID);
    if (!breadcrumb) return [];
    return [...breadcrumb.children];
  }
}
