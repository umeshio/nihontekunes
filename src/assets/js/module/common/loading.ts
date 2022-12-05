// loading
import imagesLoaded from 'imagesloaded';
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const objectFitImages = require('object-fit-images');

export class Loading {
  loadedFlag: boolean;
  isRunning: boolean;
  root: HTMLElement | null;
  loadingElm: HTMLElement | null;
  loadedImg: number;
  imgLength: number;
  progressElm: HTMLElement | null;
  progressCurrent: number;
  timer: number;
  ofiTarget: HTMLCollection;

  constructor() {
    this.loadedFlag = false;
    this.isRunning = false;
    // ▼imagesloaded
    this.root = document.querySelector('html');
    this.loadingElm = document.getElementById('js-loading');
    this.loadedImg = 0;
    this.imgLength = imagesLoaded('body', {background: true}).images.length;
    this.progressElm = document.getElementById('js-progress');
    this.progressCurrent = 0;
    this.timer = 0;
    // ▼ofi
    this.ofiTarget = document.getElementsByClassName('js-ofi');

    this.start();
  }

  start(): void {
    if (this.loadingElm) {
      imagesLoaded(this.loadingElm, (): void => {
        this.timer = window.setInterval(
          this.monitorProgress.bind(this),
          1000 / 50
        );
        imagesLoaded('body', {background: true}).on('progress', () => {
          this.loadedImg++;
        });
      });
    } else {
      this.clearLoading();
    }
  }

  monitorProgress(): void {
    const progressPer: number = (this.loadedImg / this.imgLength) * 100;
    this.progressCurrent += (progressPer - this.progressCurrent) * 0.1;
    if (this.progressElm) {
      this.progressElm.style.width = `${this.progressCurrent}%`;
    }
    if (this.progressCurrent >= 100) {
      this.clearLoading();
    }
    if (this.progressCurrent > 99.9) {
      this.progressCurrent = 100 + 10;
    }
  }

  clearLoading(): void {
    clearInterval(this.timer);
    // window.scrollTo(0, 0);
    if (this.ofiTarget.length) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      objectFitImages(this.ofiTarget);
    }
    if (this.root) {
      this.root.classList.add('is-loaded');
    }
    if (this.loadingElm) {
      this.loadingElm.classList.add('is-hidden');
    }
    // this.animation();
    this.loadedFlag = true;
  }
}
