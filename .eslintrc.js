module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.APP_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.APP_ENV === 'production' ? 2 : 0,
    'vue/no-v-html': 'off',
    'vue/html-indent': 'off',
    'vue/require-prop-types': 'off',
    'vue/html-self-closing': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 1,
      multiline: {
        max: 1,
        allowFirstLine: true
      }
    }]
  }
}
