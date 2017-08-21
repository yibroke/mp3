
var gulp = require('gulp');
var concat = require('gulp-concat');
//var uglify= require('gulp-uglyfy');
gulp.task('t1',function(){
    return gulp.src('app/**/*.js')// go to app and all of its directory get all file with ext .js
            .pipe(concat('all.js')) // combine them into 1 big file call all.js
            .pipe(gulp.dest('public/javascripts'))// save all.js in directory dest.
});
gulp.task('w1', function(){
   gulp.watch('app/**/*.js',['t1']) //watch all js file in app directory. any chcange please excute task t1.
});