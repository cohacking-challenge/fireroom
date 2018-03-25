module.exports = {
  root: true,
  extends: ['eslint:recommended', 'react-app', 'prettier'],
  plugins: ['prettier'],
  rules: {
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "trailingComma": "all",
      "bracketSpacing": true,
      "jsxBracketSameLine": false,
    }],
  },
};