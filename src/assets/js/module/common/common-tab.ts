// タブ
export class CommonTab {
  wrapper: HTMLElement;
  // target: HTMLCollection | undefined;
  trg: HTMLCollection;

  static parentClassName = 'js-tab';
  static trgClassName = 'js-tab__trg';
  static contClassName = 'js-tab__cont';
  static toggleClassName = 'is-current';

  constructor(wrapper: HTMLElement) {
    this.wrapper = wrapper;
    this.trg = this.wrapper.getElementsByClassName(CommonTab.trgClassName);

    this.bindEvent();
  }

  bindEvent(): void {
    if (this.trg.length) {
      for (let i = 0; i < this.trg.length; i++) {
        if (!(this.trg[i] instanceof HTMLElement)) {
          return;
        }
        const thisTrg = this.trg[i] as HTMLElement;
        thisTrg.addEventListener(
          'click',
          (e: MouseEvent): void => {
            if (!(e.target instanceof HTMLElement)) {
              return;
            }
            const target: HTMLElement = e.target;
            const parent: HTMLElement | null = target.closest(
              `.${CommonTab.parentClassName}`
            );
            if (parent !== null) {
              let clickedTrg: HTMLElement | null;
              const siblingTrgs: HTMLCollection = parent.getElementsByClassName(
                CommonTab.trgClassName
              );
              const relatedConts: HTMLCollection =
                parent.getElementsByClassName(CommonTab.contClassName);
              // ▼is-currentリセット
              if (siblingTrgs.length) {
                for (let j = 0; j < siblingTrgs.length; j++) {
                  if (!(siblingTrgs[i] instanceof HTMLElement)) {
                    continue;
                  }
                  siblingTrgs[j].classList.remove(CommonTab.toggleClassName);
                }
              }
              if (relatedConts.length) {
                for (let j = 0; j < relatedConts.length; j++) {
                  if (!(relatedConts[i] instanceof HTMLElement)) {
                    continue;
                  }
                  relatedConts[j].classList.remove(CommonTab.toggleClassName);
                }
              }
              // ▼is-current追加
              if (target.classList.contains(CommonTab.trgClassName)) {
                clickedTrg = target;
              } else if (
                target.closest(`.${CommonTab.trgClassName}`) !== null
              ) {
                clickedTrg = target.closest(`.${CommonTab.trgClassName}`);
              } else {
                return;
              }
              if (!(clickedTrg instanceof HTMLElement)) {
                return;
              }
              clickedTrg.classList.add(CommonTab.toggleClassName);
              const clickedTrgOrder: number = Array.prototype.indexOf.call(
                siblingTrgs,
                clickedTrg
              );
              relatedConts[clickedTrgOrder].classList.add(
                CommonTab.toggleClassName
              );
            }
          },
          false
        );
      }
    }
  }

  static init(): void {
    const target: HTMLCollection = document.getElementsByClassName('js-tab');
    if (target.length) {
      for (let i = 0; i < target.length; i++) {
        if (!(target[i] instanceof HTMLElement)) {
          continue;
        }
        const thisTarget = target[i] as HTMLElement;
        new CommonTab(thisTarget);
      }
    }
  }
}
