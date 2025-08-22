interface DateEnhancementConfig {
  dateSelectors: string[];
  datePatterns: RegExp[];
}

export class DateEnhancer {
  private config: DateEnhancementConfig;

  constructor() {
    this.config = {
      dateSelectors: ['.TODO-DATE'],
      datePatterns: [/(\d{4})\/(\d{1,2})\/(\d{1,2})/g],
    };

    this.init();
  }

  private init(): void {
    this.enhanceDates();

    this.observeDOM();

    console.log('[DateEnhancer] initialized');
  }

  private enhanceDates(): void {
    this.config.dateSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => this.processElement(element as HTMLElement));
    });
  }

  private processElement(element: HTMLElement): void {
    // 既に処理済みの場合はスキップ
    if (element.getAttribute('data-day-enhanced') === 'true') return;

    const text = element.textContent || '';

    // 「期日なし」などの特殊なケースはスキップ
    if (text.includes('期日なし') || text.includes('なし') || text.includes('未定')) {
      return;
    }

    // 既に曜日が含まれているかチェック
    if (this.containsDayName(text)) {
      return;
    }

    // より厳密な日付パターンマッチング
    let matched = false;

    // 各パターンを試行
    for (const pattern of this.config.datePatterns) {
      // パターンを文字列全体に対して実行
      const matches = text.match(pattern);
      if (matches) {
        for (const match of matches) {
          // 純粋な日付部分を抽出
          const dateMatch = match.match(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
          if (dateMatch) {
            const year = parseInt(dateMatch[1]);
            const month = parseInt(dateMatch[2]) - 1;
            const day = parseInt(dateMatch[3]);

            const date = new Date(year, month, day);
            if (!isNaN(date.getTime())) {
              const dayName = this.getDayName(date);

              // テキストを直接書き換え
              element.textContent = `${text}（${dayName}）`;
              element.setAttribute('data-day-enhanced', 'true');
              matched = true;

              console.log(`Detected ${date.toLocaleDateString()} in elements. Adding: ${dayName}`);
              break;
            }
          }
        }
        if (matched) break;
      }
    }
  }

  private processTextNodes(node: Node): void {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      // セレクターに一致する要素かチェック
      const isTargetElement = this.config.dateSelectors.some((selector) => {
        try {
          return element.matches(selector);
        } catch {
          return false;
        }
      });

      if (isTargetElement) {
        this.processElement(element);
      }
    }

    // 子ノードを再帰的に処理
    node.childNodes.forEach((child) => this.processTextNodes(child));
  }

  private parseDate(groups: string[]): Date | null {
    // グループの数に応じて日付を解析
    if (groups.length >= 3) {
      const year = parseInt(groups[0]);
      const month = parseInt(groups[1]) - 1; // Dateオブジェクトは0ベースの月
      const day = parseInt(groups[2]);

      // 年が2桁の場合は2000年代として扱う
      const fullYear = year < 100 ? 2000 + year : year;

      return new Date(fullYear, month, day);
    }
    return null;
  }

  private getDayName(date: Date): string {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return days[date.getDay()];
  }

  private containsDayName(text: string): boolean {
    const dayPattern = /[月火水木金土日]曜?日?/;
    return dayPattern.test(text);
  }

  private removeDayNames(): void {
    // 拡張機能によって追加された曜日を削除
    const enhancedElements = document.querySelectorAll('[data-day-enhanced="true"]');
    enhancedElements.forEach((element) => {
      const text = element.textContent || '';
      // 曜日部分を削除 例: （月）や（月曜日）
      const cleanedText = text.replace(/（[月火水木金土日]曜?日?）/g, '');
      element.textContent = cleanedText;
      element.removeAttribute('data-day-enhanced');
    });
  }
  private observeDOM(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;

              // 追加された要素が対象セレクターに一致するかチェック
              this.config.dateSelectors.forEach((selector) => {
                if (element.matches && element.matches(selector)) {
                  this.processElement(element);
                }

                // 子要素で対象セレクターに一致するものを処理
                const targetElements = element.querySelectorAll(selector);
                targetElements.forEach((targetElement) => {
                  this.processElement(targetElement as HTMLElement);
                });
              });
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}
