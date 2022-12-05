# TypeScript(JavaScript)について

ファイルは`src/assets/js`にあります。それらをBabel(バージョン7)とwebpack(バージョン5)でTypeScript、ES2015以降の書き方をES5にコンパイルしています。  
デフォルトの状態で開発作業を開始すると、`htdocs/assets/js/vendor.bundle.js`に次のファイルが出力されます。

- common.bundle.js: アコーディオンなどサイト全体で使用される動作
- vendor.bundle.js: jQueryなどのプラグイン
- viewport.bundle.js: デバイスごとにviewportの値を変更する機能
- (test.bundle.js): jQueryを利用したファイルのテスト

jQuery(バージョン3.6.0)はnpmで管理しています。[package.json](/package.json)を参照してください。

コンパイルする設定ファイルは[webpack.config.js](/webpack.config.js)です。もし新規にJSファイルを扱いたい場合はエントリーポイントを追加してください。

```JavaScript
module.exports = {
  // モード値をproductionに設定すると最適化された状態で、developmentに設定するとソースマップ有効でJSファイルが出力される
  // cross-envで値を管理(package.json参照)
  // "start": "cross-env NODE_ENV=development gulp",
  // "release": "cross-env NODE_ENV=production gulp build",
  mode: process.env.NODE_ENV || 'development',
  // エントリーポイントを設定する。「common」と「viewport」を設定しているが、別途追加したい場合は「test」のように記述する
  entry: {
    common: './src/assets/js/common.ts',
    viewport: './src/assets/js/viewport.ts',
    test: './src/assets/js/test.js',
  },
  ......
```

---

## ディレクトリ構成

`src/assets/js`直下にあるファイルがエントリーポイントです。  
`common.ts`で`src/assets/js/module/common/`のファイルをインポートしています。それぞれのファイルの役割については[組み込まれている動作について](./motions.md)を参照してください。  
プラグインはnpmで管理することを想定していますが、もし手動で追加し、`vendor.bundle.js`に組み込ませたい場合は`src/assets/js/vendor`を利用してください。

```
root/
└── src/
     └── assets/
          └── js/
               ├── common.ts
               ├── test.js
               ├── viewport.ts
               └── module/
                    ├── common/
                    │   ├── common-accordion.ts
                    │   ├── common-scroll.ts
                    │   ├── common-tab.ts
                    │   ├── loading.ts
                    │   ├── placeholder.ts
                    │   ├── resize-manager.ts
                    │   ├── set-gnav.ts
                    │   ├── set-width.ts
                    │   ├── smooth-scroll.ts
                    │   ├── test.ts
                    │   └── viewport.ts
                    └── vendor/
```

---

## 参考

### webpack

