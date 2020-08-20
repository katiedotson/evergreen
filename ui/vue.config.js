module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/styles/_variables.scss"; @import "@/styles/_global.scss";'
      }
    }
  }
};
