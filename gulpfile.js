const { src, dest, parallel, watch, series } = require('gulp');
const scss = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const connect = require('gulp-connect');
const fileinclude = require('gulp-file-include');
const gulp = require('gulp');

const srcDirectory = 'src/';
const buildDirectory = 'build/';

const vendorsJs = [
  // vendors js paths
  srcDirectory + '/vendors/noUiSlider/nouislider.js',
  srcDirectory + '/vendors/bootstrapSelect/bootstrap-select.js',
]
const vendorsCSS = [
  // vendors css paths
  srcDirectory + '/vendors/noUiSlider/nouislider.css',
  srcDirectory + '/vendors/bootstrapSelect/bootstrap-select.css',
]
const files = {
  html: srcDirectory + 'html/**/*.html',
  scss: srcDirectory + ['scss/**/*.scss'],
  js: srcDirectory + 'js/**/*.js',
}

gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

/** HTML */
function html() {
  return src(files.html)
    .pipe( fileinclude({
      prefix: '@@',
      basepath: srcDirectory + 'html-components'
    }) )
    .pipe( dest(buildDirectory) )
}
/** -//- */

/** Styles */
function styles() {
  return src(files.scss)
    .pipe( scss() )
    .pipe( postcss([ 
      autoprefixer(),
      // cssnano() 
    ]) )
    .pipe( concat('styles.css') )
    .pipe( dest(buildDirectory + 'css/') )
}

function vendorsStyles() {
  return src(vendorsCSS)
    // .pipe( postcss([ cssnano() ]) )
    .pipe( concat('vendors.css') )
    .pipe( dest(buildDirectory + 'css/') )
}
/** -//- */

/** Scripts */
function scripts() {
  return src(files.js)
    .pipe( concat('scripts.js') )
    .pipe( dest(buildDirectory + 'js/') )
}

function vendorsScripts() {
  return src(vendorsJs)
    .pipe( concat('vendors.js') )
    .pipe( dest(buildDirectory + 'js/') )
}
/** -//- */

/** Assets */
function images() {
  return src(srcDirectory + 'img/**/*')
    .pipe( imagemin() )
    .pipe( dest(buildDirectory + 'img/') )
}

function assets() {
  return src(srcDirectory + 'assets/**/*')
    .pipe( dest(buildDirectory + 'assets/') )
}

function fonts() {
  return src(srcDirectory + 'fonts/**/*')
    .pipe( dest(buildDirectory + 'fonts/') )
}
/** -//- */

function watchTask(){
  watch(files.scss, styles);
  watch(files.js, scripts);
  watch(files.html, html);
}

function connectTask() {
  connect.server({
    root: buildDirectory,
    host: 'localhost',
    port: '3000',
    livereload: true
  })
}

const build = parallel(html, styles, vendorsStyles, vendorsScripts, scripts, images, assets, fonts)

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.assets = assets;
exports.fonts = fonts;
exports.vendorsScripts = vendorsScripts;
exports.vendorsStyles = vendorsStyles;
exports.images = images;
exports.build = build;

exports.default = series(
  build,
  parallel(watchTask, connectTask),
);