import { Sidebar } from '../parts';

export class HighlightPage {
  static readonly BREADCRUMB_ID = 'breadcrumbs';

  constructor() {
    this.init();

    console.log('[HighlightPage] initialized');
  }

  private init(): void {
    const breadcrumbs = this.getBreadcrumbs();
    if (breadcrumbs.length === 0) return;

    const currentPage = breadcrumbs[1];
    if (!currentPage) return;

    const currentPageName = currentPage.textContent!.replace('…', '').trim();
    console.log('current page:', currentPageName);

    const sidebar = Sidebar.load();
    if (!sidebar) return console.error('Failed to load sidebar');

    const allItems = sidebar.getAllItems();
    // improve sidebar item appearance
    for (const item of allItems) {
      item.element.style.padding = '4px 18px 4px 6px';
      item.element.title = item.getName();
      item.getNameElement().classList.add('multiline-ellipsis');
    }

    const currentItem = allItems.find((item) => item.getName().startsWith(currentPageName));
    if (!currentItem) return console.error('Current item not found in sidebar', currentPageName, allItems);

    // open and highlight current folder
    if (currentItem.folder) {
      currentItem.folder.open(); // open if inside a folder

      const styles = {
        default: {
          backgroundColor: '#646464',
        },
        hovered: {
          backgroundColor: '#eeeeee',
        }
      }

      const folderEl = currentItem.folder.getLabelElement();
      folderEl.style.fontWeight = 'bold';
      folderEl.style.backgroundColor = styles.default.backgroundColor;

      folderEl.addEventListener('mouseover', () => {
        folderEl.style.backgroundColor = styles.hovered.backgroundColor;
      });
      folderEl.addEventListener('mouseout', () => {
        folderEl.style.backgroundColor = styles.default.backgroundColor;
      });
    }

    // highlight current item
    {
      const styles = {
        default: {
          color: '#f0f0f0',
          backgroundColor: '#6e6e6e',
        },
        hovered: {
          color: '#1e1e1e',
          backgroundColor: '#eeeeee',
        }
      }

      const el = currentItem.element;
      el.style.fontWeight = 'bold';
      el.style.color = styles.default.color;
      el.style.backgroundColor = styles.default.backgroundColor;

      el.addEventListener('mouseover', () => {
        el.style.color = styles.hovered.color;
        el.style.backgroundColor = styles.hovered.backgroundColor;
      });
      el.addEventListener('mouseout', () => {
        el.style.color = styles.default.color;
        el.style.backgroundColor = styles.default.backgroundColor;
      });
    }
  }

  private getBreadcrumbs(): Element[] {
    const breadcrumb = document.getElementById(HighlightPage.BREADCRUMB_ID);
    if (!breadcrumb) return [];
    return [...breadcrumb.children];
  }
}
