const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob');

var getHtmlConfig = function (name, chunks) {
    return {
        template: `./src/pages/${name}/index.html`,
        filename: `pages/${name}/index.html`,
        inject: 'body',
        chunks: chunks
    };
};

const getFiles = (src, replaceDir = '') => {
    let files = glob.sync(src);
    let map = {};

    files.forEach((file) => {
        let dirname = path.dirname(file);
        let extname = path.extname(file);
        let basename = path.basename(file, extname);
        let pathname = path.normalize(path.join(dirname, basename));
        let pathDir = path.normalize(replaceDir);

        if (pathname.startsWith(pathDir)) {
            pathname = pathname.substring(pathDir.length)
        }
        map[pathname.replace(/\\/g, '/')] = [file];
    });
    return map;
};
var entries = getFiles('./src/pages/**/*.js', 'src/pages/');
entries.vendor = ['vue'];
const config = {
    entry: entries,
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'pages/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: "/node_modules/"
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true
                }
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                    // 需要下载file-loader和url-loader
                    loader: "url-loader",
                    options: {
                        limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
                        // 图片文件输出的文件夹
                        name: 'images/[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    // test: /\.js$/,
                    test: path.resolve(__dirname, '../node_modules'),
                    chunks: "all", //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    name: "vendor", //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
const pages = getFiles('./src/pages/**/*.html', 'src/pages/');

Object.keys(pages).forEach((page) => {
    console.log(page)
    let conf = {
        filename: 'pages/' + page + '.html',
        template: './src/pages/' + page + '.html',
        inject: false,
        cache: true
    };

    if (page in config.entry) {
        conf.inject = 'body';
        conf.chunks = ['vendor', page];
        conf.hash = true;
    }
    config.plugins.push(new htmlWebpackPlugin(conf));
});

module.exports = config