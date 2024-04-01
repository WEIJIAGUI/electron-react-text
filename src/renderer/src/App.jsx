import { createContext, useEffect, useRef, useState } from 'react'
import FileList from '@renderer/components/FileList'
import MD from '@renderer/components/Md'

const FolderData = createContext()
function App() {
  const sep = useRef(null)
  const left = useRef(null)
  const [folderlist, setFolderlist] = useState([])
  const [text, setText] = useState('')
  const fileList = useRef(null)
  const [leftManage, setLeftManage] = useState([
    {
      name: '文件',
      active: true,
      id: '001',
      empty: false
    },
    { name: '大纲', active: false, id: '002', empty: false }
  ])
  const activeTitle = (index) => {
    setLeftManage(
      leftManage.map((title, i) => {
        title.active = i === index
        return title
      })
    )
  }

  useEffect(() => {
    const enter = () => {
      const temp = leftManage.map((t) => {
        t.empty = true
        return t
      })
      setLeftManage(temp)
    }
    const leave = () => {
      const temp = leftManage.map((t) => {
        t.empty = false
        return t
      })
      setLeftManage(temp)
    }
    fileList.current.addEventListener('mouseenter', enter)
    fileList.current.addEventListener('mouseleave', leave)

    sep.current.addEventListener('mousedown', () => {
      const fun = (e) => {
        if (e.clientX <= 390) return
        sep.current.style.left = e.clientX + 'px'
        document.documentElement.style.setProperty('--left-bg-width', e.clientX + 'px')
      }
      document.addEventListener('mousemove', fun)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', fun)
      })
    })
  })
  return (
    <FolderData.Provider value={{ folderlist, setFolderlist, text, setText }}>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div ref={left} className="left-bg">
          <div className="title-area">
            {leftManage.map((title, i) => (
              <div
                key={title.id}
                className={`file-outline char-color ${title.active ? 'file-outline-active' : ''}`}
                onClick={() => activeTitle(i)}
              >
                {title.name}
              </div>
            ))}
          </div>
          <div className="file-list" ref={fileList}>
            <FileList titles={leftManage} />
          </div>
        </div>
        <div ref={sep} className="separator"></div>
        <div className="right-bg">
          <MD />
        </div>
      </div>
    </FolderData.Provider>
  )
}

export default App
export { FolderData }
