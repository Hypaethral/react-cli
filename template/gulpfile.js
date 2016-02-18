var fs = require('fs');
var rename = require('gulp-rename');
var gulp = require('gulp');
var path = require('path');
var concat = require('gulp-concat');
var $ = require('gulp-load-plugins')();
var del = require('del');
// set variable via $ gulp --type production
var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js').getConfig(environment);

var port = $.util.env.port || 1337;
var app = 'app/';
var dist = 'dist/';

// https://github.com/ai/autoprefixer
var autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('scripts', function() {
  return gulp.src(webpackConfig.entry)
      .pipe($.webpack(webpackConfig))
      .pipe(isProduction ? $.uglifyjs() : $.util.noop())
      .pipe(gulp.dest(dist + 'js/'))
      .pipe($.size({ title : 'js' }))
      .pipe(isProduction ? $.util.noop() : $.connect.reload());
});

// copy html from app to dist
gulp.task('html', function() {
  return gulp.src(app + 'index.html')
      .pipe(gulp.dest(dist))
      .pipe($.size({ title : 'html' }))
      .pipe(isProduction ? $.util.noop() : $.connect.reload());
});

gulp.task('customStyles', function(cb) {
  // convert stylus to css
  return gulp.src(app + 'stylus/main.styl')
      .pipe($.stylus({
        // only compress if we are in production
        compress: isProduction,
        // include 'normal' css into main.css
        'include css' : true
      }))
      .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
      .pipe(gulp.dest(dist + 'css/'))
      .pipe($.size({ title : 'css' }))
      .pipe(isProduction ? $.util.noop() : $.connect.reload());
});

// add livereload on the given port
gulp.task('serve', function() {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35729
    }
  });
});

// env-based config
gulp.task('config', function(cb) {
  console.log('environment is ', environment);
  var filePath = '';
  if (!$.util.env.type || $.util.env.type === 'local') {
    // gulp build
    filePath = './config/localConfig.js';
  } else if (isProduction) {
    // gulp build --type "production"
    filePath = './config/prodConfig.js';
  } else if (!isProduction) {
    // gulp build --type "development"
    filePath = './config/devConfig.js';
  }
  return gulp.src(filePath)
      .pipe(rename('config.js'))
      .pipe(gulp.dest(dist + 'js/'))
      .pipe($.size({ title: 'appConfig' }))
});

// watch styl, html and js file changes
gulp.task('watch', function() {
  gulp.watch(app + 'stylus/*.styl', ['customStyles']);
  gulp.watch(app + 'index.html', ['html']);
  gulp.watch(app + '**/*.js', ['scripts']);
  gulp.watch(app + '**/*.jsx', ['scripts']);
});

// remove bundles
gulp.task('clean', function(cb) {
  del([dist], cb);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'serve', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function(){
  gulp.start(['config', 'libraryStyles', 'images', 'html', 'jqueryMasterRace', 'scripts', 'vendorScripts', 'fonts', 'customStyles']);
});
