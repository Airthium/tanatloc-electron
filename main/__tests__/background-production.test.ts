Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' })

jest.mock('electron', () => ({
  app: {
    setPath: jest.fn,
    getPath: jest.fn,
    whenReady: jest.fn,
    quit: jest.fn,
    on: (_, callback) => callback()
  },
  ipcMain: {
    on: (_, callback) => callback({ sender: { send: jest.fn } })
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
    await import('../background')
  })
})

export {}
