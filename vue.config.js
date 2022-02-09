module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8888/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        data: `
          @import "./src/assets/scss/common.scss";
          @import "./src/assets/scss/adaptation.scss";
        `
      }
    }
  },
  publicPath: './',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false
};