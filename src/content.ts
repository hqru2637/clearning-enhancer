import { DateEnhancer, HighlightPage, EnterAttendance, MarkAsRead, ShowPDFTitle } from './features';

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
  new EnterAttendance();
  new MarkAsRead();
  new ShowPDFTitle();
}
