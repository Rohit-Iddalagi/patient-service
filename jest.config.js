module.exports = {
  testEnvironment: 'node',
  coverage: {
    provider: 'v8',
    directory: 'coverage',
    reporters: ['text', 'lcov', 'html'],
    exclude: ['node_modules', 'tests']
  },
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!src/config/**'
  ]
};
