export function showNotification(message: string, title?: string): void {
  chrome.runtime
    .sendMessage({ action: 'notify', message, title })
    .then(console.log)
    .catch(console.error);
}