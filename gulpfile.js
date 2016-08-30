var HelpModal, babel, babelify, babelifyConfig, browserify, buffer, copyFile, copyVendorsToPublic, createSymLink,
  createSymLinkForBuildToNodeModules, createSymLinkForBundles_v1ToBuild, createSymLinkForConfigToNodeModules,
  createSymLinkForVendorsToPublic, envify, fs, getDirectories, getFiles, gulp, gulpif, gzip, notify, path, plumber,
  runBrowserifyTask, source, sourcemaps, streamify, transformNodeModulesTask, uglify, watchify;

fs = require('fs');
path = require('path');
gulp = require('gulp');
browserify = require('browserify');
source = require('vinyl-source-stream');
sourcemaps = require('gulp-sourcemaps');
uglify = require('gulp-uglify');
buffer = require('vinyl-buffer');
gzip = require('gulp-gzip');
plumber = require('gulp-plumber');
notify = require('gulp-notify');
streamify = require('gulp-streamify');
gulpif = require('gulp-if');
watchify = require('watchify');
envify = require('envify/custom');
babelify = require('babelify');
babel = require('gulp-babel');

babelifyConfig = {
  global: false,
  presets: ['react', 'es2015', 'stage-0'],
  plugins: ['transform-decorators-legacy'],
  ignore: ['/node_modules/']
};

runBrowserifyTask = function(options) {

  console.log('options', options);

  var bundler, dest, reBundle, vendorBundler;

  dest = options.destinationFolder ? options.dest + options.destinationFolder + '/' : options.dest;

  console.log('dest', dest);

  vendorBundler = browserify({
    debug: true
  }).require('react').require('react-dom');

  bundler = browserify({
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }).require(require.resolve(options.bundle), {entry: true}).transform(babelify, babelifyConfig).external('react').external('react-dom');

  reBundle = function() {
    var start;
    start = Date.now();
    return bundler.bundle().pipe(source('bundle.js')).pipe(gulpif(options.uglify, streamify(uglify()))).pipe(gulp.dest(dest)).pipe(gulpif(options.gzip, gzip())).pipe(gulpif(options.gzip, gulp.dest(dest))).pipe(notify('Built in ' + (Date.now() - start) + 'ms'));
  };

  if (options.watch) {
    bundler = watchify(bundler);
    bundler.on('update', reBundle);
  }

  reBundle();

  return vendorBundler.bundle().pipe(source('vendors.js')).pipe(streamify(uglify())).pipe(gulp.dest(dest)).pipe(gulpif(options.gzip, gzip())).pipe(gulpif(options.gzip, gulp.dest(dest)));
};

getDestinationFolder = function(){

  return process.argv[3] === '--gulpfile' ? process.argv[7] : process.argv[4];

};

getBundleName = function(){

  for (var i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === '--build' && process.argv[i + 1]) {
      return process.argv[i + 1]
    }
  }

  return './';

  // return process.argv[3] === '--gulpfile' ? process.argv[6].split('--')[1] : process.argv[3].split('--')[1];

};

gulp.task('watch', function() {
  return runBrowserifyTask({
    watch: true,
    dest: './',
    uglify: false,
    gzip: false,
    bundle: getBundleName(),
    destinationFolder: getDestinationFolder()
  });
});

gulp.task('dev', function() {
  return runBrowserifyTask({
    watch: false,
    dest: './',
    uglify: false,
    gzip: false,
    bundle: getBundleName(),
    destinationFolder: getDestinationFolder()
  });
});

gulp.task('pub', function() {
  return runBrowserifyTask({
    watch: false,
    dest: './',
    uglify: false,
    gzip: true,
    bundle: getBundleName(),
    destinationFolder: getDestinationFolder()
  });
});