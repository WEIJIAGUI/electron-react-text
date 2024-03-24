import fs from 'fs/promises'
import path from 'path'
const getFileObj = async (dir) => {
  const result = []
  const files = await fs.readdir(dir, 'utf-8')
  for (const handle of files) {
    const stat = await fs.stat(path.join(dir, handle))
    if (stat.isDirectory()) {
      const directory = {
        name: handle,
        path: path.join(dir, handle),
        isDirectory: true,
        children: await getFileObj(path.join(dir, handle))
      }
      result.push(directory)
    } else {
      const file = {
        name: handle,
        path: path.join(dir, handle),
        isDirectory: false,
        children: null
      }
      result.push(file)
    }
  }
  return result
}

export { getFileObj }
