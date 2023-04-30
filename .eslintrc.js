module.exports = {
    root: true,
    parserOptions: {
        sourceType: "module",
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
    ],
    plugins: ["prettier", "react"],
    settings: {
        react: {
            version: "detect",
        },
    },
    env: {
        node: true,
        es6: true,
    },
    rules: {
        "react/prop-types": "off",
        "prettier/prettier": ["error"],
    },
};
