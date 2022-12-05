export class Placeholder {
  item: HTMLElement | Element | null;
  spacer: HTMLElement | Element | null;
  constructor(wrapper: HTMLElement) {
    this.item = wrapper.getElementsByClassName('js-get-ratio__item')[0];
    this.spacer = wrapper.getElementsByClassName('js-get-ratio__spacer')[0];
    this.process();
  }

  process(): void {
    if (this.item && this.spacer) {
      if (
        this.item instanceof HTMLElement &&
        this.spacer instanceof HTMLElement
      ) {
        const ratio: string | null = this.item.getAttribute('data-ratio');
        if (ratio !== null && ratio !== '') {
          const ratioArray: string[] = ratio.split('/');
          if (ratioArray.length === 2) {
            const padding =
              (parseFloat(ratioArray[1]) / parseFloat(ratioArray[0])) * 100;
            this.spacer.style.paddingTop = `${padding}%`;
          }
        }
      }
    }
  }

  static init(): void {
    const target: HTMLCollection =
      document.getElementsByClassName('js-get-ratio');
    if (target.length) {
      for (let i = 0; i < target.length; i++) {
        if (!(target[i] instanceof HTMLElement)) {
          continue;
        }
        const thisTarget = target[i] as HTMLElement;
        new Placeholder(thisTarget);
      }
    }
  }
}
