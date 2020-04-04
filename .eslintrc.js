module.exports ={
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "prettier",
    "unicorn"
  ],
  "extends": [
    "airbnb",
    "prettier",
    "plugin:prettier/recommended"
  ],
  "env": {
    "node": true,
    "browser": true
  },
  "parserOptions": {
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "sort-imports": ["error", {
      "ignoreDeclarationSort": true,
      "ignoreMemberSort": false,
    }],
    "no-unused-expressions": "off",
    "react/sort-comp": "off",
    "react/jsx-one-expression-per-line": "off",
    "no-alert": 0,
    "prettier/prettier": "error",
    "default-case": 0,
    "no-shadow": 0,
    "linebreak-style": [
      "error",
      "unix"
    ],
    "eqeqeq": [
      "error",
      "smart"
    ],
    "consistent-return": 0,
    "prefer-const": "error",
    "no-dupe-keys": "error",
    "quotes": [
      "error",
      "single",
      {
        "avoidEscape": false
      }
    ],
    "jsx-quotes": [
      "error",
      "prefer-double"
    ],
    "no-restricted-globals": 0,
    "no-return-assign": [
      "error",
      "except-parens"
    ],
    "prefer-destructuring": 0,
    "no-underscore-dangle": 0,
    "unicorn/import-index": "error",
    "import/first": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "import/export": 1,
    "import/no-absolute-import": "off",
    "import/no-cycle": 2,
    "import/no-unused-modules": [
      1, {
        "unusedExports": true,
        "src": ["./src"]
      }
    ],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "sibling",
          "index"
        ]
      }
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [
          ".jsx"
        ]
      }
    ],
    "react/jsx-closing-bracket-location": "off",
    "react/no-did-update-set-state": "off",
    "react/forbid-prop-types": "off",
    // "react/prop-types": "error", // Prop-types
    "react/prop-types": "off",
    "react/require-default-props": "error",
    "react/default-props-match-prop-types": "error",
    "react/no-unused-prop-types": "error",
    "react/no-unused-state": "error",
    "react/prefer-stateless-function": "error",
    "react/destructuring-assignment": "error",
    "react/no-access-state-in-setstate": "error",
    "react/jsx-wrap-multilines": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "error",
    "react/no-did-mount-set-state": "off",
    "class-methods-use-this": "off",
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "react/no-unescaped-entities": "off",
    "react/no-array-index-key": "error",
    "react/button-has-type": "off",
    "no-param-reassign": "off",
    "no-restricted-syntax": "off",
    "camelcase": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-pascal-case": "off",
    "import/no-named-as-default": "off",
    "jsx-a11y/heading-has-content": "off",
    "global-require": "off",
    "jsx-a11y/iframe-has-title": "off",
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "no-console": "off",
    "no-plusplus": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "no-nested-ternary": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "import/no-dynamic-require": "off",
    "jsx-a11y/no-noninteractive-tabindex": "off",
    "jsx-a11y/alt-text": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/jsx-props-no-spreading": "off"
  }
};
