import { MessageType } from '../types';

export class ShowPDFTitle {
  constructor() {
    this.init();
    console.log('[ShowPDFTitle] initialized');
  }

  private init() {    
    chrome.runtime.onMessage.addListener((msg: MessageType) => {
      if (msg.type === 'setTitle') {
        document.title = msg.title;
        console.log(`[ShowPDFTitle] Updated page title: ${msg.title}`);
      }
    });
  }
}