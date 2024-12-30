module.exports = {
    extends: [
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended'
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "varsIgnorePattern": "^_",
        "argsIgnorePattern": "^_"
      }]
    }
  };