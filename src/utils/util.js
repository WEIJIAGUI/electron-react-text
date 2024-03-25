import fs from 'fs/promises'
import path from 'path'
const getFileObj = async (dir) => {
  const result = []
  const files = await fs.readdir(dir, 'utf-8')
  for (const handle of files) {
    const stat = await fs.stat(path.join(dir, handle))
    if (stat.isDirectory()) {
      const children = await getFileObj(path.join(dir, handle))
      const directory = {
        name: handle,
        path: path.join(dir, handle),
        isDirectory: true,
        children,
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
        icon: children?.length > 0 ? 'right' : ''
      }
      result.push(directory)
    } else {
      const file = {
        name: handle,
        path: path.join(dir, handle),
        isDirectory: false,
        children: null,
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
        icon: ''
      }
      result.push(file)
    }
  }
  return result
}

export { getFileObj }
