const webpack = require('webpack');

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
    gens: './src/assets/js/gens.js'
  },
  output: {
    path: `${__dirname}/htdocs/assets/js`,
    filename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      // cacheGroups内にバンドルの設定を複数記述できる
      cacheGroups: {
        // 今回はvendorだが、任意の名前で問題ない
        vendor: {
          // /node_modules配下のモジュール、/src/assets/js/module/vendor配下(手動で追加するJSプラグインを想定)をバンドル対象とする
          // /[\\/]node_modules[\\/]|vendor[\\/]analytics_provider|vendor[\\/]other_lib/
          test: /([\\/]node_modules[\\/]|[\\/]src[\\/]assets[\\/]js[\\/]module[\\/]vendor[\\/])/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        // ts-loader → babel-loaderの順番
        use: [
          {
            loader: 'babel-loader',
            options: {
              // プリセットを指定することで、ES2020 を ES5 に変換
              // 特に何も指定しない場合は、一律es5の構文に変換される
              // エントリーポイントのJavaScriptファイルには@babel/polyfillを取り込むように記載してIE11に対応する。
              presets: [['@babel/preset-env']]
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  // ES5(IE11等)向けの指定
  target: ['web', 'es5'],
  devtool: 'source-map',
  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  // フロントエンドの開発では拡張子を省略することが多いので、記載したほうがトラブルに巻き込まれにくい。
  resolve: {
    // 拡張子を配列で指定
    extensions: ['.ts', '.js']
  },
  plugins: [
    // webpack.ProvidePluginを使用すると、指定した変数名でライブラリを使用できるようになる
    // 以下の例だと、$, jQuery, window.jQueryでjqueryを使用することができる
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
      // 'window.jQuery': 'jquery',
    })
  ]
};
