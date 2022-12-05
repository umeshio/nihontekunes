// スクロール処理
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const inView = require('in-view');

export class CommonScroll {
  // loadedFlag: boolean;
  // loadingElm: HTMLElement | null;
  // loadedImg: number;
  // imgLength: number;
  // progressElm: HTMLElement | null;
  // progressCurrent: number;
  // timer: number;
  // ofiTarget: HTMLCollection;
  isRunning: boolean;
  selector: string;

  static root: HTMLElement | null = document.querySelector('html');
  static header: HTMLElement | null = document.getElementById('js-header');
  static headerTrg: HTMLElement | null =
    document.getElementById('js-header-trg');
  static headerTrgPos = 0;
  static headerTrgClientRect = 0;
  static scrollPos = 0;
  static offset = 0;

  constructor(selectorClassName: string) {
    this.isRunning = false;
    this.selector = `.${selectorClassName}`;
    // this.root = document.querySelector('html');
    this.bindEvent();
  }

  bindEvent(): void {
    window.addEventListener(
      'scroll',
      (): void => {
        if (!this.isRunning) {
          window.requestAnimationFrame(() => {
            this.isRunning = false;
            CommonScroll.scrollPos = window.pageYOffset;
            this.checkSiteScrolled();
            this.toggleHeaderState();
          });
          this.isRunning = true;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        inView.offset({
          bottom: 60
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        inView(this.selector).on('enter', (target: HTMLElement) => {
          target.classList.add('in-view');
        });
      },
      false
    );
  }

  checkSiteScrolled(): void {
    // 下方向にスクロールしているとき
    if (CommonScroll.scrollPos > CommonScroll.offset) {
      if (CommonScroll.root !== null) {
        if (CommonScroll.root.classList.contains('site-scroll-up')) {
          CommonScroll.root.classList.remove('site-scroll-up');
          CommonScroll.root.classList.add('site-scroll-down');
        } else if (!CommonScroll.root.classList.contains('site-scroll-down')) {
          CommonScroll.root.classList.add('site-scroll-down');
        }
      }
      // 上方向にスクロールしているとき
    } else {
      if (CommonScroll.root !== null) {
        if (CommonScroll.root.classList.contains('site-scroll-down')) {
          CommonScroll.root.classList.remove('site-scroll-down');
          CommonScroll.root.classList.add('site-scroll-up');
        } else if (!CommonScroll.root.classList.contains('site-scroll-up')) {
          CommonScroll.root.classList.add('site-scroll-up');
        }
      }
    }
    CommonScroll.offset = CommonScroll.scrollPos;
  }

  toggleHeaderState(): void {
    if (CommonScroll.headerTrg !== null) {
      CommonScroll.headerTrgClientRect =
        CommonScroll.headerTrg.getBoundingClientRect().top;
      CommonScroll.headerTrgPos =
        CommonScroll.scrollPos + CommonScroll.headerTrgClientRect;
    } else {
      CommonScroll.headerTrgPos = 0;
    }
    if (CommonScroll.root !== null && CommonScroll.header !== null) {
      if (CommonScroll.scrollPos > CommonScroll.headerTrgPos) {
        if (!CommonScroll.header.classList.contains('is-fixed')) {
          CommonScroll.header.classList.add('is-fixed');
          setTimeout(function () {
            if (CommonScroll.root !== null) {
              CommonScroll.root.classList.add('header-is-fixed');
            }
          }, 500);
        }
      } else {
        if (CommonScroll.header.classList.contains('is-fixed')) {
          CommonScroll.header.classList.remove('is-fixed');
          CommonScroll.root.classList.remove('header-is-fixed');
        }
      }
    }
  }

  static init(className: string): void {
    // classNmae = js-inview
    const target: HTMLCollection = document.getElementsByClassName(className);
    if (target.length) {
      new CommonScroll(className);
    }
  }
}
