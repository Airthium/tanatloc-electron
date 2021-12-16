module.exports = {
  rootDir: '.',
  testPathIgnorePatterns: [
    '<rootDir>/tanatloc',
    '<rootDir>/app',
    '<rootDir>/coverage',
    '<rootDir>/dist',
    '<rootDir>/dist-install',
    '<rootDir>/dist-server',
    '<rootDir>/plugins'
  ],
  testMatch: ['<rootDir>/**/*.test.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/tanatloc',
    '<rootDir>/app',
    '<rootDir>/coverage',
    '<rootDir>/dist',
    '<rootDir>/dist-install',
    '<rootDir>/dist-server',
    '<rootDir>/plugins'
  ]
}