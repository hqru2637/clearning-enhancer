import { DateEnhancer, HighlightPage, EnterAttendance, MarkAsRead, ShowPDFTitle, OpenSyllabus, FileDownload, ResizableSidebar } from './features';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    load();
  });
} else {
  load();
}

async function load() {
  new DateEnhancer();
  new HighlightPage();
  new EnterAttendance();
  new MarkAsRead();
  new ShowPDFTitle();
  new OpenSyllabus();
  new FileDownload();
  new ResizableSidebar();
}
