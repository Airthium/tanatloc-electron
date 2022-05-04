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

jest.mock('../helpers', () => ({
  createWindow: () => ({
    maximize: jest.fn,
    loadURL: jest.fn,
    webContents: {
      openDevTools: jest.fn
    }
  })
}))

jest.mock('../../dist-install/install', () => () => {
  // Empty
})

jest.mock('../../dist-server/server/bin/www', () => () => {
  // Empty
})

describe('main/background', () => {
  test('import', async () => {
    Object.defineProperty(global, 'tanatloc', { value: { complete: false } })
    await import('../background')
    await new Promise((resolve) => setTimeout(resolve, 6_000))
  }, 10_000)
})

export {}
