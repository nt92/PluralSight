var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('nodemon');

var jsfiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
    return gulp.src(jsfiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;

    return gulp.src('./src/views/*.html')
        .pipe(wiredep);
});

gulp.task('serve', ['style'] ,function() {
    var options = {
        script : 'app.js',
        delayTime : 1,
        env : {
            'PORT' : 3000
        },
        watch : jsfiles
    };

    return nodemon(options)
        .on('restart', function(ev) {
            console.log('Restarting...');
        });
});
