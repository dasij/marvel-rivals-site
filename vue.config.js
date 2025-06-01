const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: [],
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        },
      },
    },
  }
}
