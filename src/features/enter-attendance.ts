import { showNotification } from '../notification';

export class EnterAttendance {
  constructor() {
    this.init();
    console.log('[EnterAttendance] initialized');
  }

  private init(): void {
    const input = document.querySelector<HTMLInputElement>('#attendForm input[name="keycode"]');
    if (!input) return;

    console.log('[EnterAttendance] Attendance form found, attaching event listeners.');

    let locked = false;

    const form = document.querySelector<HTMLFormElement>('#attendForm');
    if (form) {
      const elements = [...form.querySelectorAll('.adjust-style')];
      // キーがない場合: 出席ボタンの１個だけ
      // キーがある場合: 確認キー入力と出席ボタンの２個になる
      if (elements.length === 1 && elements[0].textContent.includes('出席する')) { 
        const btn = form ? form.querySelector<HTMLButtonElement>('.geoButton') : null;
        setTimeout(() => {
          if (btn) {
            btn.click();
          } else {
            form.submit();
          }
          showNotification('出席が送信されました');
        }, 1000);
      }
    }

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      if (document.activeElement !== input) return;

      const val = input.value;
      if (!val || val.trim() === '') return;

      e.preventDefault();
      if (locked) return;
      locked = true;

      const btn = form ? form.querySelector<HTMLButtonElement>('.geoButton') : null;
      if (btn) {
        btn.click();
      } else if (form instanceof HTMLFormElement) {
        form.submit();
      }

      setTimeout(() => {
        locked = false;
      }, 500);
    };

    if (!(input as any).__enterAttendanceAttached) {
      input.addEventListener('keydown', onKeydown, { passive: false });
      (input as any).__enterAttendanceAttached = true;
    }
  }
}
