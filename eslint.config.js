// eslint.config.js
import eslint from '@eslint/js'
import globals from 'globals'
import eslintPluginVue from 'eslint-plugin-vue'
// import stylistic from '@stylistic/eslint-plugin'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    ignores: ['node_modules', 'dist', 'public'],
  },

  /** js推荐配置 */
  eslint.configs.recommended,
  /** vue推荐配置 */
  ...eslintPluginVue.configs['flat/recommended'],

  // stylistic.configs.customize({
  //   indent: 2,
  //   quotes: 'single',
  //   semi: false,
  //   jsx: true,
  //   braceStyle: '1tbs',
  //   arrowParens: 'always',
  // }),

  /**
   * javascript 规则
   */
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // 忽略以 _ 开头的参数
          varsIgnorePattern: '^_', // 忽略以 _ 开头的变量
          caughtErrorsIgnorePattern: '^_', // 忽略以 _ 开头的 catch 参数
        },
      ],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },

  /**
   * 配置全局变量
   */
  {
    languageOptions: {
      globals: {
        ...globals.browser,

        /** 追加一些其他自定义全局规则 */
        wx: true,
      },
    },
  },

  /**
   * vue 规则
   */
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        /** typescript项目需要用到这个 */
        // parser: tseslint.parser,
        ecmaVersion: 'latest',
        /** 允许在.vue 文件中使用 JSX */
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // 将 vue/no-mutating-props 的报错级别改为警告
      'vue/no-mutating-props': [
        'error', // 将 'error' 改为 'warn'
        {
          shallowOnly: true,
        },
      ],
      // 添加忽略v-html的规则
      'vue/no-v-html': 'off',
      // 允许组件名不使用多单词
      'vue/multi-word-component-names': 'off',
      // 允许props参数没有默认值
      'vue/require-default-prop': 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },

  /**
   * prettier 配置
   * 会合并根目录下的.prettier.config.js 文件
   * @see https://prettier.io/docs/en/options
   */
  eslintPluginPrettierRecommended,
]
