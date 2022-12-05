// クラス付与系簡素アコーディオン
export class CommonAccordion {
  wrapper: HTMLElement;
  trg: HTMLElement | Element | null;
  static trgClassName = 'js-acc__trg';
  static toggleClassName = 'is-open';
  constructor(wrapper: HTMLElement) {
    this.wrapper = wrapper;
    this.trg = wrapper.getElementsByClassName(CommonAccordion.trgClassName)[0];

    this.bindEvent();
  }

  bindEvent(): void {
    if (!(this.trg instanceof HTMLElement)) {
      return;
    }
    this.trg.addEventListener(
      'click',
      (e: MouseEvent): void => {
        if (!(e.target instanceof HTMLElement)) {
          return;
        }
        const target: HTMLElement = e.target;
        if (
          target.classList.contains(CommonAccordion.trgClassName) ||
          target.closest(`.${CommonAccordion.trgClassName}`) !== null
        ) {
          const parent: HTMLElement = this.wrapper;
          if (!parent.classList.contains(CommonAccordion.toggleClassName)) {
            parent.classList.add(CommonAccordion.toggleClassName);
          } else if (
            parent.classList.contains(CommonAccordion.toggleClassName)
          ) {
            parent.classList.remove(CommonAccordion.toggleClassName);
          }
        }
      },
      false
    );
  }

  static init(): void {
    const target: HTMLCollection = document.getElementsByClassName('js-acc');
    if (target.length) {
      for (let i = 0; i < target.length; i++) {
        if (!(target[i] instanceof HTMLElement)) {
          continue;
        }
        const thisTarget = target[i] as HTMLElement;
        new CommonAccordion(thisTarget);
      }
    }
  }
}
