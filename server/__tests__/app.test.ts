import app from '../app'

jest.mock('http-errors', () => jest.fn())
jest.mock('express', () => ({
  __esModule: true,
  default: () => ({
    disable: jest.fn(),
    use: jest.fn((callback) => {
      if (typeof callback === 'function') {
        if (callback.length === 3) callback({}, {}, jest.fn())
        if (callback.length === 4) {
          const err = {}
          const req = {
            app: {
              get: () => 'development'
            }
          }
          const res = {
            locals: {},
            status: jest.fn(),
            send: jest.fn()
          }
          callback(err, req, res, jest.fn())

          req.app.get = () => 'production'
          callback(err, req, res, jest.fn())
        }
      }
    }),
    get: jest.fn((param, callback) => {
      callback()
    }),
    all: jest.fn((param, callback) => {
      callback()
    }),
    post: jest.fn((param, callback) => {
      callback()
    })
  }),
  json: jest.fn(),
  urlencoded: jest.fn()
}))
jest.mock('cors', () => jest.fn())

jest.mock('../../tanatloc-ssr/src/route/login', () => ({
  loginRoute: jest.fn()
}))
jest.mock('../../tanatloc-ssr/src/route/avatar', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/email', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/geometries', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/geometry', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/geometry/[id]', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/geometry/[id]/download', () =>
  jest.fn()
)
jest.mock('../../tanatloc-ssr/src/route/geometry/[id]/part', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/group', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/groups', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/groups/[id]', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/link', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/organization', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/organizations', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/plugin', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/plugins', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/project', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/project/[id]/archive', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/project/[id]', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/projects', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/result', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/result/download', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/result/archive', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/simulation', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/simulation/[id]', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/simulation/[id]/run', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/simulation/[id]/stop', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/simulation/[id]/log', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/simulation/[id]/tasks', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/simulations', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/system', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/user', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/user/[id]', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/user/check', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/users', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/workspace', () => jest.fn())
jest.mock('../../tanatloc-ssr/src/route/logout', () => ({
  logout: jest.fn()
}))

describe('server/app', () => {
  test('app', () => {
    expect(app).toBeDefined()
  })
})
