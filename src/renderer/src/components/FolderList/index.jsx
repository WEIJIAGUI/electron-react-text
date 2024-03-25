import { FolderFilled, FileOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import CaretFilled from '../CaretFilled'
import { useContext } from 'react'
import { FolderData } from '@renderer/App'

const FolderList = (props) => {
  const { fdataChange: folderData, setFolderlist } = useContext(FolderData)
  const { folderlist } = props
  const clickTree = (folder) => {
    setFolderlist(
      folderData.map((f) => {
        if (folder.id === f.id) {
          f.icon = f.icon === 'right' ? 'down' : 'right'
        }
        return f
      })
    )
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
          <FolderList key={i} folderlist={folder.children} />
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
