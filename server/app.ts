/** @module Server */

import createError from 'http-errors'
import express, { json, Request, Response, urlencoded } from 'express'
import cors from 'cors'

import init from '../tanatloc/src/server/init'
import clean from '../tanatloc/src/server/clean'

import avatar from '../tanatloc/src/route/avatar'
import email from '../tanatloc/src/route/email'
import geometries from '../tanatloc/src/route/geometries'
import geometry from '../tanatloc/src/route/geometry'
import geometryId from '../tanatloc/src/route/geometry/[id]'
import geometryDownload from '../tanatloc/src/route/geometry/[id]/download'
import geometryPart from '../tanatloc/src/route/geometry/[id]/part'
import group from '../tanatloc/src/route/group'
import groups from '../tanatloc/src/route/groups'
import groupsId from '../tanatloc/src/route/groups/[id]'
import link from '../tanatloc/src/route/link'
import organization from '../tanatloc/src/route/organization'
import organizations from '../tanatloc/src/route/organizations'
import plugin from '../tanatloc/src/route/plugin'
import plugins from '../tanatloc/src/route/plugins'
import project from '../tanatloc/src/route/project'
import projectId from '../tanatloc/src/route/project/[id]'
import projectArchive from '../tanatloc/src/route/project/[id]/archive'
import projects from '../tanatloc/src/route/projects'
import result from '../tanatloc/src/route/result'
import resultDownload from '../tanatloc/src/route/result/download'
import resultArchive from '../tanatloc/src/route/result/archive'
import simulation from '../tanatloc/src/route/simulation'
import simulationId from '../tanatloc/src/route/simulation/[id]'
import simulationIdRun from '../tanatloc/src/route/simulation/[id]/run'
import simulationIdStop from '../tanatloc/src/route/simulation/[id]/stop'
import simulationIdLog from '../tanatloc/src/route/simulation/[id]/log'
import simulationIdTasks from '../tanatloc/src/route/simulation/[id]/tasks'
import simulations from '../tanatloc/src/route/simulations'
import system from '../tanatloc/src/route/system'
import user from '../tanatloc/src/route/user'
import userId from '../tanatloc/src/route/user/[id]'
import userCheck from '../tanatloc/src/route/user/check'
import users from '../tanatloc/src/route/users'
import workspace from '../tanatloc/src/route/workspace'
import { loginRoute } from '../tanatloc/src/route/login'
import { logout } from '../tanatloc/src/route/logout'

// Initialize
Object.defineProperty(global, 'tanatloc', { value: {}, configurable: true })
init().catch((err) => {
  console.error('Initialize failed!')
  console.error(err)

  process.exit(1)
})

// Clean
const handleExit = (code: number): void => {
  console.info('> Server stopped')
  clean()
    .then(() => {
      process.exit(code)
    })
    .catch((err) => {
      console.error('Clean failed!')
      console.error(err)

      process.exit(1)
    })
}

process.on('exit', (code) => handleExit(code))

// App
const app = express()
app.disable('x-powered-by')

app.use(
  cors({
    origin: ['http://localhost:8888', 'app://.']
  })
)
app.use(json({ limit: '150mb' }))
app.use(urlencoded({ extended: false, limit: '150mb' }))

app.all('/api/avatar', avatar)

app.all('/api/email', email)

app.all('/api/geometries', geometries)

app.all('/api/geometry', geometry)
app.all('/api/geometry/:id', geometryId)
app.all('/api/geometry/:id/download', geometryDownload)
app.all('/api/geometry/:id/part', geometryPart)

app.all('/api/group', group)

app.all('/api/groups', groups)
app.all('/api/group/:id', groupsId)

app.all('/api/link', link)

app.all('/api/organization', organization)
app.all('/api/organizations', organizations)

app.all('/api/plugin', plugin)
app.all('/api/plugins', plugins)

app.all('/api/project', project)
app.all('/api/project/:id/archive', projectArchive)
app.all('/api/project/:id', projectId)

app.all('/api/projects', projects)

app.all('/api/result', result)
app.all('/api/result/download', resultDownload)
app.all('/api/result/archive', resultArchive)

app.all('/api/simulation', simulation)
app.all('/api/simulation/:id', simulationId)
app.all('/api/simulation/:id/run', simulationIdRun)
app.all('/api/simulation/:id/stop', simulationIdStop)
app.all('/api/simulation/:id/log', simulationIdLog)
app.all('/api/simulation/:id/tasks', simulationIdTasks)

app.all('/api/simulations', simulations)

app.all('/api/system', system)

app.all('/api/user', user)
app.all('/api/user/:id', userId)
app.post('/api/user/check', userCheck)

app.all('/api/users', users)

app.all('/api/workspace', workspace)

app.post('/api/login', async (req, res) => {
  await loginRoute(req, res)
})

app.get('/api/logout', logout)

/**
 * Catch 404 and forward to error handler
 * ../tanatloc/srcmemberof Server
 * ../tanatloc/srcparam req
 * ../tanatloc/srcparam res
 * ../tanatloc/srcparam next
 */
app.use((_: any, __: any, next) => {
  next(createError(404))
})

/**
 * Error handler
 * ../tanatloc/srcmemberof Server
 * ../tanatloc/srcparam req
 * ../tanatloc/srcparam res
 * ../tanatloc/srcparam next
 */
app.use((err: any, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send({ status: 'error', err: err })
})

export default app