- 「最新版で学ぶwebpack 5入門 Babel 7でES2021環境の構築 (React, Vue, Three.js, jQueryのサンプル付き)」 [https://ics.media/entry/16028/](https://ics.media/entry/16028/) (参照: 2022-03-01)
- 「レガシーなJavaScript構成をWebpackでモジュール化するリファクタリング方法」 [https://www.hypertextcandy.com/modularize-javascript-codes-with-webpack](https://www.hypertextcandy.com/modularize-javascript-codes-with-webpack) (参照: 2022-03-01)
- 「webpack 4 の optimization.splitChunks の使い方、使い所 〜廃止された CommonsChunkPlugin から移行する〜」 [https://qiita.com/soarflat/items/1b5aa7163c087a91877d](https://qiita.com/soarflat/items/1b5aa7163c087a91877d) (参照: 2022-03-01)

### TypeScript

- 「TypeScript入門『サバイバルTypeScript』〜実務で使うなら最低限ここだけはおさえておきたいこと〜」 [https://typescriptbook.jp/](https://typescriptbook.jp/) (参照: 2022-03-03)
- 「TypeScript学習ロードマップ」 [https://qiita.com/irico/items/33744e15a4e0ca52d6bc](https://qiita.com/irico/items/33744e15a4e0ca52d6bc) (参照: 2022-03-03)
- 「JS知識ほぼ0からTypeScript入門してる」 [https://tanishiking24.hatenablog.com/entry/2016/12/23/000000](https://tanishiking24.hatenablog.com/entry/2016/12/23/000000) (参照: 2022-03-03)
- 「tsconfig.jsonの全オプションを理解する（随時追加中）」 [https://qiita.com/ryokkkke/items/390647a7c26933940470](https://qiita.com/ryokkkke/items/390647a7c26933940470) (参照: 2022-03-03)
- 「JavaScriptによるDOM操作」 [https://qiita.com/takeshisakuma/items/9e0c3b9800c307740593](https://qiita.com/takeshisakuma/items/9e0c3b9800c307740593) (参照: 2022-03-03)
- 「TypeScript で querySelector メソッドを使うときに型引数を指定する」 [https://developer.hatenastaff.com/entry/2020/12/12/121212](https://developer.hatenastaff.com/entry/2020/12/12/121212) (参照: 2022-03-03)
- 「TypeScript を導入して 1 年が経って感じた良かったこと・困ったこと」 [https://buildersbox.corp-sansan.com/entry/2021/06/24/110000](https://buildersbox.corp-sansan.com/entry/2021/06/24/110000) (参照: 2022-03-03)

### JavaScript

- 「オブジェクト指向JavaScriptによるフロントエンドコンポーネント開発」 [https://www.hypertextcandy.com/object-oriented-javascript](https://www.hypertextcandy.com/object-oriented-javascript) (参照: 2022-03-03)
- 「JavaScriptの設計について考える - 機能ごとに分類する」 [http://tech.leihauoli.com/post/2014/11/10/program-design-1.html](http://tech.leihauoli.com/post/2014/11/10/program-design-1.html) (参照: 2022-03-03)
- 「モダンJSの基礎を改めておさらいする【ES2015】」 [https://www.whizz-tech.co.jp/1644/](https://www.whizz-tech.co.jp/1644/) (参照: 2022-03-03)
- 「さすがにそろそろ JavaScript の new (あと継承も)について理解したいと思っているあなたに。」 [https://www.agent-grow.com/self20percent/2019/07/29/what-is-javascript-new/](https://www.agent-grow.com/self20percent/2019/07/29/what-is-javascript-new/) (参照: 2022-03-03)
- 「Google流JavaScriptにおけるクラス定義の実現方法(ES6以前)」 [https://www.yunabe.jp/docs/javascript_class_in_google.html](https://www.yunabe.jp/docs/javascript_class_in_google.html) (参照: 2022-03-03)
- 「JavaScript初心者にclassを伝える」 [https://qiita.com/jpnykw/items/248f99c94c00c3d1aa27](https://qiita.com/jpnykw/items/248f99c94c00c3d1aa27) (参照: 2022-03-03)
- 「JSモジュール化】ファイル分割してわかりやすいプログラムを書こう！ | 作っちゃうおじさん制作記録」 [https://hothukurou.com/blog/post-2851](https://hothukurou.com/blog/post-2851) (参照: 2022-03-03)
- 「オブジェクト指向が5000%理解できる記事」 [https://qiita.com/ICT_hero/items/b2f8e39d7cc23ad505f9](https://qiita.com/ICT_hero/items/b2f8e39d7cc23ad505f9) (参照: 2022-03-03)
- 「JavaScriptのオブジェクト指向が10%理解できる記事（実践編）」 [https://qiita.com/uhyo/items/ab8e273e1eb71d02e29a](https://qiita.com/uhyo/items/ab8e273e1eb71d02e29a) (参照: 2022-03-03)
- 「中上級者になるためのJavaScript」 [https://kenju.gitbooks.io/js_step-up-to-intermediate/content/](https://kenju.gitbooks.io/js_step-up-to-intermediate/content/) (参照: 2022-03-03)
    - PDF版:  [https://ate-u.heteml.net/dl/document/js_step-up-to-intermediate.pdf](https://ate-u.heteml.net/dl/document/js_step-up-to-intermediate.pdf)
