import { FolderFilled, FileOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import CaretFilled from '../CaretFilled'
import { useContext } from 'react'
import { FolderData } from '@renderer/App'
import _ from 'lodash'
import { findDifferentChars } from '../../../../utils/util'

const FolderList = (props) => {
  const { folderlist: folderData, setFolderlist } = useContext(FolderData)
  console.log(folderData)
  const { folderlist } = props
  const clickTree = (folder) => {
    if (!folder.isDirectory) return
    const parent = folderData.map((f, i) => [i, f]).find((f) => folder.path.includes(f[1].path))
    const target = findDifferentChars(folder.path, parent[1].path)
    let changeTarget = null
    if (!target[0]) {
      changeTarget = folderData[parent[0]]
    } else {
      changeTarget = target.reduce((pre, cur) => {
        return pre.children.find((child) => child.path === pre.path + window.constant.sep + cur)
      }, parent[1])
    }

    if (changeTarget.icon === 'down') {
      changeTarget.icon = 'right'
    } else if (changeTarget.icon === 'right') {
      changeTarget.icon = 'down'
    }
    setFolderlist(_.cloneDeep(folderData))
  }
  return (
    <ul className="char-color">
      {folderlist?.map((folder, i) => (
        <li key={i}>
          <span className="pointer" onClick={() => clickTree(folder)}>
            <CaretFilled icon={folder.icon} />
            {folder.isDirectory ? <FolderFilled /> : <FileOutlined />}
            {folder.name}
          </span>
          {folder.icon === 'down' ? <FolderList key={i} folderlist={folder.children} /> : null}
        </li>
      ))}
    </ul>
  )
}
FolderList.propTypes = {
  folderlist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
}
export default FolderList
