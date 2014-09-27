var gulp = require("gulp");
var gutil = require('gulp-util');
var inject = require("gulp-inject");
var livereload = require("gulp-livereload");
var clean = require("gulp-clean");
var es = require('event-stream');
var concat = require('gulp-concat');
//var bower = require("bower-files");
var bower = require('main-bower-files');

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname + "/dist";
var LIVERELOAD_PORT = 35729;
var lr_script = "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':"+LIVERELOAD_PORT +"/livereload.js?snipver=1\"></' + 'script>')</script>";

gulp.task("bower", function()
{
  return gulp.src(bower.js);
  //.pipe();
});

gulp.task("express",function()
{
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static( EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
});

gulp.task("live",["express"],function()
{
  gulp.watch( "./app/**/*.*", ["build"]);

  var server = livereload();

  return gulp.watch(EXPRESS_ROOT + '/**/*', function(evt){
    console.log("reload");
    console.log(evt);
    server.changed(evt.path);
  });
});

gulp.task('cleanDist', function(){
  return gulp.src('./dist',{read:false})
    .pipe(clean());
});

gulp.task('concatFiles',['cleanDist'], function(){

  var appJS = gulp.src('./app/scripts/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist'));

  return bowerFiles = gulp.src(bower())
    .pipe(concat('deps.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['cleanDist','concatFiles'],function () {
  console.log("FILE CHANGE");

  return gulp.src('./app/index.html')
    .pipe(inject(gulp.src('./dist/*.js'),{ignorePath:'/dist/'}))
    .pipe(gulp.dest('./dist'));
});
