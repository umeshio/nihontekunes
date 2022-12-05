/* ****************************************************************************************************

  # viewport.js

**************************************************************************************************** */
export const viewport = (): void => {
  const ua = navigator.userAgent;
  const metaElement: HTMLMetaElement | null = document.querySelector(
    'meta[name="viewport"]'
  );
  if (metaElement === null) {
    return;
  }
  // ▼タブレット
  if (
    (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') == -1) ||
    ua.indexOf('iPad') > 0 ||
    ua.indexOf('Kindle') > 0 ||
    ua.indexOf('Silk') > 0
  ) {
    // metaElement.setAttribute('content', 'width=1024');
    // metaElement.setAttribute('content', 'width=device-width');
    // ▼スマホios
  } else if (ua.indexOf('iPhone') > 0) {
    metaElement.setAttribute('content', 'width=device-width, user-scalable=no');
    // ▼スマホdoroid
  } else if (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
    // metaElement.setAttribute('content', 'width=device-width');
    // ▼PC
  } else {
    // metaElement.setAttribute('content', 'width=1100');
  }
};
