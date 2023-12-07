const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const gulpif = require('gulp-if');
const argv = require('yargs').argv;
const webp = require('gulp-webp');
const browserSync = require('browser-sync').create();

const clean = () => {
  return del(['build']);
};

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('build'))
};

const styles = () => {
  return src('src/styles/**/*.scss')
    .pipe(gulpif(argv.prod, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(argv.prod, sourcemaps.write()))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(gulpif(argv.prod, cleanCSS({
      level: 2,
    })))
    .pipe(concat('main.css'))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
};

const html = () => {
	return src('src/**/*.html')
	  .pipe(dest('build'))
	  .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
};

const svgSprites = () => {
  return src('src/images/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('build/images'))
};

const scripts = () => {
  return src([
      'src/js/main.js'
    ])
    .pipe(gulpif(argv.prod, sourcemaps.init()))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(gulpif(argv.prod, uglify().on('error', notify.onError())))
    .pipe(gulpif(argv.prod, sourcemaps.write()))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
};

const images = () => {
  return src([
      'src/images/**/*.jpg',
      'src/images/**/*.jpeg',
      'src/images/**/*.png',
      'src/images/*.svg',
    ])
    .pipe(image())
    .pipe(webp())
    .pipe(dest('build/images'))
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  })
};

watch('src/**/*.html', htmlMinify);
watch('src/styles/**/*.scss', styles);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources)

exports.styles = styles;
exports.watch = function () {
  watch('src/styles/**/*.scss');
};
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;
exports.dev = series(clean, resources, html, scripts, styles, images, svgSprites, watchFiles);
exports.build = series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchFiles);
exports.default = exports.dev;
