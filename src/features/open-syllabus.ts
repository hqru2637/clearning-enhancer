export class OpenSyllabus {
  static readonly TARGET_PATHNAME = '/s/class/index/';

  static readonly FACULTY_PREFIX_MAP = {
    G: "9B", // 基盤教育
    T: "1D", // 工学
    D: "1H", // データサイエンス
    R: "1A", // 地デザ
    K: "1B", // 国際
    S: "1G", // 共同教育
    A: "1F", // 農学
    B: "2H", // 地域創成科学研究科 博士前期課程
    C: "4F", // 地域創成科学研究科 博士後期課程
    M: "3A", // 教育学研究科 専門職学位課程
    Y: "4C", // 工学研究科 博士課程
  }

  constructor() {
    this.init();
    console.log('[OpenSyllabus] initialized');
  }

  private init() {
    if (!window.location.pathname.includes(OpenSyllabus.TARGET_PATHNAME)) return;

    const classHeaderElement = document.querySelector<HTMLHeadingElement>('div#content-inner > h1');
    if (!classHeaderElement) return;

    const classCodeElement = classHeaderElement.querySelector<HTMLParagraphElement>('p');
    if (!classCodeElement) return;

    const classCode = classCodeElement.textContent.match(/[A-Z]\d{6}/)?.[0];
    if (!classCode) return;

    console.log(`[OpenSyllabus] class code detected: ${classCode}`);

    const currentYear = this.getCurrentAcademicYear();
    const syllabusURL = this.createSyllabusURL(classCode, currentYear);
    if (!syllabusURL) return;

    console.log(`[OpenSyllabus] Syllabus URL: ${syllabusURL}`);

    const button = document.createElement('a');
    button.classList.add('va-top', 'line-height-1', 'open-syllabus-button');
    button.textContent = 'シラバスを開く';
    button.href = syllabusURL;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';

    const yearInput = document.createElement('input');
    yearInput.type = 'number';
    yearInput.id = 'open-syllabus-year-input';
    yearInput.className = 'open-syllabus-year-input';
    yearInput.value = currentYear.toString();
    
    yearInput.addEventListener('input', () => {
      const year = parseInt(yearInput.value);
      if (isNaN(year)) return;
      const url = this.createSyllabusURL(classCode, year);
      if (url) button.href = url;
    });

    const wrapper = document.createElement('div');
    wrapper.classList.add('va-top', 'line-height-1', 'open-syllabus-wrapper');

    wrapper.appendChild(yearInput);
    wrapper.appendChild(button);

    const headerBarElement = classHeaderElement.querySelector<HTMLDivElement>('.d-flex > .d-flex');
    if (!headerBarElement) return;

    headerBarElement.children[1]?.appendChild(wrapper);
  }

  private createSyllabusURL(classCode: string, year: number): string | undefined {
    const facultyPrefix = classCode[0];
    if (!(facultyPrefix in OpenSyllabus.FACULTY_PREFIX_MAP)) {
      console.warn(`[OpenSyllabus] unknown faculty prefix: ${facultyPrefix}`);
      return undefined;
    }

    const facultyId = OpenSyllabus.FACULTY_PREFIX_MAP[facultyPrefix as keyof typeof OpenSyllabus.FACULTY_PREFIX_MAP];

    return `http://gakumu.km.utsunomiya-u.ac.jp/syllabusHtml/utsunomiya_syllabus/${year}/${facultyId}/data/${year}_${classCode}.html`;
  }

  /**
   * 現在の年度を取得する
   */
  private getCurrentAcademicYear(): number {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // 月は0から始まるため、+1する
    return month >= 4 ? year : year - 1;
  }
}