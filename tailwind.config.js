module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [],
  prefix: 'tw-',
  corePlugins: {
    // 全局禁用outline 好像补齐作用
    outline: false
  }
}
