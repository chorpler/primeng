// module.exports = {
//     ignorePatterns: ['**/*.d.ts', '**/*.test.ts', '**/*.js'],
//     parser: '@typescript-eslint/parser',
//     extends: ['plugin:@typescript-eslint/recommended'],
//     // plugins: ['header'],
//     plugins: [],
//     parserOptions: {
//       ecmaVersion: 2017, // Allows for the parsing of modern ECMAScript features
//       sourceType: 'module', // Allows for the use of imports
//     },
//     rules: {
//       '@typescript-eslint/no-use-before-define': 'off',
//       '@typescript-eslint/explicit-function-return-type': 'off',
//       '@typescript-eslint/no-non-null-assertion': 'off',
//       '@typescript-eslint/explicit-module-boundary-types': 'off',
//       // 'header/header': [
//       //   'error',
//       //   'block',
//       //   '---------------------------------------------------------\n * Copyright (C) Microsoft Corporation. All rights reserved.\n *--------------------------------------------------------',
//       // ],
//       // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
//       // e.g. "@typescript-eslint/explicit-function-return-type": "off",
//       semi: 2,
//       'prefer-const': 1,
//       curly: 2,
//     },
//   }

module.exports = {
    "root": true,
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/naming-convention": "warn",
        "@typescript-eslint/semi": "warn",
        "@typescript-eslint/eqeqeq": "smart",
        "curly": "warn",
        "eqeqeq": "smart",
        "no-throw-literal": "warn",
        "semi": "warn"
    },
    "ignorePatterns": [
        "out",
        "dist",
        "**/*.d.ts"
    ]
};
