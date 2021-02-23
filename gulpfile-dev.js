// 加载gulp，并结构需要的方法
let {
  task,
  src,
  dest,
  watch,
  series,
  parallel
} = require('gulp')
let load = require('gulp-load-plugins')()
let del = require('del') //删除文件

// 删除dist目录
task('delDist', async () => {
  await del('./dist')
})

// 处理html
task('html', async () => {
  src('./views/*.html')
    .pipe(dest('./dist'))
    .pipe(load.connect.reload())
})

// 处理css
task('style', async () => {
  src('./style/*.css')
    .pipe(dest('./dist/style'))
    .pipe(load.connect.reload())
})

// 编译sass
task('sass', async () => {
  src('./sass/*.scss')
    .pipe(load.sassChina().on('error', load.sassChina.logError)) //编译sass
    .pipe(dest('./dist/css'))
    .pipe(load.connect.reload())
})

// 处理js
task('script', async () => {
  src('./js/*.js')
    .pipe(dest('./dist/js'))
    .pipe(load.connect.reload())
})
// 处理json
task('json', async ()=>{
  src('./json/*.json')
  .pipe(dest('./dist/json'))
  .pipe(load.connect.reload())  //执行刷新
})
// 处理img
task('image', async () => {
  src('./img/*.*')
    .pipe(dest('./dist/img'))
    .pipe(load.connect.reload())
})

//inconfont
task('iconfont', async () => {
  src('./iconfont_fila/*.*')
    .pipe(dest('./dist/iconfont'))
    .pipe(load.connect.reload())
})

// 启动一个服务，实现自动刷新
task('reload', async () => {
  load.connect.server({
    root: './dist', //设置根目录
    livereload: true //开启自动刷新
  })
})

// 监听文件变化
task('watch', async () => {
  watch('./views/*.html', series('html'))
  watch('./sass/*.scss', series('sass'))
  watch('./js/*.js', series('script'))
  watch('./img/*.*', series('image'))
  watch('./json/*.*', series('json'))
})

// 打包（开发环境）
task('dev', series('delDist', 'html', 'sass', 'script', 'image', 'iconfont','json'))

// 启动项目
task('start', series('dev', 'reload', 'watch'))