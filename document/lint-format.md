# Typescript(JavaScript)とSassのコード整形について

PrettierとESLint、Stylelintを併用して、コードのエラーチェックをしながら整形もできるようになっています。  
`npm run fix-js`でTypescript、`npm run fix-css`でSassの整形が行われます。それぞれPrettier -> ESLint / StyleLintの順番に実行されます。  
また、[Husky](https://github.com/typicode/husky)と[lint-staged](https://github.com/okonet/lint-staged)を利用して、git commit時には自動で実行されます。

Prettier、ESlint、Stylelintすべて特別な設定はしていないので気になる整形はされないと思いますが、目立って変わる点は次の通りです。

- Prettier(CSS、JS、PHPなど色々なファイルに適用され、整形は主にPrettierが行います)
    - 1行あたりの文字数が80文字ぐらいになる
    - 文字列リテラルはシングルクォートで囲まれる
    - 空白行が1行になる
- Stylelint(Sassに適用されます)
    - プロパティの記述順が自動で整列される

JSはESLintが担当します。

Prettierで気に入らないところは`.prettierrc.yml`で、ESLintは`.eslintrc.js`、StyleLintは`.stylelintrc.yml`で調整します。  

エディターの拡張機能を追加すると、コマンドでの操作を行わずとも保存のタイミングで設定ファイル通りにチェック、整形を行ってくれます。  
VSCode用になりますが、[「PrettierとESLint・Stylelintの併用」](https://rinoguchi.net/2021/12/prettier-eslint-stylelint.html)このページの下の方にある`VSCodeの設定`が参考になると思います。

> ここまでで、CLI でリンターとフォーマッターを実行できるようになりました。
> 次は、VSCode 上でリントエラーを確認したり、ファイル保存時に自動フォーマットされるようにしたいと思います。
>
> まずは、以下の三つの VSCode 拡張をインストールします。
> 
> - Prettier - Code formatter
> - ESLint
> - Stylelint
>
> これらをインストールするだけで、設定ファイルに従ってリントエラーがエディタ上で確認できるようになります。
> さらに、保存時に自動フォーマットされるように、VSCodeの設定ファイル（.vscode/settings.json）を作成します。

「PrettierとESLint・Stylelintの併用」 [https://rinoguchi.net/2021/12/prettier-eslint-stylelint.html](https://rinoguchi.net/2021/12/prettier-eslint-stylelint.html) (参照: 2022-03-03)  

以下はメモ程度にはなりますが、設定ファイル等それぞれの説明になるので参考にしてください。

---

## PrettierとESLint、Stylelintの併用について

> [FYI]現在は非推奨のライブラリ群
> 参考までですが、昔の記事とかを見ると出てくる、現在は非推奨になったライブラリたちを紹介しておきます。使わないように気をつけましょう。
> - prettier-eslint
>   - prettierで処理した結果を、eslint —fixに渡すことができるが、実行が遅いので推奨ではないらしい
> - eslint-plugin-prettier
>   - eslint --fix実行時に、prettierを実行するプラグイン。現在は非推奨
> - stylelint-prettier
>   - styleint実行時にprettierを実行するものだが、現在は非推奨
>   - https://prettier.io/docs/en/integrating-with-linters.html#notes

「PrettierとESLint・Stylelintの併用」 [https://rinoguchi.net/2021/12/prettier-eslint-stylelint.html](https://rinoguchi.net/2021/12/prettier-eslint-stylelint.html) (参照: 2022-02-21)

### 参考

- 「マナリンクのソースコード整形（Prettier, ESLint, StyleLint）設定-2021年5月版」 [https://zenn.dev/manalink/articles/manalink-prettier-stylelint-eslint-202105](https://zenn.dev/manalink/articles/manalink-prettier-stylelint-eslint-202105) (参照: 2022-02-21)
- 「Prettier と ESLint の組み合わせの公式推奨が変わり plugin が不要になった」 [https://blog.ojisan.io/prettier-eslint-cli/#%E7%B5%90%E5%B1%80%E3%81%A9%E3%81%86%E8%A8%AD%E5%AE%9A%E3%81%97%E3%81%9F%E3%82%89%E3%81%84%E3%81%84%E3%81%AE%E3%81%8B](https://blog.ojisan.io/prettier-eslint-cli/#%E7%B5%90%E5%B1%80%E3%81%A9%E3%81%86%E8%A8%AD%E5%AE%9A%E3%81%97%E3%81%9F%E3%82%89%E3%81%84%E3%81%84%E3%81%AE%E3%81%8B) (参照: 2022-02-18)
- 「Prettier 入門 ～ESLintとの違いを理解して併用する～」 [https://qiita.com/soarflat/items/06377f3b96964964a65d](https://qiita.com/soarflat/items/06377f3b96964964a65d) (参照: 2022-02-21)
- 「PrettierとESLint・Stylelintの併用」 [https://rinoguchi.net/2021/12/prettier-eslint-stylelint.html](https://rinoguchi.net/2021/12/prettier-eslint-stylelint.html) (参照: 2022-02-21)
- 「husky v7とlint-stagedでコミット時にリント実行」 [https://rinoguchi.net/2021/12/husky-and-lint-staged.html](https://rinoguchi.net/2021/12/husky-and-lint-staged.html) (参照: 2022-02-22)

---

## Prettierについて

> Prettier の一番の特徴は、Opinionated（独断的な） コードフォーマッターであることを標榜していることです。 これは、ユーザーに自由なカスタマイズを許さず、「Prettier 自身が定義しているスタイルに強制的にフォーマットするよ」ということです（セミコロンの有無など最低限の設定はできます）。 これにより、コーディングスタイルに関する不毛な議論を避けることができ、プロジェクト内のコーディングスタイルを簡単に統一することができます。  
> もちろん、自分がベストだと思っているスタイルでフォーマットすることはできなくなるかもしれませんが、そんな些細なことよりも、アプリケーション（成果物）を作り上げることに集中すべきだという考え方です。

「TypeScript コードを Prettier で自動整形する」 [https://maku.blog/p/au8iu6u/](https://maku.blog/p/au8iu6u/)

### .prettierrc.yml

設定ファイル。  
内容: [Options / Prettier](https://prettier.io/docs/en/options.html)

> このプロジェクトが Prettier を使用していることを知らせるために、設定ファイル（.prettierrc.json や .prettierrc.yml）を作成しておきます。 拡張子を省略して .prettierrc というファイル名にすると、JSON 形式と YAML 形式のどちらでも記述できますが、エディタの補完機能などを有効にするために、.prettierrc.yml のように拡張子は明示しておいた方がよいでしょう。 特別な設定をしないのであれば、設定内容は空っぽで構いません（JSON 形式であれば {}、YAML 形式であれば本当に何も書かないで OK）。
> コメントを入れるために YAML 形式で記述しています

「TypeScript コードを Prettier で自動整形する」 [https://maku.blog/p/au8iu6u/](https://maku.blog/p/au8iu6u/)

### 参考

- 「TypeScript コードを Prettier で自動整形する」 [https://maku.blog/p/au8iu6u/](https://maku.blog/p/au8iu6u/) (参照: 2022-02-18)

---

## ESLintについて

主に[TypeScript + Node.jsプロジェクトにESLint + Prettierを導入する手順2020](https://qiita.com/notakaos/items/85fd2f5c549f247585b1)を参考にしています。

- VSCodeのESLintプラグインを入れているとリアルタイムでリントしてくれる
- `tsconfig.json -> tsconfig.eslint.json -> .eslintrc.js`の3つで1つの設定ファイルのイメージ(?)
- jsonはコメントを書けないが、`tsconfig.json`や`.eslintrc.json`にはコメントが書ける(*1)(*2)

同じディレクトリに複数の構成ファイルがある場合ESLintは1つだけを使用する。優先順位は次の通り。

1. eslintrc.js
1. eslintrc.cjs
1. eslintrc.yaml
1. eslintrc.yml
1. eslintrc.json
1. package.json

### tsconfig.eslint.json

TypeScriptのESLint設定ファイル。

> 当記事のように、tsconfig.eslint.json（eslint用のTypeScriptのコンパイルファイル。名前はなんでも良い）を作成するか、コンパイルしたいファイルを全てtsconfigファイルのincludesに含める方法があるそうです。  
> なので、includesをTypeScriptのコンパイルと分けて設定したい場合やVSCodeのパフォーマンスを上げたい場合などに設定すると良いと自分は理解しています(なくてもそんなに気にするほどでもないとは思います)。  
> なので別になくてもeslintは動くので、なければ動かないといった性質のものではないです。  
> VSCodeのlintのパフォーマンスが悪い場合などに検討しても良いとは思いますので、直接tsconfig.jsonをeslintrc.jsなどに設定しても良いかもしれませんね（記事を書いておいてなんですが）。

「prettier,eslintを導入する際にハマったこと2021新年」 [https://zenn.dev/ryusou/articles/nodejs-prettier-eslint2021](https://zenn.dev/ryusou/articles/nodejs-prettier-eslint2021)  (参照: 2022-02-22)

### .eslintrc.js

ESLintの設定ファイル。プロジェクトディレクトリ直下に作成する。  
(別のルールを設定したい場合は対象のディレクトリに追加する)

#### extends

あらかじめ用意されたESLintルールのセット。とりあえず次のルールを適用。

- [eslint:recommended](https://eslint.org/docs/rules/)
- [plugin:@typescript-eslint/recommended](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts)
- [plugin:@typescript-eslint/recommended-requiring-type-checking](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts)

#### rules

`extends`に加えて独自に追加するルール。  
今回追加しているのは全てプラグイン[eslint-plugin-eslint-comments](https://github.com/mysticatea/eslint-plugin-eslint-comments)のもの。

### 注釈

- *1 [「tsconfig.jsonはJSONじゃないと言う話」](https://syumai.hateblo.jp/entry/2020/03/31/024751) (参照: 2022-02-18)
- *2 [「Configuration File Formats」](https://eslint.org/docs/user-guide/configuring/configuration-files#configuration-file-formats) (参照: 2022-02-18)

### 参考

- 「TypeScript + Node.jsプロジェクトにESLint + Prettierを導入する手順2020」 [https://qiita.com/notakaos/items/85fd2f5c549f247585b1](https://qiita.com/notakaos/items/85fd2f5c549f247585b1) (参照: 2022-02-18)
- 「eslintを最大限活用してTypeScriptの型安全を少しずつ高める方法」 [https://tech.ga-tech.co.jp/entry/2020/01/refactoring-type-safety-with-eslint](https://tech.ga-tech.co.jp/entry/2020/01/refactoring-type-safety-with-eslint) (参照: 2022-02-18)
- 「prettier,eslintを導入する際にハマったこと2021新年」 [https://zenn.dev/ryusou/articles/nodejs-prettier-eslint2021](https://zenn.dev/ryusou/articles/nodejs-prettier-eslint2021)  (参照: 2022-02-22)
- 「mysticatea/eslint-plugin-eslint-comments」 [https://github.com/mysticatea/eslint-plugin-eslint-comments](https://github.com/mysticatea/eslint-plugin-eslint-comments) (参照: 2022-02-18)
- 「ESLint プラグイン紹介: eslint-plugin-eslint-comments」 [https://qiita.com/mysticatea/items/a2c2deab39d2bea3ca2e](https://qiita.com/mysticatea/items/a2c2deab39d2bea3ca2e) (参照: 2022-02-18)

---

## Stylelintについて

### .stylelintrc.yml

設定ファイル。  

#### extends

ルールに関するところは[stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss)だけを指定(すればOKらしい)。というのも  

- `stylelint-config-standard-scss`は[stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)と[stylelint-config-recommended-scss](https://github.com/stylelint-scss/stylelint-config-recommended-scss)を継承している
- `stylelint-config-standard`は[stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended)を継承している
- `stylelint-config-recommended-scss`は[stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended)を継承している

これら3つ理由のため。  
その他、[stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order)でプロパティの記述順を整頓する。


#### rules

とりあえず実行してみて軽く調整。上書きするルールの確認で結構時間が掛かったのに加えて結局オレオレルールになってることに疑問。  
ルールは次を参照。

- CSS: [List of rules | Stylelint](https://stylelint.io/user-guide/rules/list/)
- SCSS: [stylelint-scss/stylelint-scss](https://github.com/stylelint-scss/stylelint-scss#list-of-rules)

### 参考

- 「Stylelint を導入したときのあれこれ」 [https://lab.astamuse.co.jp/entry/stylelint](https://lab.astamuse.co.jp/entry/stylelint) (参照: 2022-02-21)
