jest.mock('electron', () => ({
  app: {
    setPath: jest.fn,
    getPath: jest.fn,
    whenReady: jest.fn,
    quit: jest.fn,
    on: (_: any, callback: Function) => callback()
  },
  ipcMain: {
    on: (_: any, callback: Function) => callback({ sender: { send: jest.fn } })
  }
}))

jest.mock('electron-serve', () => () => {
  // Empty
})

jest.mock('fix-path', () => () => undefined)

jest.mock('../helpers', () => ({
  createWindow: () => ({
    maximize: jest.fn,
    loadURL: jest.fn,
    webContents: {
      openDevTools: jest.fn,
      send: jest.fn
    }
  })
}))

jest.mock(
  '../../install/install/index.js',
  () => () => {
    // Empty
  },
  { virtual: true }
)

jest.mock(
  '../../server/server/bin/www.js',
  () => () => {
    // Empty
  },
  { virtual: true }
)

describe('electron-src/background', () => {
  test('import', async () => {
    Object.defineProperty(global, 'tanatloc', { value: { complete: false } })
    await import('..')
    await new Promise((resolve) => setTimeout(resolve, 9_000))
  }, 10_000)
})

export {}
