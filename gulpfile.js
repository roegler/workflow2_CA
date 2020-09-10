const { src, dest } = require('gulp');

exports.default = function() {
  return src('src/*.html')
    .pipe(dest('dist/'));
}