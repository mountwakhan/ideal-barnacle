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
    runSequence = require("run-sequence"),
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
  target : "ES5",
  module : "commonjs",
  declarationFiles : false
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

gulp.task("build", function(cb) {
  runSequence("lint", ["bundle-source", "bundle-test"], cb);
});

//******************************************************************************
//* BUNDLE
//******************************************************************************
gulp.task("bundle-source", ["bundle-source"], function () {
  var b = browserify({
    standalone : 'demos',
    entries: __dirname + "/build/source/demos.js",
    debug: true
  });

  return b.bundle()
    .pipe(source("demos.js"))
    .pipe(buffer())
    .pipe(gulp.dest(__dirname + "/bundled/source/"));
});

gulp.task("bundle-test", ["build-test"], function () {
  var b = browserify({
    standalone : 'test',
    entries: __dirname + "/build/test/bdd.test.js",
    debug: true
  });

  return b.bundle()
    .pipe(source("bdd.test.js"))
    .pipe(buffer())
    .pipe(gulp.dest(__dirname + "/bundled/test/"));
});

//******************************************************************************
//* TEST
//******************************************************************************
gulp.task("test", ["bundle-test"], function(cb) {
  karma.start({
    configFile : __dirname + "/karma.conf.js",
    singleRun: true
  }, cb);
});

//******************************************************************************
//* BAKE
//******************************************************************************
gulp.task("compress", ["test"], function() {
  return gulp.src(__dirname + "/bundled/source/demos.js")
             .pipe(uglify({ preserveComments : false }))
             .pipe(gulp.dest(__dirname + "/dist/"))
});

gulp.task("bake",["compress"], function() {

  var pkg = require(__dirname + "/package.json");

  var banner = ["/**",
    " * <%= pkg.name %> v.<%= pkg.version %> - <%= pkg.description %>",
    " * Copyright (c) 2015 <%= pkg.author %>",
    " * <%= pkg.license %>",
    " * <%= pkg.homepage %>",
    " */",
    ""].join("\n");

  return gulp.src(__dirname + "/dist/demos.js")
             .pipe(header(banner, { pkg : pkg } ))
             .pipe(gulp.dest(__dirname + "/dist/"));
});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task('default', ["bake"]);
