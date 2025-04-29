import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 配置打包后的资源目录
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // 配置 JS 文件输出目录
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        // 配置 CSS 文件输出目录
        assetFileNames: chunkInfo => {
          if (chunkInfo.name && chunkInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.vue', '.json', '.ts'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables.scss" as *;
        `,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    open: true,
  },
})
