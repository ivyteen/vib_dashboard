module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
       symlinks: false
    }
  },
  transpileDependencies: [
    '@coreui/utils'
  ],
  devServer: {
    proxy: {
      '/sensor': {
        target: 'http://localhost:3000/sensor',
        changeOrigin: true,
        pathRewrite: {
          '^/sensor': ''
        }
      }
    }
  },
  outputDir: '../backend/public'
}
