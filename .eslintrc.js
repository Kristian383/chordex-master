module.exports = {
	extends: [
		'plugin:vue/vue3-recommended',
	],
	rules: {
		'vue/singleline-html-element-content-newline': 'off',
		"vue/max-attributes-per-line": ["error", {
			"singleline": {
				"max": 3
			},
			"multiline": {
				"max": 3
			}
		}],
		"vue/html-self-closing": ["error", {
			"html": {
				"void": "always",
				"normal": "any",
				"component": "any"
			},
			"svg": "any",
			"math": "any"
		}]
	}
}