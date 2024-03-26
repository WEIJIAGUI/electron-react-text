import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import FolderList from '@renderer/components/FolderList'
import { FolderData } from '@renderer/App'

const FileList = (props) => {
  const titles = props.titles
  const { folderlist, setFolderlist } = useContext(FolderData)
  if (titles.find((t) => t.active === true).name === '文件') {
    const openFolder = async () => {
      setFolderlist(await window.ipc.ipcOpenFolder())
    }
    return (
      <>
        {titles[0].empty && folderlist.length === 0 ? (
          <React.Fragment>
            <div className={styles['file-list-look']}>
              <span>没有打开的文件夹</span>
            </div>
            <div className={styles['open-folder']} onClick={openFolder}>
              打开文件夹...
            </div>
          </React.Fragment>
        ) : (
          <FolderList folderlist={folderlist} />
        )}
      </>
    )
  } else {
    return (
      <>
        {titles[0].empty ? (
          <React.Fragment>
            <div className={styles['file-list-look']}>
              <span>大纲内容为空</span>
            </div>
          </React.Fragment>
        ) : null}
      </>
    )
  }
}
FileList.propTypes = {
  titles: PropTypes.arrayOf(
    PropTypes.shape({
      empty: PropTypes.bool.isRequired
    })
  ).isRequired
}
export default FileList
