/** ../tanatloc-ssr/srcmodule Server */

import createError from 'http-errors'
import express, { json, urlencoded } from 'express'
import cors from 'cors'

import avatar from '../tanatloc-ssr/src/route/avatar'
import email from '../tanatloc-ssr/src/route/email'
import geometries from '../tanatloc-ssr/src/route/geometries'
import geometry from '../tanatloc-ssr/src/route/geometry'
import geometryId from '../tanatloc-ssr/src/route/geometry/[id]'
import geometryDownload from '../tanatloc-ssr/src/route/geometry/[id]/download'
import geometryPart from '../tanatloc-ssr/src/route/geometry/[id]/part'
import group from '../tanatloc-ssr/src/route/group'
import groups from '../tanatloc-ssr/src/route/groups'
import groupsId from '../tanatloc-ssr/src/route/groups/[id]'
import link from '../tanatloc-ssr/src/route/link'
import organization from '../tanatloc-ssr/src/route/organization'
import organizations from '../tanatloc-ssr/src/route/organizations'
import plugin from '../tanatloc-ssr/src/route/plugin'
import plugins from '../tanatloc-ssr/src/route/plugins'
import project from '../tanatloc-ssr/src/route/project'
import projectId from '../tanatloc-ssr/src/route/project/[id]'
import projectArchive from '../tanatloc-ssr/src/route/project/[id]/archive'
import projects from '../tanatloc-ssr/src/route/projects'
import result from '../tanatloc-ssr/src/route/result'
import resultDownload from '../tanatloc-ssr/src/route/result/download'
import resultArchive from '../tanatloc-ssr/src/route/result/archive'
import simulation from '../tanatloc-ssr/src/route/simulation'
import simulationId from '../tanatloc-ssr/src/route/simulation/[id]'
import simulationIdRun from '../tanatloc-ssr/src/route/simulation/[id]/run'
import simulationIdStop from '../tanatloc-ssr/src/route/simulation/[id]/stop'
import simulationIdLog from '../tanatloc-ssr/src/route/simulation/[id]/log'
import simulationIdTasks from '../tanatloc-ssr/src/route/simulation/[id]/tasks'
import simulations from '../tanatloc-ssr/src/route/simulations'
import system from '../tanatloc-ssr/src/route/system'
import user from '../tanatloc-ssr/src/route/user'
import userId from '../tanatloc-ssr/src/route/user/[id]'
import userCheck from '../tanatloc-ssr/src/route/user/check'
import users from '../tanatloc-ssr/src/route/users'
import workspace from '../tanatloc-ssr/src/route/workspace'
import { loginRoute } from '../tanatloc-ssr/src/route/login'
import { logout } from '../tanatloc-ssr/src/route/logout'

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
 * ../tanatloc-ssr/srcmemberof Server
 * ../tanatloc-ssr/srcparam req
 * ../tanatloc-ssr/srcparam res
 * ../tanatloc-ssr/srcparam next
 */
app.use((req, res, next) => {
  next(createError(404))
})

/**
 * Error handler
 * ../tanatloc-ssr/srcmemberof Server
 * ../tanatloc-ssr/srcparam req
 * ../tanatloc-ssr/srcparam res
 * ../tanatloc-ssr/srcparam next
 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send({ status: 'error', err: err })
})

export default app
