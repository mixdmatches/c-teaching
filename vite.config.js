import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: './src/mock', // mock 文件存放目录
      localEnabled: process.env.NODE_ENV === 'development', // 开发环境启用
      prodEnabled: false, // 生产环境永远禁用
      injectCode: `
          import { setupProdMockServer } from './mockProd';
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
          @use "@/assets/scss/variables.scss" as *;
        `,
      },
    },
  },
})
