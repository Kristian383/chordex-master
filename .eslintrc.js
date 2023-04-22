module.exports = {
	extends: [
		'plugin:vue/vue3-recommended',
	],
	rules: {
		'vue/singleline-html-element-content-newline': 'off',
		'vue/object-property-newline': 'off',
		"vue/multiline-ternary": "off", // TODO: only works on  > v8.6.0 vue eslint plugin version
		// 'vue/multiline-html-element-content-newline': 'off',
		// "vue/multiline-html-element-content-newline": ["error", {
		// 	"ignoreWhenEmpty": true,
		// 	"ignores": ["pre", "textarea", ...INLINE_ELEMENTS],
		// 	"allowEmptyLines": false
		// }],
		"vue/script-indent": ["error", 2, {
			"baseIndent": 0,
			"switchCase": 0,
			"ignores": []
		  }],
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
		}],
		semi: ['error', 'always']
	}
}