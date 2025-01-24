const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 3000,
  },
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
  ? '/qstrike-tech-exam/' // Replace 'your-repo-name' with your repository name
  : '/'
})
