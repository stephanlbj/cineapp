module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier'],
  plugins: ['stylelint-order'],
  rules: {
    indentation: 2,
    'string-quotes': 'single',
    'color-hex-length': 'short',
    'order/properties-alphabetical-order': true,
    'no-empty-source': null,
    'scss/dollar-variable-pattern': '^foo',
  },
}
