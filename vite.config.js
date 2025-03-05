import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      // 配置是否启用Mock服务
      enable: true,
      // 配置Mock文件的目录
      mockPath: 'mock',
      // 配置是否在开发环境启动时自动注入Mock服务
      injectCode: `
        import { setupProdMockServer } from '../mock/_createProdMockServer';
        setupProdMockServer();
      `,
    }),
  ],
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
