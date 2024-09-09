module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/**/*.test.*'],
  testPathIgnorePatterns: [
    '<rootDir>/dist',
    '<rootDir>/dist-install',
    '<rootDir>/dist-server',
    '<rootDir>/main',
    '<rootDir>/tanatloc'
  ],
  transform: {
    '^.+\\.ts?$': [
      'babel-jest',
      {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript'
        ]
      }
    ]
  }
}
