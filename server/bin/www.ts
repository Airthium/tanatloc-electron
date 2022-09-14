/** @module Server.Bin */

import app from '../app'
import { createServer } from 'http'
import { AddressInfo } from 'net'

import init from '../../tanatloc/src/server/init'
import clean from '../../tanatloc/src/server/clean'

const www = async () => {
  // Initialize
  Object.defineProperty(global, 'tanatloc', { value: {}, configurable: true })
  try {
    await init()
  } catch (err: any) {
    console.error('Initialization failed!')
    console.error(err)
    throw err
  }

  // Clean
  const handleExit = async (code: number): Promise<void> => {
    console.info('> Server stopped')
    try {
      await clean()
      process.exit(code)
    } catch (err) {
      console.error('Clean failed!')
      console.error(err)

      throw err
    }
  }

  process.on('exit', (code) => handleExit(code))

  /**
   * Normalize a port into a number, string, or false.
   */
  const normalizePort = (val: string) => {
    const p = parseInt(val, 10)

    if (isNaN(p)) {
      // named pipe
      return val
    }

    if (p >= 0) {
      // port number
      return p
    }

    return false
  }

  /**
   * Get port from environment and store in Express.
   */
  const port = normalizePort(process.env.PORT || '3000')
  app.set('port', port)

  /**
   * Create HTTP server.
   */
  const server = createServer(app)

  /**
   * Event listener for HTTP server "error" event.
   */
  const onError = (error: Error & { code: string; syscall: string }) => {
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  const onListening = () => {
    const addr = server.address() as string | AddressInfo
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    console.debug('Listening on ' + bind)
  }

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)

  server.on('error', (e: any) => {
    if (e.code === 'EADDRINUSE') {
      console.warn('Address in use, retrying...')
      setTimeout(() => {
        server.close()
        server.listen(+port + 1)
      }, 1000)
    }
  })
}

export default www
