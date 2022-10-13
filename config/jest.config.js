module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/**/*.test.*'],
  testPathIgnorePatterns: ['<rootDir>/tanatloc'],
  transform: {
    '^.+\\.ts?$': ['babel-jest', { presets: ['next/babel'] }]
  }
}
