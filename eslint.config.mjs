{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    // TypeScript specific rules
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-inferrable-types": "off",
    
    // React specific rules
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react-hooks/exhaustive-deps": "warn",
    
    // General rules
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-debugger": "error",
    "no-duplicate-imports": "error",
    "no-unused-expressions": "error",
    "prefer-const": "error",
    "no-var": "error",
    
    // Style rules
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "quotes": ["error", "double", { "avoidEscape": true }],
    "semi": ["error", "always"],
    "comma-dangle": ["error", "es5"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    
    // Import rules
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "never"
      }
    ]
  },
  "env": {
    "browser": true,
    "es2020": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "ignorePatterns": [
    "node_modules/",
    ".next/",
    "out/",
    "dist/",
    "build/",
    "*.config.js"
  ]
}