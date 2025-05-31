// オプションページのスクリプト

interface Settings {
  enabled: boolean;
  targetSites: string[];
  dateSelectors: string[];
  dayFormat: 'short' | 'long';
}

const defaultSettings: Settings = {
  enabled: true,
  targetSites: ['udai.c-learning.jp', 'example.com', 'localhost'],
  dateSelectors: ['.TODO-DATE', '.date', '.datetime', '.created-at', '.updated-at', 'time', '[datetime]', '.post-date', '.article-date'],
  dayFormat: 'short'
};

class OptionsManager {
  private settings: Settings = defaultSettings;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    await this.loadSettings();
    this.setupEventListeners();
    this.updateUI();
  }

  private async loadSettings(): Promise<void> {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      try {
        const result = await chrome.storage.sync.get('settings');
        if (result.settings) {
          this.settings = { ...defaultSettings, ...result.settings };
        }
      } catch (error) {
        console.log('設定の読み込みに失敗しました:', error);
      }
    }
  }

  private async saveSettings(): Promise<void> {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      try {
        await chrome.storage.sync.set({ settings: this.settings });
        this.showStatus('設定が保存されました', 'success');
      } catch (error) {
        console.error('設定の保存に失敗しました:', error);
        this.showStatus('設定の保存に失敗しました', 'error');
      }
    } else {
      // Chrome API が利用できない場合はローカルストレージを使用
      localStorage.setItem('clearingEnhancerSettings', JSON.stringify(this.settings));
      this.showStatus('設定が保存されました（ローカル）', 'success');
    }
  }

  private updateUI(): void {
    const enabledCheckbox = document.getElementById('enabled') as HTMLInputElement;
    const targetSitesTextarea = document.getElementById('targetSites') as HTMLTextAreaElement;
    const dateSelectorsInput = document.getElementById('dateSelectors') as HTMLInputElement;
    const dayShortRadio = document.getElementById('dayShort') as HTMLInputElement;
    const dayLongRadio = document.getElementById('dayLong') as HTMLInputElement;

    if (enabledCheckbox) enabledCheckbox.checked = this.settings.enabled;
    if (targetSitesTextarea) targetSitesTextarea.value = this.settings.targetSites.join('\n');
    if (dateSelectorsInput) dateSelectorsInput.value = this.settings.dateSelectors.join(',');
    
    if (this.settings.dayFormat === 'short') {
      if (dayShortRadio) dayShortRadio.checked = true;
    } else {
      if (dayLongRadio) dayLongRadio.checked = true;
    }
  }

  private collectSettings(): void {
    const enabledCheckbox = document.getElementById('enabled') as HTMLInputElement;
    const targetSitesTextarea = document.getElementById('targetSites') as HTMLTextAreaElement;
    const dateSelectorsInput = document.getElementById('dateSelectors') as HTMLInputElement;
    const dayFormatRadios = document.getElementsByName('dayFormat') as NodeListOf<HTMLInputElement>;

    this.settings.enabled = enabledCheckbox ? enabledCheckbox.checked : true;
    
    if (targetSitesTextarea) {
      this.settings.targetSites = targetSitesTextarea.value
        .split('\n')
        .map(site => site.trim())
        .filter(site => site.length > 0);
    }
    
    if (dateSelectorsInput) {
      this.settings.dateSelectors = dateSelectorsInput.value
        .split(',')
        .map(selector => selector.trim())
        .filter(selector => selector.length > 0);
    }

    for (const radio of dayFormatRadios) {
      if (radio.checked) {
        this.settings.dayFormat = radio.value as 'short' | 'long';
        break;
      }
    }
  }

  private setupEventListeners(): void {
    const saveButton = document.getElementById('save');
    const resetButton = document.getElementById('reset');

    if (saveButton) {
      saveButton.addEventListener('click', () => {
        this.collectSettings();
        this.saveSettings();
      });
    }

    if (resetButton) {
      resetButton.addEventListener('click', () => {
        this.settings = { ...defaultSettings };
        this.updateUI();
        this.showStatus('設定をデフォルトに戻しました', 'success');
      });
    }
  }

  private showStatus(message: string, type: 'success' | 'error'): void {
    const statusElement = document.getElementById('status');
    if (statusElement) {
      statusElement.textContent = message;
      statusElement.className = `status ${type}`;
      statusElement.style.display = 'block';

      setTimeout(() => {
        statusElement.style.display = 'none';
      }, 3000);
    }
  }
}

// DOMが読み込まれたら初期化
document.addEventListener('DOMContentLoaded', () => {
  new OptionsManager();
});
