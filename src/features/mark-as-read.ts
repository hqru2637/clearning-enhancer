export class MarkAsRead {
  static readonly SETREAD_PATHNAME = [
    '/s/class/setRead',
    '/s/material/setRead',
  ];
  
  constructor() {
    this.init();
    console.log('[MarkAsRead] initialized');
  }

  private init() {
    const markAsRead = this.getMarkAsReadButton();
    if (!markAsRead) return;

    const container = markAsRead.parentElement?.parentElement?.parentElement;
    if (!container) return;

    const button = document.createElement('a');
    button.classList.add('va-top', 'line-height-1', 'mark-as-read-button');
    button.href = markAsRead.href;
    button.text = markAsRead.textContent;
    
    container.appendChild(button);
  }

  private getMarkAsReadButton() {
    const buttons = Array.from(document.querySelectorAll<HTMLAnchorElement>('a.dropdown-item'));
    return buttons.find(btn => MarkAsRead.SETREAD_PATHNAME.includes(btn.pathname));
  }
}