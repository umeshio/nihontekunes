const gulp = require('gulp');

// pug
const pug = require('gulp-pug');
const fs = require('fs');
const data = require('gulp-data');
const path = require('path');

// html
const browserSyncSsi = require('browsersync-ssi');

// css
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
// const nodePostcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');

// webpack
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');

// image
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

// Utility
const cache = require('gulp-cached');
const changed = require('gulp-changed');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpif = require('gulp-if');
const del = require('del');


/* 開発用ディレクトリ
---------------------------------------------------------------------- */
const src = {
  root: 'src/',
  html: ['src/**/*.pug', '!src/**/_*.pug'],
  htmlWatch: 'src/**/*.pug',
  ssi: 'static/**/*.html',
  data: 'src/_data/',
  // css: 'src/assets/sass/**/*.scss',
  css: 'src/**/*.scss',
  js: './src/assets/js/**/*.ts',
  // js: './src/assets/js/**/*.js',
  jsWatch: 'src/**/*.{js,ts}',
  image: 'src/assets/img/**/*.{png,jpg,gif,svg}',
  imageWatch: 'src/assets/img/**/*',
  copy: 'static/**/*',
};


/* 公開用ディレクトリ
---------------------------------------------------------------------- */
const dest = {
  root: 'htdocs/',
  image: 'htdocs/assets/img/',
  js: 'htdocs/assets/js/',
  cleanDest: 'htdocs/',
};


/* 環境変数
---------------------------------------------------------------------- */
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';
const isProduction = environment === 'production';
// const environmentConfig = require(`./config/${environment}.js`);


/* pug
---------------------------------------------------------------------- */
const html = (done) => {
  const locals = {
    site: JSON.parse(fs.readFileSync(`${src.data}site.json`)),
  };
  gulp.src(src.html)
  .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
  .pipe(
    data(file => {
      locals.relativePath = `./${path.relative(`${path.dirname(file.path)}/`, `${__dirname}/src/`)}/`.replace(/\/\//g, '/');
      locals.absolutePath = `/${path
        .relative(file.base, file.path.replace(/.pug$/, '.html'))
        .replace(/index\.html$/, '')}`;
      return locals;
    }),
  )
  .pipe(cache('html'))
  .pipe(
    pug({
      locals: locals,
      basedir: 'src',
      pretty: true,
    }),
  )
  .pipe(gulp.dest(dest.root))
  .pipe(browserSync.reload({ stream: true }));
  done();
}


/* ssi
---------------------------------------------------------------------- */
const ssi = (done) => {
  gulp.src(src.ssi).pipe(browserSync.reload({ stream: true }));
  done();
}


/* css
---------------------------------------------------------------------- */
const css = (done) => {
  const plugins = [
    autoprefixer({ grid: 'autoplace' })
  ];
  gulp.src(src.css, {
    sourcemaps: isDevelopment,
  })
  // globパターンでのインポート機能を追加
  .pipe(sassGlob())
  .pipe(
    sass({
      outputStyle: 'compressed',
    }).on('error', sass.logError),
  )
  .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
  .pipe(postcss(plugins))
  .pipe(
    gulpif(
      isProduction,
      cleanCSS({
        compatibility: {
          properties: {
            // 0の単位を不必要な場合は削除する
            zeroUnits: false,
          },
        },
      }),
    ),
  )
  .pipe(
    gulpif(
      isDevelopment,
      cleanCSS({
        // 圧縮せずに整形して出力する
        format: 'beautify',
        compatibility: {
          properties: {
            // 0の単位を不必要な場合は削除する
            zeroUnits: false,
          },
        },
      }),
    ),
  )
  .pipe(
    gulp.dest(dest.root, {
      sourcemaps: isDevelopment,
    }),
  )
  .pipe(browserSync.reload({ stream: true }));
  done();
}


/* js
---------------------------------------------------------------------- */
// ▼webpack
const js = (done) => {
  gulp.src(src.js)
  .pipe(webpackStream(webpackConfig, webpack))
  .pipe(gulp.dest(dest.js))
  .pipe(browserSync.reload({ stream: true }));
  done();
}


/* image
---------------------------------------------------------------------- */
const image = (done) => {
  gulp.src(src.image)
  .pipe(changed(dest.image))
  .pipe(
    plumber({
      errorHandler(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      },
    }),
  )
  .pipe(
    imagemin([
      imageminMozjpeg({
        // 画質
        quality: 70,
      }),
      imageminPngquant({
        // 画質
        quality: [0.7, 0.8],
      }),
      imagemin.svgo({
        plugins: [
          // viewBox属性を削除する（widthとheight属性がある場合）。
          // 表示が崩れる原因になるので削除しない。
          { removeViewBox: false },
          // <metadata>を削除する。
          // 追加したmetadataを削除する必要はない。
          { removeMetadata: false },
          // SVGの仕様に含まれていないタグや属性、id属性やversion属性を削除する。
          // 追加した要素を削除する必要はない。
          { removeUnknownsAndDefaults: false },
          // コードが短くなる場合だけ<path>に変換する。
          // アニメーションが動作しない可能性があるので変換しない。
          { convertShapeToPath: false },
          // 重複や不要な`<g>`タグを削除する。
          // アニメーションが動作しない可能性があるので変換しない。
          { collapseGroups: false },
          // SVG内に<style>や<script>がなければidを削除する。
          // idにアンカーが貼られていたら削除せずにid名を縮小する。
          // id属性は動作の起点となることがあるため削除しない。
          { cleanupIDs: false },
        ],
      }),
      imagemin.optipng(),
      imagemin.gifsicle(),
    ]),
  )
  .pipe(gulp.dest(dest.image))
  .pipe(browserSync.reload({ stream: true }));
  done();
}


/* copy
---------------------------------------------------------------------- */
const copy = () => {
  return gulp.src(src.copy).pipe(gulp.dest(dest.root));
}


/* browser-sync
---------------------------------------------------------------------- */
const serve = (done) => {
  const httpsOption =
    process.env.HTTPS_KEY !== undefined
      ? { key: process.env.HTTPS_KEY, cert: process.env.HTTPS_CERT }
      : false;
  browserSync({
    server: {
      middleware: [
        browserSyncSsi({
          baseDir: dest.root,
          ext: '.html',
        }),
      ],
      baseDir: dest.root,
    },
    https: httpsOption,
    ghostMode: false,
    open: 'external',
    notify: false,
    injectChanges: true,
  });
  done();
}

/* 公開用のディレクトリを削除
---------------------------------------------------------------------- */
const clean = () => {
  return del(dest.cleanDest);
}

/* publicなgulpタスク
---------------------------------------------------------------------- */
exports.html = html;
exports.ssi = ssi;
exports.css = css;
exports.js = js;
exports.image = image;
exports.copy = copy;
exports.serve = serve;
exports.clean = clean;

/* watch
---------------------------------------------------------------------- */
const watch = (done) => {
  gulp.watch(src.htmlWatch, html);
  gulp.watch(src.imageWatch, image);
  gulp.watch(src.ssi, ssi);
  gulp.watch(src.css, css);
  gulp.watch(src.jsWatch, js);
  gulp.watch(src.copy, copy);
  done();
}

exports.build = gulp.series(
  clean,
  gulp.parallel(html, css, js, image, copy),
  gulp.parallel(ssi),
);

exports.default = gulp.series(
  clean,
  gulp.parallel(html, css, js, image, copy),
  gulp.parallel(ssi),
  gulp.parallel(serve, watch),
);
