const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('vue', '@vue/runtime-dom')
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.runtime.esm-bundler.js'
      }
    }
  },
  transpileDependencies: []
}
