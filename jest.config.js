module.exports = {
  rootDir: '.',
  testPathIgnorePatterns: [
    '<rootDir>/tanatloc-ssr',
    '<rootDir>/app',
    '<rootDir>/coverage',
    '<rootDir>/dist',
    '<rootDir>/dist-install',
    '<rootDir>/dist-server'
  ],
  testMatch: ['<rootDir>/**/*.test.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  }
}
