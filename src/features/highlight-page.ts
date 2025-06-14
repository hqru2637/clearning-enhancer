export class HighlightPage {
  static readonly TARGET_SITES = [
    'udai.c-learning.jp',
  ];
  static readonly BREADCRUMB_ID = 'breadcrumbs';

  constructor() {
    this.init();

    console.log('HighlightPage initialized');
  }

  private shouldEnhancePage(): boolean {
    const hostname = window.location.hostname;
    return HighlightPage.TARGET_SITES.some(site => hostname.includes(site)) ||
      HighlightPage.TARGET_SITES.includes('*');
  }

  private init(): void {
    if (!this.shouldEnhancePage()) return;

    const breadcrumbs = this.getBreadcrumbs();
    if (breadcrumbs.length === 0) return;

    const currentPage = breadcrumbs[1];
    if (!currentPage) return;

    const currentPageName = currentPage.textContent!.replace('…', '').trim();
    console.log('current page:', currentPageName);

    const sidebarItems = this.getSidebarItems();
    if (sidebarItems.length === 0) return console.error('Failed to get sidebar items');

    const currentItem = sidebarItems.find(li => li.textContent!.trim().startsWith(currentPageName));
    if (!currentItem) return console.error('Current item not found in sidebar');

    console.log('Current item:', currentItem);

    const text = currentItem.querySelector('span')
    if (!text) return console.error('Text element not found in current item');

    text.style.fontWeight = 'bold';
    text.style.border = '2px solid #ffcc00 !important';
  }

  private getSidebarItems(): HTMLElement[] {
    const elements = document.querySelector('.menu-inner ul')?.children;
    if (!elements) return [];
    return [...elements] as HTMLElement[];
  }

  private getBreadcrumbs(): Element[] {
    const breadcrumb = document.getElementById(HighlightPage.BREADCRUMB_ID);
    if (!breadcrumb) return [];
    return [...breadcrumb.children];
  }
}