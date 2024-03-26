import fs from 'fs/promises'
import path from 'path'
const getFileObj = async (dir, dirLevel = 0) => {
  const result = []
  const files = await fs.readdir(dir, 'utf-8')
  for (const handle of files) {
    const stat = await fs.stat(path.join(dir, handle))
    if (stat.isDirectory()) {
      const children = await getFileObj(path.join(dir, handle), dirLevel + 1)
      const directory = {
        name: handle,
        path: path.join(dir, handle),
        isDirectory: true,
        children,
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
        icon: children?.length > 0 ? 'right' : '',
        level: dirLevel
      }
      result.push(directory)
    } else {
      const file = {
        name: handle,
        path: path.join(dir, handle),
        isDirectory: false,
        children: null,
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
        icon: '',
        level: dirLevel
      }
      result.push(file)
    }
  }
  return result
}

/** str1要传长的 */
const findDifferentChars = (str1, str2) => {
  const len = Math.min(str1.length, str2.length)
  return str1.slice(len + 1).split('\\')
}

export { getFileObj, findDifferentChars }
