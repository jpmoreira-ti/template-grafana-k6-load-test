import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "off",
            "no-console": "off",
            "indent": ["error", 4]
        },
        files: ["*.js"],
        ignores: ["**/*.config.js", "!**/eslint.config.js", "*.json"],
    }
];