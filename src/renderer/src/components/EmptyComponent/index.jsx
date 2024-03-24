import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'

const Empty = (props) => {
  const titles = props.titles
  if (titles.find((t) => t.active === true).name === '文件') {
    const openFolder = () => {
      window.ipc.ipcOpenFolder()
    }
    return (
      <>
        {titles[0].empty ? (
          <React.Fragment>
            <div className={styles['file-list-look']}>
              <span>没有打开的文件夹</span>
            </div>
            <div className={styles['open-folder']} onClick={openFolder}>
              打开文件夹...
            </div>
          </React.Fragment>
        ) : null}
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
Empty.propTypes = {
  titles: PropTypes.arrayOf(
    PropTypes.shape({
      empty: PropTypes.bool.isRequired
    })
  ).isRequired
}
export default Empty
