//- スムーススクロール
export class SmoothScroll {
  target: HTMLAnchorElement;
  startPositionX: number;
  startPositionY: number;
  endPositionX: number;
  endPositionY: number;
  startTime: number;
  animationId: number;
  duration: number;
  constructor(target: HTMLAnchorElement) {
    this.target = target;
    this.startPositionX = 0;
    this.startPositionY = 0;
    this.endPositionX = 0;
    this.endPositionY = 0;
    this.startTime = 0;
    this.animationId = 0;
    this.duration = 700;

    this.bindEvent();
  }

  bindEvent(): void {
    this.target.addEventListener(
      'click',
      (e: MouseEvent): void => {
        if (!(e.target instanceof HTMLElement)) {
          return;
        }
        // デフォルトの挙動をキャンセル
        e.preventDefault();
        e.stopPropagation();
        if (e.target === null) {
          return;
        }
        const eventTarget: HTMLElement = e.target;
        let clickedTarget: HTMLElement | null = null;
        if (!(eventTarget instanceof HTMLAnchorElement)) {
          clickedTarget = eventTarget.closest('a[href^="#"]');
        } else if (eventTarget instanceof HTMLAnchorElement) {
          clickedTarget = eventTarget;
        }
        if (clickedTarget === null) {
          return;
        }
        // スクロール先の要素のY座標
        let targetY: number;
        if (clickedTarget.classList.contains('js-go-to-top')) {
          targetY = 0;
        } else {
          // スクロール先の要素のidを取得
          const destinationElmId: string | null =
            clickedTarget.getAttribute('href');
          if (destinationElmId === null) {
            return;
          }
          // href="#"の場合は何もしない（ページトップへは行かない）
          if (destinationElmId === '#') {
            return;
          }
          // スクロール先の要素を取得
          const destinationElm: HTMLElement | Element | null =
            document.getElementById(destinationElmId.replace('#', ''));
          if (
            destinationElm === null ||
            !(destinationElm instanceof HTMLElement)
          ) {
            return;
          }
          // ページ全体の高さ
          const documentHeight: number = document.body.clientHeight;
          // スクロール先の要素のY座標取得
          // let targetY: number;
          // ターゲットのY座標+ウィンドウ高さがページ全体の高さを超えたとき（＝そこまでスクロールできない）は、ページ一番したまでの位置を取得
          if (destinationElm.offsetTop + window.innerHeight > documentHeight) {
            targetY = documentHeight - window.innerHeight;
          } else {
            // スクロール先の要素のY座標
            // targetY = destinationElm.offsetTop;
            targetY =
              destinationElm.getBoundingClientRect().top + window.pageYOffset;
          }
        }
        // アニメーションを実行
        this.exeScroll(targetY);
      },
      false
    );
  }

  getEasing(num: number): number {
    // return time < .5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;
    return 1 - Math.pow(1 - num, 4);
  }

  animation(): void {
    const progress: number = Math.min(
      1,
      (Date.now() - this.startTime) / this.duration
    );
    const scrollValX: number =
      this.startPositionX +
      (this.endPositionX - this.startPositionX) * this.getEasing(progress);
    const scrollValY: number =
      this.startPositionY +
      (this.endPositionY - this.startPositionY) * this.getEasing(progress);
    window.scrollTo(scrollValX, scrollValY);
    if (progress < 1) {
      this.animationId = requestAnimationFrame(() => {
        this.animation();
      });
    }
  }

  cancelScroll(): void {
    window.cancelAnimationFrame(this.animationId);
  }

  exeScroll(destinationY: number, destinationX?: number): void {
    this.startPositionX = window.scrollX;
    this.startPositionY = window.scrollY;
    this.endPositionX = destinationX != null ? destinationX : window.scrollX;
    this.endPositionY =
      destinationY != null ? destinationY - 100 : window.scrollY;
    this.startTime = Date.now();
    this.animation();
  }

  static init(): void {
    const target: NodeList = document.querySelectorAll('a[href^="#"]');
    if (target.length) {
      for (let i = 0; i < target.length; i++) {
        if (!(target[i] instanceof HTMLAnchorElement)) {
          continue;
        }
        const thisTarget = target[i] as HTMLAnchorElement;
        new SmoothScroll(thisTarget);
      }
    }
  }
}
