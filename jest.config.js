module.exports = {
  rootDir: '.',
  testPathIgnorePatterns: ['<rootDir>/tanatloc-ssr'],
  testMatch: ['<rootDir>/**/*.test.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  }
}
