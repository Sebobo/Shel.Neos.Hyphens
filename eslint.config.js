const {
    defineConfig,
} = require("eslint/config");

const prettier = require("eslint-plugin-prettier");
const react = require("eslint-plugin-react");
const globals = require("globals");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        sourceType: "module",
        parserOptions: {},

        globals: {
            ...globals.node,
        },
    },

    extends: compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
    ),

    plugins: {
        prettier,
        react,
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "react/prop-types": "off",
        "prettier/prettier": ["error"],
    },
}]);
