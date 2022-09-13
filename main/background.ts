/** @module Main */

import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

/**
 * Start electron
 * @memberof Electron
 * @description Start the installation script, the server and the electron window
 */
const start = async (): Promise<void> => {
  let complete = true

  console.info('Starting Tanatloc')
  await app.whenReady()

  // Client
  console.info('Starting client')
  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600
  })
  mainWindow.maximize()
  if (isProd) {
    await mainWindow.loadURL('app://./start.html')
  }

  // Install
  try {
    console.info('Install')
    const install = await import('../dist-install/install')
    await install.default()

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
    await mainWindow.loadURL(
      'app://./error.html?electronStatusCode=100&err=' +
        encodeURIComponent(err.message)
    )
    complete = false
  }

  // Server
  try {
    console.info('Starting server')
    const server = await import('../dist-server/server/bin/www')
    await server.default()
  } catch (err: any) {
    console.error('Server error')
    await mainWindow.loadURL(
      'app://./error.html?electronStatusCode=200&err=' +
        encodeURIComponent(err.message)
    )
    complete = false
  }

  // Normal start
  if (complete) {
    if (isProd) {
      await mainWindow.loadURL('app://./index.html')
    } else {
      const port = process.argv[2]
      await mainWindow.loadURL(`http://localhost:${port}/`)
      mainWindow.webContents.openDevTools()
    }
  }
}
start()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('ping-pong', (event, arg) => {
  event.sender.send('ping-pong', `[ipcMain] "${arg}" received asynchronously.`)
})

ipcMain.on('ping-pong-sync', (event, arg) => {
  event.returnValue = `[ipcMain] "${arg}" received synchronously.`
})
