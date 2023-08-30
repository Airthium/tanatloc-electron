module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/**/*.test.*'],
  testPathIgnorePatterns: [
    '<rootDir>/dist',
    '<rootDir>/dist-install',
    '<rootDir>/dist-server',
    '<rootDir>/main',
    '<rootDir>/renderer',
    '<rootDir>/tanatloc'
  ],
  transform: {
    '^.+\\.ts?$': ['babel-jest', { presets: ['next/babel'] }]
  }
}
