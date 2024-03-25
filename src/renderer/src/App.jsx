import { createContext, useEffect, useRef, useState } from 'react'
import FileList from '@renderer/components/FileList'

const FolderData = createContext()
function App() {
  const [folderlist, setFolderlist] = useState([])
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
  })
  return (
    <FolderData.Provider value={{ folderlist, setFolderlist }}>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div className="left-bg">
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
        <div className="right-bg" contentEditable="true"></div>
      </div>
    </FolderData.Provider>
  )
}

export default App
export { FolderData }
