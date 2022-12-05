# 組み込まれている動作

インストール、`npm run start`実行後に/test/で確認できます。(準備中)

---

## アコーディオン

- JavaScript: [/src/assets/js/module/common/common-accordion.ts](/src/assets/js/module/common/common-accordion.ts)
- CSS: [src/assets/css/object/component/_accordion.scss](/src/assets/css/object/component/_accordion.scss)

JSは対象の要素のクラスを変更するだけで、動き自体はCSSで実装する系です。

```Pug
div.c-accordion.js-acc
  div.c-accordion__head.js-acc__trg
  div.c-accordion__body
```

`.js-acc__trg`をクリックすると`.js-acc`に`is-open`がトグルされます。

---

## 画像の場所確保

- JavaScript: [/src/assets/js/module/common/placeholder.ts](/src/assets/js/module/common/placeholder.ts)

上手い表現が思いつかないのですが、いわゆるpadding-topで画像の比率を保持するハック的なやつです。

```Pug
div.p-placeholder.js-get-ratio
  div.p-placeholder__spacer.js-get-ratio__spacer
  img.p-placeholder__image.js-get-ratio__item(src=`${_relativePath}assets/img/hoge/fuga.jpg` data-ratio="514/660" alt="")
```

`.js-get-ratio__item`のdata属性`data-ratio`の値を計算して`.js-get-ratio__spacer`に`padding-top`を設定します。  
`data-ratio`の値は`width/height`の形で設定します。  
※`.js-get-ratio__item`などには別途CSSでスタイルを当てる必要があります。

---

## widthをJSでレスポンシブ指定

- JavaScript: [/src/assets/js/module/common/placeholder.ts](/src/assets/js/module/common/set-width.ts)

ブレイクポイント768pxを境にJSでwidthを2種類持たせます。主に画像に使います。

```Pug
div.js-set-width(data-width="7rem/7rem")
  img(src=`${_relativePath}assets/img/hoge/fuga.jpg` alt="")
```

`.js-set-width`のdata属性`data-width`に値を設定します。  
`/`を境に左辺が768px以下用、右辺が768pxより上用です。

---

## タブ

- JavaScript: [/src/assets/js/module/common/common-tab.ts](/src/assets/js/module/common/common-tab.ts)

アコーディオンと同じく、JSはクラスの切り替えを担当し、動作はCSSで行う想定です。

```Pug
div.p-tab.js-tab
  div.p-tab__head
    ul.p-tab-labels
      li.p-tab-labels__item.is-current.js-tab__trg
        ~
      li.p-tab-labels__item.js-tab__trg
        ~
      li.p-tab-labels__item.js-tab__trg
        ~
  div.p-tab__body
    div.p-tab__cont.js-tab__cont.is-current
      ~
    div.p-tab__cont.js-tab__cont
      ~
    div.p-tab__cont.js-tab__cont
      ~
```

`.js-tab__trg`をクリックすると、クリックした要素とそれに対応した`.js-tab__cont`に`.is-current`がトグルされます。  
※それぞれの要素の順番と数は一致させておく必要があります。

---

## スムーススクロール

- JavaScript: [/src/assets/js/module/common/smooth-scroll.ts](/src/assets/js/module/common/smooth-scroll.ts)

普通のスムーススクロールです。href属性が`#`から始まるaタグを対象とし、`.js-go-to-top`を付けるとページ最上部に移動します。

---

## ローディング

- JavaScript: [/src/assets/js/module/common/loading.ts](/src/assets/js/module/common/loading.ts)

[imagesLoaded](https://github.com/desandro/imagesloaded)を利用したローディング画面です。`#js-loading`という要素がない場合はローディングを省略できます。

---

## リサイズマネージャー

- JavaScript: [/src/assets/js/module/common/resize-manager.ts](/src/assets/js/module/common/loading.ts)

ウィンドウのリサイズイベントにあわせて動かしたいJSをまとめて管理できます。  
[common.ts](/src/assets/js/common.ts)に例の記述があるので参考にしてください。(使わない場合はコメントアウトしてください)

```TypeScript
// インポート
import {ResizeManager} from './module/common/resize-manager';

// インスタンス生成
const resizeManager = new ResizeManager();

// 追加
resizeManager.add(hogefn);

// 削除
resizeManager.remove(hogefn);

// 初期化(初回実行を含む)
resizeManager.init();
```
