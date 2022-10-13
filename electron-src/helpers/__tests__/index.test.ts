import { createWindow } from '..'

jest.mock('../create-window', () => () => ({}))

describe('main/helpers', () => {
  test('import', () => {
    expect(createWindow).toBeDefined()
  })
})
