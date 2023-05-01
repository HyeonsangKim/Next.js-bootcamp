module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  overrides: [
  ],
  parserOptions: {
    project: "./class/tsconfig.json",
    ecmaVersion: 'latest',
    sourceType: 'module',
    createDefaultProgram: true,
  },
  plugins: ["react","jest/globals"],
  rules: {
		'react/prop-types': 'off',
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "react/display-name": "off",
  }
}
