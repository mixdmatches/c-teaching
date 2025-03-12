import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [
    vue(),
    // viteMockServe({
    //   // 配置是否启用Mock服务
    //   localEnable: false,
    //   // 配置是否在生产环境启用Mock服务
    //   prodEnable: false,
    //   // 配置Mock文件的目录
    //   mockPath: 'src/mock',
    //   // 配置是否在开发环境启动时自动注入Mock服务
    //   injectCode: `
    //     import { setupProdMockServer } from '../mock/_createProdMockServer';
    //     setupProdMockServer();
    //   `,
    // }),
  ],
=======
  plugins: [vue()],
>>>>>>> a4b76a2fbb0bff24a491a58d366714375955a690
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // 添加 extensions 配置
    extensions: ['.js', '.vue', '.json', '.ts'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/assets/scss/variables.scss";`,
        additionalData: `
          @use "sass:math";
          @use "@/styles/variables.scss" as *;
        `,
      },
    },
  },
})
