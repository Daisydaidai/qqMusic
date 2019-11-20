var gulp = require("gulp");

//压缩html
//gulp中插件的应用  下载插件-->获取插件-->应用插件
var htmlClean = require("gulp-htmlclean");

//压缩图片
var imageMin = require("gulp-imagemin");

//压缩js
var uglify = require("gulp-uglify");

//去掉js中的调试语句(debugger/console.log)
var debug = require("gulp-strip-debug");

//将less转换成css
var less = require("gulp-less");
//压缩css
var cleanCss = require("gulp-clean-css");

//自动补充css3属性的前缀，用到postcss、autoprofixer插件
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

//开启服务器
var connect = require("gulp-connect");

var folder = {
    src:"src/",
    dist:"dist/"
}

//判断当前的环境变量(开发还是生产环境)，只要生产环境下进行压缩，开发环境下不进行压缩
//$ export NODE_ENV=development  设置环境变量
var devMod = process.env.NODE_ENV == "development";
console.log(devMod);

gulp.task("html",function(){
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload());
        if(!devMod){
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task("image",function(){
    gulp.src(folder.src + "image/*")
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist+"image/"))
})

gulp.task("css",function(){
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload()) 
        .pipe(less())
        .pipe(postCss([autoprefixer()]));
        if(!devMod){
            page.pipe(cleanCss())
        }
        page.pipe(gulp.dest(folder.dist + "css/"))
})

gulp.task("js",function(){
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload());
        if(!devMod){
            page.pipe(debug())
                .pipe(uglify())
        }
        page.pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task("server",function(){
    connect.server({
        //修改服务器默认端口
        port:"8888",
        //开启自动刷新
        livereload:true
    })
})

//开启监听文件变化
gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"]);
    gulp.watch(folder.src + "css/*",["css"]);
    gulp.watch(folder.src + "js/*",["js"]);
})

gulp.task("default",["html","css","js","image","server","watch"]);


//gulp.src()
//gulp.dest()
//gulp.task()  创建任务
//gulp.watch()  开启监听