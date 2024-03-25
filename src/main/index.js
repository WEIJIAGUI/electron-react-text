import { app, shell, BrowserWindow, ipcMain, Menu, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { getFileObj } from '../utils/util'

let mainWin = null
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    show: false,
    // autoHideMenuBar: true,
    title: 'Wypora',
    icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      devTools: true
    }
  })
  mainWin = mainWindow
  // 1.自定义菜单内容
  const menuTemp = [
    {
      label: '文件(F)',
      submenu: [
        { label: '新建', accelerator: 'CmdOrCtrl+N' },
        { label: '打开' },
        { label: '保存' },
        {
          label: '打开最近文件',
          type: 'submenu',
          submenu: [
            { label: '打开最近文件1' },
            { label: '打开最近文件2' },
            { label: '打开最近文件3' }
          ]
        },
        { label: '关闭', role: 'quit' }
      ]
    },
    {
      label: '段落(P)',
      submenu: [
        { label: '一级标题', type: 'radio' },
        { label: '二级标题', type: 'radio' },
        { label: '三级标题', type: 'radio' },
        { label: '四级标题', type: 'radio' },
        { label: '五级标题', type: 'radio' },
        { label: '列级标题', type: 'radio' }
      ]
    }
  ]
  // 2.依据上述数据创建一个menu
  const fileMenu = Menu.buildFromTemplate(menuTemp)
  // 3.把上述菜单添加到app身上
  Menu.setApplicationMenu(fileMenu)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC
  ipcMain.handle('open-folder', async () => {
    const folderPaths = await dialog.showOpenDialog({ properties: ['openDirectory'] })
    const folderPath = folderPaths.filePaths[0]
    const fileObj = await getFileObj(folderPath)
    return fileObj
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
