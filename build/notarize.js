const { notarize } = require('@electron/notarize')

/**
 * Notarize
 * @param {any} context Context
 */
const notarizing = async (context) => {
  const { electronPlatformName, appOutDir } = context
  if (electronPlatformName !== 'darwin') {
    return
  }

  const appName = context.packager.appInfo.productFilename

  return notarize({
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASSWORD,
    tool: 'notarytool',
    teamId: process.env.APPLE_TEAM_ID
  })
}

exports.default = notarizing
