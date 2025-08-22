export class EnterAttend {
  constructor() {
    this.init();
    console.log('[EnterAttend] initialized');
  }

  private init(): void {
    const input = document.querySelector<HTMLInputElement>('#attendForm input[name="keycode"]');
    if (!input) return;

    console.log('[EnterAttend] Attendance form found, attaching event listeners.');

    let locked = false;

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      if (document.activeElement !== input) return;

      const val = input.value;
      if (!val || val.trim() === '') return;

      e.preventDefault();
      if (locked) return;
      locked = true;

      const form = input.closest('form') || document.querySelector('#attendForm');
      const btn = form ? form.querySelector<HTMLButtonElement>('.geoButton') : null;
      if (btn) {
        btn.click();
      } else if (form && (form as HTMLFormElement).submit) {
        (form as HTMLFormElement).submit();
      }

      setTimeout(() => {
        locked = false;
      }, 500);
    };

    if (!(input as any).__enterAttendAttached) {
      input.addEventListener('keydown', onKeydown, { passive: false });
      (input as any).__enterAttendAttached = true;
    }
  }
}
