const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const config = require('../config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const HOST = process.env.HOST

const devWebpackConfig = {
  entry: {
    main: resolve('/src/index.js')
  }, // 已多次提及的唯一入口文件
  output: {
    path: resolve('/dist'), // 打包后的文件存放的地方
    filename: 'js/[name].js' // 打包后输出文件的文件名
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      include: ['main']
    }),
    new webpack.HotModuleReplacementPlugin() // 开启热加载
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
      '@': resolve('/src')
    }
  },
  devServer: {
    contentBase: resolve('/dist'),
    compress: true,
    port: config.dev.port,
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    quiet: true,
    host: HOST || config.dev.host
  },
  performance: {
    hints: false
  },
  devtool: '#source-map',
  mode: 'development'
}

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))
      resolve(devWebpackConfig)
    }
  })
})