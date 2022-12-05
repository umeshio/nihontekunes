module.exports = {
  "root": true,
  "env": {
    // "es6": true,
    // "es2017": true,
    "es2020": true,
    // "es2021": true,
    "node": true,
    "browser": true,
    "jquery": true,
  },
  "extends": [
    "eslint:recommended",
    "prettier"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2020,
  },
  "plugins": [
    "eslint-comments",
  ],
  "rules": {
    "eslint-comments/disable-enable-pair": "error",
    "eslint-comments/no-duplicate-disable": "error",
    "eslint-comments/no-unlimited-disable": "error",
    "eslint-comments/no-unused-disable": "error",
    "eslint-comments/no-unused-enable": "error",
    "eslint-comments/no-use": "off"
  },

  // ### ▼TypeScript用
  // ----------------------------------------------------------------------
  overrides: [
    {
      "files": [
        "./src/assets/js/**/*.ts"
      ],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier"
      ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2020,
        "tsconfigRootDir": __dirname,
        "project": [
          "./tsconfig.eslint.json"
        ]
      },
      "plugins": [
        "@typescript-eslint",
        "eslint-comments",
      ],
    }
  ]
};
