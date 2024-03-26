import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron'
import path from 'path'

// Custom APIs for renderer
const api = {}

const ipc = {
  ipcOpenFolder: async () => {
    return await ipcRenderer.invoke('open-folder')
  }
}

const constant = {
  sep: path.sep
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('ipc', ipc)
    contextBridge.exposeInMainWorld('constant', constant)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
  window.ipc = ipc
  window.constant = constant
}
