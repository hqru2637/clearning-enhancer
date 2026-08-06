export class ResizableSidebar {
  private readonly STORAGE_KEY = "sidebar-width";

  constructor() {
    this.init()
      .then(() => console.log('[ResizableSidebar] initialized'))
      .catch(console.error);
  }

  private async saveWidth(width: number) {
    await chrome.storage.local.set({
      [this.STORAGE_KEY]: width,
    });
  }

  private async loadWidth(): Promise<number> {
    const result = await chrome.storage.local.get(this.STORAGE_KEY);
    return result[this.STORAGE_KEY] ?? 240;
  }

  private async init() {
    let currentWidth = await this.loadWidth();

    const setSidebarWidth = (width: number) => {
      document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
      currentWidth = width;
    }

    const style = document.createElement("style");
    style.textContent = `
        :root {
          --sidebar-width: ${currentWidth}px;
        }

        #main-menu {
          width: var(--sidebar-width) !important;
        }

        #main-menu .menu-inner,
        #main-menu li {
          width: 100% !important;
          box-sizing: border-box;
        }
    `;

    document.head.appendChild(style);
    window.dispatchEvent(new Event("resize")); // 初期化時に一度発火させる

    const sidebar = document.querySelector<HTMLElement>("#main-menu")!;

    const handle = document.createElement("div");
    handle.className = 'resize-handle';

    sidebar.appendChild(handle);

    let dragging = false;

    handle.addEventListener("pointerdown", (e) => {
      dragging = true;
      // document.body.style.userSelect = "none";
      handle.classList.add("dragging");
      handle.setPointerCapture(e.pointerId);
    });

    document.addEventListener("pointermove", (e) => {
      if (!dragging) return;

      const width = Math.max(180, Math.min(600, e.clientX));
      setSidebarWidth(width);
      // jquery側のイベントを発火させる
      window.dispatchEvent(new Event("resize"));
    });

    document.addEventListener("pointerup", async () => {
      dragging = false;
      // document.body.style.userSelect = "";
      handle.classList.remove("dragging");
      await this.saveWidth(currentWidth);

    });

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (node instanceof HTMLDivElement && node.id === 'addon-box') {
              node.style.width = `${currentWidth}px`;
              // console.log(`[ResizableSidebar] Overwriting addon-box width to ${currentWidth}px`);
            }
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
}