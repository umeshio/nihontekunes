# Pugについて

Pugを使ってHTMLを生成しています。  
通常のHTMLとは構文が違いますが、共通部分などの全体の管理がしやすいところや、コーディング速度や修正がしやすいというメリットがあるので採用しています。

インデントにスペースやタブが混ざるとエラーになってしまうので、`.editorconfig`を設定することで解決しています。エディターで`.editorconfig`の設定が反映されるように設定してください。

---

## ディレクトリ構造

Pugのコンパイルは、例えば`src/index.pug`が`htdocs/index.html`のように生成されます。  

`_includes/`で共通部分などを扱います。  
`_includes/_base/`にはヘッダーなど基本的な共通部分、`_includes/_template/`はその他のテンプレート化したい、分割したいものなどを保存します。  
`_includes/svg/`はsvgを直接コードで扱いたい場合に使います。インクルードして使うことで可読性を上げる狙いがあります。

```
root/
└── src/
     ├── _data/
     │   └── site.json
     ├── _includes/
     │   ├── _layout.pug
     │   ├── _base/
     │   │   ├── _footer.pug
     │   │   ├── _header.pug
     │   │   ├── _libs.pug
     │   │   ├── _loading.pug
     │   │   ├── _meta.pug
     │   │   └── _script.pug
     │   ├── _svg/
     │   └── _template/
     │        └── _gnav.pug
     └── index.pug
```

このテンプレートを作るにあたり、実際の案件で使っていたものを改良したので、微妙に差があるので注意してください。  
具体的な変更点は次の通りです。

- `_includes/_base/_libs.pug`と`_includes/_base/_script.pug`に記述していたGoogle計測タグを`_includes/_layout.pug`に移動しました。
- 各ページのPugファイル内で使っていた、ルート「まで」の相対パスを格納する`_relativePath`の名前を`relativePath`に変更。また`gulpfile.js`で自動設定化しました。
- 各ページのPugファイル内で使っていた、変数`_pagePrefix`の名前を`pagePrefix`に変更しました。

`_relativePath`について少し補足すると、はこれまで手動でルートまでのパスを書いていましたがそれが必要なくなりました。`relativePath`と変数名が変わっているので注意してください。  
加えて、`absolutePath`という変数(ルート「から」のパス)を追加していますが、これも`gulpfile.js`から自動で設定されるものになります。  
`relativePath`と`absolutePath`は`gulpfile.js`で自動で定義し各ファイルに渡されるため、Pugファイル内で定義する必要はありません。

```diff
-	- var pageUrl= relativePath;
+	- var pageUrl = absolutePath;
-	- var _relativePath= "./";
```

---

### 仕組み

基本的な流れとしては、例えば`src/index.pug`に焦点を当てると、次のようになっています。

1. index.pugから_layout.pugをインクルード
1. _layout.pugで_meta.pugや_header.pugなどをインクルード
1. index.pugで変数を上書きして各インクルードファイルに反映させる

以下は各ファイルの説明になります。

---

### _data/site.json

サイトの名前やURLなどのサイト固有の情報をJSONで一括管理します。

```JSON
{
  "name": "サイトタイトル",
  "description": "サイトの概要",
  "keywords": "サイトのキーワード1, サイトのキーワード2",
  "rootUrl": "https://hogefugapiyo.com",
  "ogpImage": "https://hogefugapiyo.com/assets/img/common/ogp.png",
}
```

`gulpfile.js`から`site.json`を読み込んでいるので、どのPugファイルからでも`site.name`のようにして値を取得することができます(`gulpfile.js`で`site`に格納するように指定をしています)。

---

### index.pug(例)

ページの作成をする場合は、通常のHTMLと同じように`index.pug`や`test/index.pug`のように名前をつけます。  

このテンプレートではトップページとして`/src/index.pug`を用意しています。  
`extend`によって`_includes/_layout.pug`をインクルードしています。

```pug
extend /_includes/_layout
append variables
  - var pageTitle = "";
  - var pageDescription = site.description;
  - var pageKeywords = site.keywords;
  - var pageOgpTitle = "";
  - var pageOgpImage = site.ogpImage
  - var pageLang = "ja";
  - var pageOgpType = "website";
  - var pageUrl = absolutePath;
  - var pagePrefix = "home";

block content
  ......
```

`append variables`以下では`var`に続く変数を変更することで出力される内容を変えることができます。  

- `pageTitle`: のページの`<title>`タグの値を指定します。""のように空にするとサイトのタイトルだけになり、"ページタイトル"のように値を渡すと、ページタイトル | サイトタイトルのようになります。
- `pageDescription`: そのページの概要を記述します。
- `pageKeywords`: そのページのキーワードを記述します。値を空にすると出力されません。
- `pageOgpTitle`: OGPで使用するタイトルを記述します。ページのタイトルと同じ場合は変数`pageTitle`を記述、違う場合は文字列で記述してください。
- `pageOgpImage`: OGPで使用する画像へのパスを記述します。サイト共通の画像を指定する場合は`site.ogpImage`のままにしておきます。
- `pageOgpType`: そのページの種類を記述します。サイトトップページは`website`、それ以外は`article`を指定します。
- `pageUrl`: ルートからそのページへの相対パスです。`absolutePath`は`gulpfile.js`内の記述によって自動で定義されファイルに渡されています。
- `pagePrefix`: 条件分岐などで使用するためにWPのスラッグのようなものを設定しておきます。

`pageUrl`と`absolutePath`について補足すると、site.urlにはサイトのドメインが格納されているので、次のように記述するとページごとの絶対パスを出力することもできます。

