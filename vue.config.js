const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    // 基本路径
    publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
    // 构建时的输出目录
    outputDir: "dist",
    // 放置静态资源的目录
    assetsDir: "static",
    // html输出的主路径
    indexPath: "index.html",
    // 文件名哈希
    filenameHashing: true,

    // 多页面配置，默认undefined
    pages: {
        index: {
            // 入口文件
            entry: "src/main.js",
            // 模板文件
            template: "public/index.html",
            // 在dist中输出文件名称
            filename: "index.html",
            // 当使用页面title时
            // template中的title标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "Index Page",
            // 在这个页面中包含的块，默认情况下会包含提取出来的通用的chunk和vender chunk
            chunk: ["chunk-vendors", "chunk-common", "index"],
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        // subpage: 'src/subpage/main.js'
    },

    // 是否在保存时使用'eslint-loader'进行检查
    // true || 'warning' 输出编译警告到命令行，不影响编译
    // 'default' 强制输出为编译错误且导致编译失败
    // 'error' 将编译警告输出为编译错误且导致编译失败
    lintOnSave: true,

    // 是否使用包含运行时编译器的vue构建版本(使用会让应用多10kb)
    runtimeCompiler: false,


})
