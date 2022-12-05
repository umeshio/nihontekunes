# website template

- gulp
- webpack
- Pug
- Sass
- TypeScript

で構成される、静的なウェブサイトを作るときのテンプレートです。  

アコーディオンなどよく使いそうな動作がJavaScriptとCSSで実装済みです。  
また、CSSとJSのコードをPrettierとESLint、Stylelintを用いて自動で整形できます。  
詳細等は次の資料を参照してください。

- [Node.jsのインストール方法](document/node.md)
- [Pugについて](document/pug.md)
- [Sass(CSS)について](document/css.md)
- [TypeScript(JavaScript)について](document/js.md)
- [組み込まれている動作について](document/motions.md)
- [コード整形について](document/lint-format.md)

## 不可視ファイルの可視化

.node-versionなど、Macのデフォルトの設定ではファインダーに表示されないドットファイルをたくさん扱います。  
そのため、まだの場合はまずはこれらのファイルを表示させるようにしてください。  

ターミナルで次のコマンドを実行してください。

```Shell
defaults write com.apple.finder AppleShowAllFiles TRUE;killall Finder
```

---

## 環境

- Node.js 16.14.0

Node.jsのバージョンはnodenvで固定しています。

---

## 始め方

```Shell
npm install
```

---

## ファイル構成

開発を`src`ディレクトリで行い、そこで作業した分はコンパイルされ`htdocs`ディレクトリに出力されます。  
CSSは`/src/assets/css/`、JavaScriptは`/src/assets/js/`にあります。  

---

## タスクについて

### 基本

インストール後、次のコマンドを実行すると開発に必要なgulpとwebpackのタスクが実行されます。

```Shell
npm run start
```

- PugをHTMLにコンパイル
- SassをCSSにコンパイル
- TypeScript、JavaScriptをES5にコンパイル
- Browsersyncで動作の確認
- 画像の圧縮

コマンドの詳細については`/package.json`、タスクは`/gulpfile.js`を参照してください。

### 本番環境用

```Shell
npm run release
```

SassやTypescriptが圧縮された形でコンパイルされます。

### Typescript、JavaScriptのコード整形

```Shell
npm run fix-js
```

### Sassのコード整形

```Shell
npm run fix-css
```

---

## その他、参考等

- 「yuheiy/shifted」 [https://github.com/yuheiy/shifted](https://github.com/yuheiy/shifted) (参照: 2022-03-02)
    - SHIFTBRAIN Inc.という東京の制作会社の人(?)が作った高機能な静的サイト制作テンプレートです。より今風で今後の参考になると思います。
- 「SHIFTBRAIN Inc.」 [https://github.com/devjam](https://github.com/devjam) (参照: 2022-03-02)
    - SHIFTBRAIN Inc.のGitHubリポジトリです。テンプレートなどが公開されていて、特にWPのものが参考になると思います。
- 「devjam/boilerplate-wordpress」 [https://github.com/devjam/boilerplate-wordpress](https://github.com/devjam/boilerplate-wordpress) (参照: 2022-03-02)
    - SHIFTBRAIN Inc.のWPテンプレートです。多分社内向けのもので使いこなすにはちょっとハードルが高いかもしれませんが、効率よくかなり良い感じにテーマを作れると思います。
