# Sass(CSS)について

CSSはSass(Dart Sass)を使って生成しています。  
gulpでコンパイルし、ベンダープレフィックスは自動で付与されます。設定については`/gulpfile.js`を参照してください。

## CSS設計

FLOCCSを参考にしています。  
解説など色々検索すると出てきますが、考案者が販売している資料があるのでそちらも参照してください。  

- [谷拓樹『芝犬でもわかるFLOCSS』](https://ate-u.heteml.net/dl/document/flocss-techbook.pdf)
    - 会社で使ってるヘテムルのサーバーの`web/dl`にアップしています。いつものBasic認証に加えて、.htaccessで会社のIPのみ許可する制限を掛けています。
    - `document`ディレクトリを新規に作りました。必要なくなったら削除してください。

---

## ディレクトリ構造

`src/assets/css`以下にあるアンダースコア付きの`.scss`ファイルが`style.scss`によってインポートされます。  
FLOCSSの考え方を基に、4つのレイヤーに大きくわかれています。

1. foundation
    * base
    * function
    * mixin
    * tool
    * variable
1. layout
1. object
    * component
    * project
    * theme
    * utility
1. plugin

```
root/
└── src/
     └── assets/
          └── css/
               ├── foundation/
               │   ├── base/
               │   ├── function/
               │   ├── mixin/
               │   ├── tool/
               │   └── variable/
               ├── layout/
               ├── object/
               │   ├── component/
               │   ├── project/
               │   ├── scope/
               │   ├── theme/
               │   └── utility/
               └── plugin/
```

### foundation

foundationには変数や関数、リセット用スタイルやタイプセレクターのベーススタイルなどがあります。  
変数は`foundation/base`、mixinは`foundation/mixin`で管理しています。  
色やフォントサイズなどサイト全体で利用したい変数を`foundation/variable`で管理し、`foundation/tool`にある`_global.scss`でまとめてそれぞれのファイルに先頭で読み込ませています。

```SCSS
@use '../foundation/tool/global';
```

この辺りのDart Sassの利用方法などは次のサイトを参考にしてください。  

「Sassを@importから@useに置き換えるための手引き」 [https://kojika17.com/2020/05/next-generation-sass-module-system.html](https://kojika17.com/2020/05/next-generation-sass-module-system.html) (参照: 2022-03-01)

---

### layout

layoutはコンテンツ内の余白やレイアウトを指定するレイアウト専用です。  
このレイヤーで扱うものは「デザインのワイヤーフレームに描かれるような大きな要素」を基準としますが、layoutは使わず、objectレイヤーで対応した方が分かりやすいとも言われています。

---

### object

主にこのレイヤーにCSSを記述していくことになります。  

#### component

サイト全体で繰り返し使えそうな見出しやボタンなどの最小単位のパーツを扱います。

#### project

サイト全体に使えるパーツを扱いますが、componentより大きいイメージで、複数のcomponentを組み合わせてできるパーツを扱ったりします。

#### scope

サイトのひとつの場所でしか出てこないものを扱います。1箇所だけに限定することで、編集するときの影響範囲を分かりやすくしています。

#### theme

themeは色などに関するCSSです。このクラスをつけると赤色になる、といったイメージです。

#### utility

余白調整など汎用的に使えるクラスを扱います。

---

### plugin

プラグイン用のCSSを扱いたい場合はこれを利用してください。上書きすることが多いと思うので、foundationのbaseの次あたりで読み込ませるようにすると良いと思います。

---

## 参考

### FLOCSS

-  [谷拓樹『芝犬でもわかるFLOCSS』](https://ate-u.heteml.net/dl/document/flocss-techbook.pdf)
- 「hiloki/flocss」 [https://github.com/hiloki/flocss](https://github.com/hiloki/flocss) (参照: 2022-03-01)
- 「CSSの設計 – FLOCSSをベースにしたファイルの構成と命名規則を考える」 [https://www.tam-tam.co.jp/tipsnote/html_css/post10205.html](https://www.tam-tam.co.jp/tipsnote/html_css/post10205.html) (参照: 2022-03-01)
- 「みんなのオレ流FLOCSSをまとめてみた」 [https://qiita.com/cheez921/items/861d9446aded7d02a04f](https://qiita.com/cheez921/items/861d9446aded7d02a04f) (参照: 2022-03-01)
- 「みんなが知ってるような知らないようなFLOCSSの話」 [https://hiloki.github.io/s/flocss-layout/](https://hiloki.github.io/s/flocss-layout/) (参照: 2022-03-01)
- 「FLOCSSを扱いきれないあなたに贈る、スリムなCSS設計の話」 [https://webnaut.jp/technology/20170407-2421/](https://webnaut.jp/technology/20170407-2421/) (参照: 2022-03-02)
- 「\[CSS設計\] 私のためのFLOCSSまとめ」 [https://qiita.com/super-mana-chan/items/644c6827be954c8db2c0](https://qiita.com/super-mana-chan/items/644c6827be954c8db2c0) (参照: 2022-03-02)
- 「FLOCSSを使ったCSS設計での悩みどころと解決案」 [https://qiita.com/uggds/items/d904b2f9a103c37a25fa](https://qiita.com/uggds/items/d904b2f9a103c37a25fa) (参照: 2022-03-02)
- 「Projectレイヤーを使いこなす！ – FLOCSSで始めるCSS設計」 [https://www.to-r.net/media/floccs-04/](https://www.to-r.net/media/floccs-04/) (参照: 2022-03-02)
- 「CSSのクラス名を決めるときに使うリストをつくりました」 [https://qiita.com/manabuyasuda/items/dbb76ed36970bec95470](https://qiita.com/manabuyasuda/items/dbb76ed36970bec95470) (参照: 2022-03-01)

### BEM(クラス名についている2つ連続のアンダーバーやハイフンの意味)

- 「BEM(MindBEMding)によるCSS設計」 [https://github.com/manabuyasuda/styleguide/blob/master/how-to-bem.md](https://github.com/manabuyasuda/styleguide/blob/master/how-to-bem.md) (参照: 2022-03-01)
- 「一番詳しいCSS設計規則BEMのマニュアル」 [https://qiita.com/Takuan_Oishii/items/0f0d2c5dc33a9b2d9cb1](https://qiita.com/Takuan_Oishii/items/0f0d2c5dc33a9b2d9cb1) (参照: 2022-03-02)
- 「細かすぎるけど伝わってほしい私的BEMプラクティス30（ぐらい）」 [https://necomesi.jp/blog/tsmd/posts/152](https://necomesi.jp/blog/tsmd/posts/152) (参照: 2022-03-02)

### Dart Sass
- 「Sassを@importから@useに置き換えるための手引き」 [https://kojika17.com/2020/05/next-generation-sass-module-system.html](https://kojika17.com/2020/05/next-generation-sass-module-system.html) (参照: 2022-03-01)
- 「Dart Sass（@use）の基本的な書き方と@importから乗り換える方法」 [https://haniwaman.com/dart-sass/](https://haniwaman.com/dart-sass/) (参照: 2022-03-01)
- 「Dart-Sassの@import廃止対応で詰まったこと」 [https://zenn.dev/kyurio/articles/a947fee91a5067](https://zenn.dev/kyurio/articles/a947fee91a5067) (参照: 2022-03-01)
- 「Dart Sass、使ってる？Preprosを使えばコンパイルも楽勝！」 [https://www.webcreatorbox.com/tech/dart-sass](https://www.webcreatorbox.com/tech/dart-sass) (参照: 2022-03-01)
