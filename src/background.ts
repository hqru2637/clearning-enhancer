// バックグラウンドスクリプト
// 必要に応じて拡張機能の設定や状態管理を行う

// Chrome API が利用可能な場合のみ実行
if (typeof chrome !== 'undefined') {
  chrome.runtime.onInstalled.addListener(() => {
    console.log('CLearning Enhancer がインストールされました');
  });

  // アクションボタンがクリックされた時の処理
  chrome.action.onClicked.addListener((tab: any) => {
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, { action: 'toggleEnhancement' });
    }
  });
}
