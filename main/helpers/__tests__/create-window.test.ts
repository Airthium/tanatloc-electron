import { createWindow } from '..'

jest.mock('electron', () => ({
  screen: {
    getPrimaryDisplay: () => ({
      bounds: {
        width: 100,
        height: 100
      }
    }),
    getAllDisplays: () => ({
      some: (callback) =>
        callback({
          bounds: {
            x: 200,
            y: 200,
            width: 200,
            height: 200
          }
        })
    })
  },
  BrowserWindow: class {
    constructor() {
      //@ts-ignore
      this.on = (_, callback) => callback()
      //@ts-ignore
      this.isMinimized = () => false
      //@ts-ignore
      this.isMaximized = () => false
      //@ts-ignore
      this.getPosition = () => []
      //@ts-ignore
      this.getSize = () => []
    }
  }
}))

jest.mock(
  'electron-store',
  () =>
    class {
      constructor() {
        //@ts-ignore
        this.set = jest.fn
        //@ts-ignore
        this.get = () => ({
          x: 300,
          y: 300,
          width: 300,
          height: 300
        })
      }
    }
)

describe('main/helpers/create-window', () => {
  test('call', () => {
    createWindow('name', { width: 1000, height: 1000 })
  })
})
