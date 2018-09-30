var HtmlWebpackPlugin = require('html-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    main: resolve('/src/index.js')
  }, // 已多次提及的唯一入口文件
  output: {
    path: resolve('/dist'), // 打包后的文件存放的地方
    filename: 'js/[name].js' // 打包后输出文件的文件名
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env')
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      include: ['main']
    }),
    new webpack.HotModuleReplacementPlugin(), // 开启热加载
    new UglifyJSPlugin({
      parallel: 4,
      uglifyOptions: {
        output: {
          comments: false,
          beautify: false
        },
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        }
      },
      cache: true
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]', // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
      algorithm: 'gzip', // 算法
      test: new RegExp(
        '\\.(js|css)$' // 压缩 js 与 css
      ),
      threshold: 10240, // 只处理比这个值大的资源。按字节计算
      minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        use: [
          'eslint-loader'
        ]
      },
      {
        test: /\.(stylus|css)$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=2',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js' // 这个得在项目根目录创建此文件
              }
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.(png|jpeg|jpg|svg|gif)$/i,
        use: [
          'url-loader?limit=10000&name=assets/[name].[ext]',
          'image-webpack-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.scss', '.css'],
    alias: {
      '@': resolve('src')
    }
  },
  performance: {
    hints: false
  },
  devtool: '#source-map'
}
