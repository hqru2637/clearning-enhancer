import { DateEnhancer, HighlightPage, EnterAttendance } from './features';

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
}
