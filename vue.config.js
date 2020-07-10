module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/styles/_variables"; @import "@/styles/bulma/_variables";'
      }
    },
    sourceMap: true
  },
  productionSourceMap: false
};
