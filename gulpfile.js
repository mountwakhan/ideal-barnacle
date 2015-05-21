"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************
var gulp        = require("gulp"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    karma       = require("karma").server,
    uglify      = require("gulp-uglify"),
    typescript  = require("typescript"),
    runSequence = require("run-sequence"),
    glob        = require("glob"),
    header      = require("gulp-header"),
    pkg         = require(__dirname + "/package.json");

//******************************************************************************
//* LINT
//******************************************************************************
gulp.task("lint", function() {
  return gulp.src([
                __dirname + "/source/**/**.ts",
                __dirname + "/test/**/**.spec.ts"
              ])
             .pipe(tslint())
             .pipe(tslint.report("verbose"));
});

//******************************************************************************
//* BUILD
//******************************************************************************
var tsProject = tsc.createProject({
  removeComments : false,
  noImplicitAny : false,
  target : "es5",
  module : "commonjs",
  declarationFiles : false,
  emitDecoratorMetadata : true,
  typescript: typescript
});

gulp.task("build-source", function() {
  return gulp.src(__dirname + "/source/*.ts")
             .pipe(tsc(tsProject))
             .js.pipe(gulp.dest(__dirname + "/build/source/"));
});

gulp.task("build-test", function() {
  return gulp.src(__dirname + "/test/*.spec.ts")
             .pipe(tsc(tsProject))
             .js.pipe(gulp.dest(__dirname + "/build/test/"));
});

//******************************************************************************
//* BUNDLE
//******************************************************************************
gulp.task("bundle-source", function () {
  var b = browserify({
    standalone : 'atspy',
    entries: __dirname + "/build/source/atspy.js",
    debug: true
  });

  return b.bundle()
    .pipe(source("atspy.js"))
    .pipe(buffer())
    .pipe(gulp.dest(__dirname + "/bundle/source/"));
});

gulp.task("bundle-test", function () {
  glob("**/*.js", function (er, files) {
    for(var i = 0; i < files.length; i ++) {

      var file = files[i];

      if(!er) {
        var b = browserify({
          standalone : 'atspytest',
          entries: __dirname + "/build/test/" + file,
          debug: true
        });

        r = b.bundle()
             .pipe(source(file))
             .pipe(buffer())
             .pipe(gulp.dest(__dirname + "/bundle/test/"));
      }
    }
  });
});

//******************************************************************************
//* TEST
//******************************************************************************
gulp.task("test", function(cb) {
  karma.start({
    configFile : __dirname + "/karma.conf.js",
    singleRun: true
  }, cb);
});

//******************************************************************************
//* READY FOR DIST
//******************************************************************************
gulp.task("compress", function() {
  return gulp.src(__dirname + "/bundle/source/atspy.js")
             .pipe(uglify({ preserveComments : false }))
             .pipe(gulp.dest(__dirname + "/dist/"))
});

gulp.task("addheader", function() {

  var pkg = require(__dirname + "/package.json");

  var banner = ["/**",
    " * <%= pkg.name %> v.<%= pkg.version %> - <%= pkg.description %>",
    " * Copyright (c) 2015 <%= pkg.author %>",
    " * <%= pkg.license %>",
    " * <%= pkg.homepage %>",
    " */",
    ""].join("\n");

  return gulp.src(__dirname + "/dist/atspy.js")
             .pipe(header(banner, { pkg : pkg } ))
             .pipe(gulp.dest(__dirname + "/dist/"));
});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task('default', function(cb){
  runSequence(
    "lint",
    "build-source",
    "build-test",     // not working!
    "bundle-source",
    "bundle-test",
    "test",
    "compress",
    "addheader",
    cb);
});
