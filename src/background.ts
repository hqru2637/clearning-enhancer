import { MessageType } from './types';

const pdfTitleCache = new Map<number, string>();

chrome.webRequest.onHeadersReceived.addListener((details) => {
  const contentType = details.responseHeaders?.find(h => h.name.toLowerCase() === 'content-type');
  const contentDisposition = details.responseHeaders?.find(h => h.name.toLowerCase() === 'content-disposition'); // ここに元のファイル名が入る

  if (contentType?.value?.includes('application/pdf') && contentDisposition?.value?.includes('filename')) {
    const match = contentDisposition.value.match(/filename\*?=UTF-8''([^;]+)/);
    if (match) {
      const filename = decodeURIComponent(match[1]);
      if (details.tabId !== -1) {
        pdfTitleCache.set(details.tabId, filename);
        console.log(`[ShowPDFTitle] Cached PDF title for tab ${details.tabId}: ${filename}`);
      }
    }
  }
}, {
  urls: ["https://udai.c-learning.jp/s/getfile/*"],
}, ["responseHeaders"]);

chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
  if (!tab.url || !tab.id) return;
  
  if ('title' in changeInfo) {
    onPageTitleUpdate(tab);
  } 
});

function onPageTitleUpdate(tab: chrome.tabs.Tab) {
  const tabId = tab.id!;

  const url = new URL(tab.url!);
  if (!url.pathname.startsWith('/s/getfile/')) return;
  
  const lastSegment = url.pathname.split('/').pop();
  const isFallbackedTitle = lastSegment === tab.title;

  
  if (isFallbackedTitle) {
    const cachedTitle = pdfTitleCache.get(tabId);
    if (!cachedTitle) return;

    pdfTitleCache.delete(tabId);
    
    if (cachedTitle === lastSegment) return; // 無限ループ防止

    chrome.tabs.sendMessage<MessageType>(tabId, { type: 'setTitle', title: cachedTitle });
    console.log(`[ShowPDFTitle] Triggered setTitle for tab ${tabId} with title: ${cachedTitle}`);
  }
}