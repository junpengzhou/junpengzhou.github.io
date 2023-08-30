let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let htmlmin = require('gulp-html-minifier-terser');
let htmlclean = require('gulp-htmlclean');
let fontmin = require('gulp-fontmin');
let terser = require('gulp-terser');
// 图片压缩
let imagemin

// 压缩js
gulp.task('minify-js', async() =>{
  gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
    .pipe(terser())
    .pipe(gulp.dest('./public'))
})

// 压缩css
gulp.task('minify-css', () => {
    return gulp.src(['./public/**/*.css'])
        .pipe(cleanCSS({
            compatibility: 'ie11'
        }))
        .pipe(gulp.dest('./public'))
})

// 压缩html
gulp.task('minify-html', () => {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            // 清除html注释
            removeComments: true, 
            // 压缩html
            collapseWhitespace: true,
            // 省略布尔属性的值，例如：<input checked="true"/> ==> <input />
            collapseBooleanAttributes: true,
            // 删除所有空格作属性值，例如：<input id="" /> ==> <input />
            removeEmptyAttributes: true,
            // 删除<script>的type="text/javascript"
            removeScriptTypeAttributes: true,
            // 删除<style>和<link>的 type="text/css"
            removeStyleLinkTypeAttributes: true,
            // 压缩页面 JS
            minifyJS: true,
            // 压缩页面 CSS
            minifyCSS: true,
            // 压缩页面URL
            minifyURLs: true
        }))
        .pipe(gulp.dest('./public'))
})

// 压缩字体方法定义
function minifyFont(text, cb) {
  gulp
    .src('./public/fonts/*.ttf') //原字体所在目录
    .pipe(fontmin({
      text: text
    }))
    .pipe(gulp.dest('./public/fontsdest/')) //压缩后的输出目录
    .on('end', cb)
}

// 压缩字体
gulp.task('mini-font', (cb) => {
  let buffers = []
  gulp
    .src(['./public/**/*.html']) //HTML文件所在目录请根据自身情况修改
    .on('data', function(file) {
      buffers.push(file.contents)
    })
    .on('end', function() {
      let text = Buffer.concat(buffers).toString('utf-8')
      minifyFont(text, cb)
    })
})

/* 
 * 压缩图片
 *
 * 错误记录：Error [ERR_REQUIRE_ESM]: require() of ES Module E:\02-Code\GITHUB-GIT\junpengzhou.github.io\node_modules\.pnpm\gulp-imagemin@8.0.0_gulp@4.0.2\node_modules\gulp-imagemin\index.js from E:\02-Code\GITHUB-GIT\junpengzhou.github.io\gulpfile.js not supported.
 * Instead change the require of index.js in E:\02-Code\GITHUB-GIT\junpengzhou.github.io\gulpfile.js to a dynamic import() which is available in all CommonJS modules. 、
 */
gulp.task('minify-images', gulp.series(
  async () => {
    imagemin = await import('gulp-imagemin');
  },
  () => gulp
    .src('./public/img/**/*')
    .pipe(
      imagemin.default(
        [
          imagemin.gifsicle({ optimizationLevel: 3 }),
          imagemin.mozjpeg({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 7 }),
          imagemin.svgo()
        ],
        { verbose: true }
      )
    )
    .pipe(gulp.dest('./public/img'))
))

gulp.task('default', gulp.series('minify-html', 'minify-css', 'minify-js', 'minify-images'))
