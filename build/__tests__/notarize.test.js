jest.mock('@electron/notarize', () => ({
  notarize: jest.fn()
}))

const notarizing = require('../notarize')

describe('build/notarize', () => {
  const context = {
    electronPlatformName: 'darwin',
    appOutDir: 'out',
    packager: {
      appInfo: { productFileName: 'name' }
    }
  }

  test('run', async () => {
    context.electronPlatformName = 'darwin'
    await notarizing.default(context)
  })

  test('linux', async () => {
    context.electronPlatformName = 'linux'
    await notarizing.default(context)
  })
})
