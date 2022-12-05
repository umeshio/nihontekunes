# Node.jsのインストール方法

とりあえずこのテンプレートが動かせられるような手順だけを説明します。  
最近の便利なウェブサイト制作の環境作りにおいてNode.jsは必須の技術なので、理解を深めたい際は参考の項にリストアップしているサイトを参照してください。

特にこの記事が、少し古いですが詳しく解説されていて勉強になります。  
「anyenvとnodenvでNode.jsのバージョン管理をしよう！」 [https://www.to-r.net/media/anyenv/](https://www.to-r.net/media/anyenv/) (参照: 2022-03-01)  

記事内で「Node.jsはバージョン管理が必要」といわれていますが、実際僕の作った環境でも、2、3回改良を加えていて、そのタイミングで使うNode.jsをその時の推奨版にアップデートしています。  
したがって、多くはないですが複数バージョンのNode.jsを切り替える必要があるため、簡単に管理できるnodenvを利用します。

手順がMacのシェルの種類によって方法が少し異なるので注意してください。OSのCatalina以降は`zsh`という種類ですが、それより前は`bash`になります。  
この資料では`zsh`用の手順を紹介しているので、`bash`の場合は手順`2-2.`にある、

```Shell
echo 'eval "$(anyenv init -)"' >> ~/.zshrc
```

のコマンドの代わりに

```Shell
echo 'eval "$(anyenv init -)"' >> ~/.bash_profile
```

とすれば大丈夫だと思います。

以下は次の記事の抜粋になるので、直接見てもらった方が分かりやすいかもしれません。  
「MacにanyenvをインストールしてNode.jsなどの開発環境を整える」 [https://yosiakatsuki.net/blog/anyvenv-node-install/](https://yosiakatsuki.net/blog/anyvenv-node-install/) (参照: 2022-03-01)  

また、anyenvのインストールについては、次の記事も分かりやすくておすすめです。この資料の手順は記事で説明されている「Homebrewでのインストール」と同じです。  
「anyenv + macOS環境構築」 [https://qiita.com/rinpa/items/81766cd6a7b23dea9f3c](https://qiita.com/rinpa/items/81766cd6a7b23dea9f3c)

作業の流れとしては  

1. `anyenv`をインストール
1. `anyenv`で`nodenv`をインストール
1. `nodenv`で`Node.js`をインストール

となります。(操作はターミナルで行います)

---

## 1. Homebrewでanyenvをインストール

Homebrewがまだインストールされていなければ次のページを参考に行ってください。  
[https://brew.sh/index_ja](https://brew.sh/index_ja)

anyenvインストールします。

```Shell
brew install anyenv
```

正常にインストールされたかどうか確認しておきます。

```Shell
anyenv -v 
```

※anyenvのバージョンが表示されます。

---

## 2. anyenvのセットアップ

### 2-1. 次のコマンドを実行

```Shell
anyenv init
```

### 2-2. 次のようなメッセージが表示されたら.zshrc(zshの設定ファイル)を追加

表示されるメッセージ(多少違う可能性あり)

```Shell
Load anyenv automatically by adding
the following to ~/.zshrc:
eval "$(anyenv init -)"
```

次を実行します。

```Shell
echo 'eval "$(anyenv init -)"' >> ~/.zshrc
```

※もしシェルがbashの場合は代わりに次を実行してください。

```Shell
echo 'eval "$(anyenv init -)"' >> ~/.bash_profile
```

### 2-3. ターミナルを再起動する

コマンドでも再起動できます。

```Shell
exec $SHELL -l
```

すると次のようなメッセージが表示されると思うので、指示通りにコマンドを実行します。

```Shell
ANYENV_DEFINITION_ROOT(/Users/[ユーザー名]/.config/anyenv/anyenv-install) doesn't exist. You can initialize it by:
> anyenv install --init
```

次を実行します。

```Shell
anyenv install --init
```

この際、「ディレクトリが存在しません、checkout しますか？」と聞かれたら「y」でcheckoutします。

```Shell
Manifest directory doesn't exist: /Users/[アカウント名]/.config/anyenv/anyenv-install
Do you want to checkout ? [y/N]: y
```

---

## 3. anyenvでバージョン管理ツールnodenvをインストール

### 3-1. インストールできるバージョン管理ツールを確認

nodenvやrbenvなど、どのツールが使えるか確認してみます。  
※この際、うまく動かなかったらターミナルを再起動してください。

```Shell
anyenv install -list
```

Node.jsを使えるようにします。

### 3-2. Node.js管理のためにnodenvをインストール

nodenvをインストール

```Shell
anyenv install nodenv
```

インストールしたらターミナルを再起動します。
次のコマンドでバージョン情報が表示されれば準備OKです。  

```Shell
nodenv -v
```

---

## 4. nodenvでNode.jsをインストール

### 4-1. インストールできるNode.jsのバージョンを確認

インストールできるNode.jsのバージョンの確認

```Shell
nodenv install -l
```

### 4-2. Node.jsをバージョン指定でインストール

インストール(例: バージョン`12.14.1`の場合)

```Shell
nodenv install 12.14.1
```

globalに使うバージョンを指定

```Shell
nodenv install 12.14.1
```

バージョン確認

```Shell
node -v
```

### 4-3. インストールされているNode.jsのバージョンを確認する

```Shell
nodenv versions
```

### 4-4. プロジェクトで特定バージョンのNode.jsを使う

プロジェクトのフォルダで`nodenv local 使用するバージョン`を実行します。  
.node-versionというファイルが作成されます。このファイルがあるディレクトリとその配下では、このファイルで指定されているバージョンに自動で切り替わるようになります。

---

## 参考

- 「MacにanyenvをインストールしてNode.jsなどの開発環境を整える」 [https://yosiakatsuki.net/blog/anyvenv-node-install/](https://yosiakatsuki.net/blog/anyvenv-node-install/) (参照: 2022-03-01)
- 「anyenv + macOS環境構築」 [https://qiita.com/rinpa/items/81766cd6a7b23dea9f3c](https://qiita.com/rinpa/items/81766cd6a7b23dea9f3c) (参照: 2022-03-02)
- 「anyenvとnodenvでNode.jsのバージョン管理をしよう！」 [https://www.to-r.net/media/anyenv/](https://www.to-r.net/media/anyenv/) (参照: 2022-03-01)
- 「Node.jsとはなにか？なぜみんな使っているのか？」 [https://qiita.com/non_cal/items/a8fee0b7ad96e67713eb](https://qiita.com/non_cal/items/a8fee0b7ad96e67713eb) (参照: 2022-03-01)
