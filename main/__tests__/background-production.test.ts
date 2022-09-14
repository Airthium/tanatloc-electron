Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' })

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

const mockLoadUrl = jest.fn()
jest.mock('electron-serve', () => () => mockLoadUrl())

jest.mock('fix-path', () => () => undefined)

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
  Object.defineProperty(global, 'tanatloc', { value: { complete: true } })
  test('import', async () => {
    await import('../background')
  })
})

export {}
