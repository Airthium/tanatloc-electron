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

jest.mock('../../dist-install/install', () => {
  throw new Error('install error')
})

jest.mock('../../dist-server/server/bin/www', () => {
  throw new Error('server error')
})

describe('main/background', () => {
  test('import', async () => {
    await import('../background')
  })
})

export {}
