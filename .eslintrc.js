module.exports = {
    env: {
        node: true,
        es2022: true,
        jest: true,
    },

    parser: "@typescript-eslint/parser",

    parserOptions: {
        ecmaFeatures: {
            impliedStrict: true,
            jsx: true,
        },
        sourceType: "module",
    },

    plugins: ["react", "@typescript-eslint", "react-hooks"],

    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],

    settings: {
        react: {
            createClass: "createReactClass",
            pragma: "React",
            fragment: "Fragment",
            version: "detect",
        },
    },

    rules: {
        "react/display-name": "off",
        "react/prop-types": "error",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": [
            "warn",
            {
                additionalHooks: "useDelayedEffect",
            },
        ],

        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/explicit-member-accessibility": [
            "warn",
            { accessibility: "no-public" },
        ],
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/prefer-interface": "off",
        "@typescript-eslint/type-annotation-spacing": "off",

        eqeqeq: ["error", "always"],
    },
}
