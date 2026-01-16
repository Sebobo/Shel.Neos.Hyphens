const {
    defineConfig,
} = require("eslint/config");

const prettier = require("eslint-plugin-prettier");
const react = require("eslint-plugin-react");
const globals = require("globals");
const js = require("@eslint/js");

module.exports = defineConfig([
    js.configs.recommended,
    {
        languageOptions: {
            sourceType: "module",
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                ...globals.node,
            },
        },

        plugins: {
            prettier,
            react,
        },

        settings: {
            react: {
                version: "18.0",
            },
        },

        rules: {
            ...react.configs.recommended.rules,
            ...prettier.configs.recommended.rules,
            "react/prop-types": "off",
            "prettier/prettier": ["error"],
        },
    }
]);
