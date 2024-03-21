import { useState } from 'react'
function App() {
  const [files, setFiles] = useState([])
  const activeTitle = (e) => {
    if (!e.target.classList.contains('file-outline')) {
      return
    }
    const titles = e.currentTarget.childNodes
    titles.forEach((title) => title.classList.remove('file-outline-active'))
    e.target.classList.add('file-outline-active')
  }
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="left-bg">
        <div className="title-area" onClick={activeTitle}>
          <div className="file-outline file-outline-active">文件</div>
          <div className="file-outline">大纲</div>
        </div>
        <div className="file-list">
          <span>没有打开的文件夹</span>
          <div className="open-folder">打开文件夹...</div>
        </div>
      </div>
      <div className="right-bg" contentEditable="true"></div>
    </div>
  )
}

export default App
