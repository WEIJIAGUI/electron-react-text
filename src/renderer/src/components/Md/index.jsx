import { useContext, useEffect } from 'react'
import { marked } from 'marked'
import { FolderData } from '@renderer/App'
import styles from './index.module.css'

const MD = () => {
  const { text } = useContext(FolderData)
  console.log('text', text)
  useEffect(() => {
    // 配置marked
    marked.use({
      pedantic: false,
      breaks: false,
      gfm: true, //默认为true。 允许 Git Hub标准的markdown.
      tables: true, //默认为true。 允许支持表格语法。该选项要求 gfm 为true。
      sanitize: false
    })
  }, [])

  return (
    <>
      <div
        className={styles['markdown-body']}
        spellCheck={false}
        contentEditable="plaintext-only"
        dangerouslySetInnerHTML={{
          __html: marked.parse(text)
        }}
      ></div>
    </>
  )
}

export default MD
