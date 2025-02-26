module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true, // 如果前端项目请保留
  },
  // 添加 Vue 解析器
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', // 添加 Vue 3 插件支持
    'plugin:prettier/recommended', // 必须放在最后
  ],
  rules: {
    // 自定义规则（示例）
    'no-console': 'warn',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue', '.json'],
      },
    },
  },
}
