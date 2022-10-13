/** @module Main */

import { app } from 'electron'
import serve from 'electron-serve'
import fixPath from 'fix-path'

import { createWindow } from './helpers'

// Serve renderer
serve({ directory: 'renderer' })

/**
 * Start
 */
const start = async (): Promise<void> => {
  let complete = true

  console.info('Starting Tanatloc')
  await app.whenReady()

  // Fix path
  fixPath()

  // Status
  let status: string[] = []
  let errors: string[] = []

  // Client
  console.info('Starting client')
  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false
    }
  })
  mainWindow.maximize()

  const addStatus = async (aStatus: string): Promise<void> => {
    status.push(aStatus)
    await loadStart()
  }

  const addError = async (anError: string): Promise<void> => {
    errors.push(anError)
    await loadStart()
  }

  const loadStart = async (): Promise<void> => {
    try {
      await mainWindow.loadURL(
        'app://./start.html?status=' +
          encodeURIComponent(status.join(';')) +
          '&err=' +
          encodeURIComponent(errors.join(';'))
      )
      // BUG: must wait after loadURL
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (err) {}
  }

  await addStatus('Starting client')

  // Install
  try {
    console.info('Install')
    //@ts-ignore
    const install = await import('../install/install/index.js')
    await install.default({ addStatus, addError })

    // Wait complete
    const max = 100
    let iter = 0
    //@ts-ignore
    while (!global.tanatloc.complete && iter < max) {
      await new Promise((resolve) => setTimeout(resolve, 50))
      iter++
    }
  } catch (err: any) {
    console.error('Install error')
    await addError('Install error')
    await addError(err.message)
    complete = false
    console.log(err)
  }

  // Server
  if (complete)
    try {
      console.info('Starting server')
      //@ts-ignore
      const server = await import('../server/server/bin/www.js')
      await server.default({ addStatus })
    } catch (err: any) {
      console.error('Server error')
      await addError('Server error')
      await addError(err.message)
      complete = false
    }

  // Normal start
  if (complete) {
    await mainWindow.loadURL(`app://./index.html`)
  }
}
start()

app.on('window-all-closed', () => {
  app.quit()
})
