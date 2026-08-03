export class FileDownload {
  constructor() {
    this.init();
    console.log('[FileDownload] initialized');
  }

  private init(): void {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (node instanceof HTMLDivElement && node.classList.contains('thread-body')) {
              this.applyButtons(node);
            }
          }
        }
      }
    });

    const threadPages = [...document.querySelectorAll('div.thread-page')];
    const matLists = threadPages.flatMap(p => [...p.querySelectorAll('.mat-list')]);
    for (const matList of matLists) {
      const isLoaded = matList.children.length > 1;
      if (!isLoaded) {
        observer.observe(matList, { childList: true });
        // console.log('[FileDownload] Observing mat-list for changes:', matList);
      }
    }
  }

  private applyButtons(threadBody: HTMLDivElement): void {
    const fileEntries = [...threadBody.querySelectorAll('ul.files')].flatMap(e => [...e.children])
      .filter((li): li is HTMLLIElement => li instanceof HTMLLIElement);

    for (const li of fileEntries) {
      const span = li.children[0];
      if (!(span instanceof HTMLSpanElement)) continue;

      const fileLink = span.children[1];
      if (!(fileLink instanceof HTMLAnchorElement)) continue;

      const fileName = li.querySelector<HTMLSpanElement>('.f-name')?.textContent;
      if (!fileName) continue;

      // ダウンロードボタンを追加 /download.svg
      const downloadButton = document.createElement("button");
      downloadButton.type = "button";
      downloadButton.className = "file-download-button";

      downloadButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const a = document.createElement("a");
        a.href = fileLink.href;
        a.download = fileName; // ダウンロード名を指定
        a.style.display = "none";

        document.body.appendChild(a);
        a.click();
        a.remove();
      });

      const image = document.createElement('img');
      image.src = chrome.runtime.getURL('download.svg');
      image.style.width = '16px';
      image.style.height = '16px';
      image.style.marginBottom = '3px';

      downloadButton.appendChild(image);

      span.appendChild(downloadButton);

      // console.log('[FileDownload] Download button added for', fileLink.href);
    }
  }
}