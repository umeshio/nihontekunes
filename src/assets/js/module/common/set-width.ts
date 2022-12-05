// 画像widthをjsでレスポンシブ指定
export class SetWidth {
  wrapper: HTMLElement;
  width: string | null;
  static mediaQuery: MediaQueryList | undefined = window.matchMedia(
    'screen and (min-width: 768px)'
  );
  constructor(wrapper: HTMLElement) {
    this.wrapper = wrapper;
    this.width = this.wrapper.getAttribute('data-width');
    this.process();
  }

  process(): void {
    this.setVal();
    if (SetWidth.mediaQuery != null) {
      SetWidth.mediaQuery.addEventListener(
        'change',
        this.setVal.bind(this),
        false
      );
    }
  }

  setVal(): void {
    if (this.width !== null && this.width !== '') {
      const widthArray: string[] = this.width.split('/');
      if (widthArray.length === 2) {
        const widthVal: string = widthArray[0];
        const widthValPc: string = widthArray[1];
        if (SetWidth.mediaQuery != null && SetWidth.mediaQuery.matches) {
          this.wrapper.style.width = widthValPc;
        } else {
          this.wrapper.style.width = widthVal;
        }
      } // if (widthArray.length) {
    } // if (width !== null && width !== '') {
  }

  static init(): void {
    const target: HTMLCollection =
      document.getElementsByClassName('js-set-width');
    if (target.length) {
      for (let i = 0; i < target.length; i++) {
        if (!(target[i] instanceof HTMLElement)) {
          continue;
        }
        const thisTarget = target[i] as HTMLElement;
        new SetWidth(thisTarget);
      }
    }
  }
}
