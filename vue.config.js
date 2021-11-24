const path = require('path')

module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  productionSourceMap: false,
  assetsDir: 'static',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: "http://106.14.126.114:8080",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }

}