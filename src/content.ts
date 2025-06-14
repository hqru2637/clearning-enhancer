import { DateEnhancer } from './features/date-enhancer';
import { HighlightPage } from './features/highlight-page';


// コンテンツスクリプトの初期化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    load();
  });
} else {
  load();
}

function load() {
  new DateEnhancer();
  new HighlightPage();
}