```Pug
//- src/about/index.pugの場合 ※pageUrlはabsolutePathでも可
a(href=`${site.url}${pageUrl}`)
```

```HTML
<a href="https://hogefugapiyo.com/about/"></a>
```

コンテンツは`block content`の下に記述します。`_layout.pug`でヘッダーやフッターなどの共通部分は自動で出力されます。

```Pug
block content
  p ここから記述していきます。
```

#### このテンプレートと実案件の差異(変数部分)

- `_relativePath`: 削除しました。代わりに`relativePath`が`gulpfile.js`から自動で定義されます。役割としては、ルートまでの相対パスを格納していて、これを変数化することでPugファイル内での記述を`` src=`${relativePath}assets/img/other/dummy.jpg` ``のように階層が深くなっても同じにすることができます。(WPの関数`get_template_directory_uri()`みたいなノリです)
- `_pagePrefix`: `pagePrefix`となりました。

---

### _includes

`_includes/`にはサイトの共通部分が保存されています。

#### _includes/_layout.pug

必要な共通ファイルをインクルードするファイルです。

```Pug
block variables
doctype html
html(lang=pageLang)
  head
    include /_includes/_base/_meta
    include /_includes/_base/_libs
  body(id=_idName)
    div#js-body.l-body
      include /_includes/_base/_header
      if _pagePrefix == 'home'
        - var _className = ['l-main'];
      else
        - _className = ['l-main', 'l-main--type_subpage'];
      div#js-main(class=_className)
        block content
      include /_includes/_base/_footer
      div.p-modal-layer#js-modal-layer
    include /_includes/_base/_loading
    include /_includes/_base/_script
```

`block variables`と記述していることで、例えば`/src/index.pug`で

```Pug
extend /_includes/_layout
append variables
```

とすると変数の上書きをすることができます。  
他言語対応などで共通ファイルを追加したい場合は、`_layout_en.pug`や`_header_en.pug`のように別のファイルとして分けます。  
各ページのPugファイルはなるべくプレーンな状態を保って、`_layout.pug`を用途によって使い分けた方が変更に強くなると思います。

#### _includes/base/_meta.pug

`_includes/base/_meta.pug`は`<head>`タグ内のメタ情報を定義しています。  
`page`で始まる変数は各ページのPugファイルで変更ができます。`site`で始まる変数は`site.json`で定義しているサイト固有のものになります。

```Pug
meta(charset="UTF-8")
meta(http-equiv="X-UA-Compatible" content="IE=edge")
meta(name="viewport" content="width=device-width")
meta(name="format-detection" content="telephone=no")
if pageTitle
  title #{pageTitle} | #{site.name}
else
  title #{site.name}
meta(name="description" content=pageDescription)
meta(name="keywords" content=pageKeywords)

block css
  link(rel="stylesheet" href=`${relativePath}assets/css/style.css`)

//- icons
link(rel="apple-touch-icon" href=`${relativePath}assets/img/common/apple-touch-icon.png`)
link(rel="icon" href=`${relativePath}assets/img/common/favicon.png`)

//- OGP
if pageOgpTitle
  meta(property="og:title" content=pageOgpTitle + ' | ' + site.name)
else
  meta(property="og:title" content=site.name)
meta(property="og:type" content=pageOgpType)
meta(property="og:image" content=pageOgpImage)
meta(property="og:url" content=site.rootUrl + pageUrl)
meta(property="og:description" content=pageDescription)
meta(property="og:site_name" content=site.name)
meta(property="og:locale" content=pageLang)

//- OGP Facebook insights
meta(property="fb:admins" content="")
meta(property="fb:app_id" content="")
//- /OGP Facebook insights

//- OGP Twitter Cards
meta(name="twitter:card" content="summary_large_image")
//- /OGP Twitter Cards
//- /OGP
```

OGPまわりなど不要なものは削除しても大丈夫です。

---

#### _includes/base/_libs.pug

`_includes/base/_libs.pug`ではJSのライブラリなどを読み込ませています。ライブラリをnpmで管理するとあまり使わないかもしれません。

```Pug
block libs
  script(src=`${relativePath}assets/js/viewport.bundle.js`)
```

---

#### _includes/base/_script.pug

`_includes/base/_script.pug`ではJavaScriptを読み込ませています。

```Pug
block js
  script(src=`${relativePath}assets/js/vendor.bundle.js`)
  script(src=`${relativePath}assets/js/common.bundle.js`)
  script(src=`${relativePath}assets/js/test.bundle.js`)
```

前項の`_libs.pug`と、`_includes/_layout.pug`も同じなのですが、ポイントは`block ~`としているところです。  
各ページのPugファイルでappendすることでコードを追加(挿入)することができるようになります。

例えば、`/src/index.pug`で以下のように`append`すると、  

```Pug
append js
  script(src="/assets/js/index.js")

block content
```

このように出力されます。

```HTML
<script src="/assets/js/vendor.bundle.js"></script>
<script src="/assets/js/common.bundle.js"></script>
<script src="/assets/js/test.bundle.js"></script>
<script src="/assets/js/index.js"></script>
```

---

## 参考

- 「Pug(Jade)で効率的なマークアップ環境を作る」 [https://www.tam-tam.co.jp/tipsnote/html_css/post10973.html](https://www.tam-tam.co.jp/tipsnote/html_css/post10973.html) (参照: 2022-03-01)
- 「覚えるのはこれだけ！Pug(Jade)のよく使う9つの書き方」 [https://www.tam-tam.co.jp/tipsnote/html_css/post12789.html](https://www.tam-tam.co.jp/tipsnote/html_css/post12789.html) (参照: 2022-03-01)
