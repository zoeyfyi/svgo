const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

exports.default = () => (
    gulp.src('src/images/*')
        .pipe(imagemin([
		imagemin.svgo({
			plugins: [
				{ prefixIds: true }
			]
		})
	]))
        .pipe(gulp.dest('dist/images'))
);
