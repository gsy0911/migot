module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		sourceType: 'module',
		ecmaVersion: 2020,
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.eslint.json']
	},
	plugins: [
		'@typescript-eslint',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier',
		'prettier/@typescript-eslint'
	],
	rules: {
		complexity: ['error', 10]
	},
  };
