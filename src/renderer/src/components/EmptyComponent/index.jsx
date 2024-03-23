import React from 'react'
import PropTypes from 'prop-types'

const Empty = (props) => {
  console.log('asdas', props)
  const titles = props.titles
  if (titles.find((t) => t.active === true).name === '文件') {
    return (
      <>
        {titles[0].empty ? (
          <React.Fragment>
            <div className="file-list-look">
              <span>没有打开的文件夹</span>
            </div>
            <div className="open-folder">打开文件夹...</div>
          </React.Fragment>
        ) : null}
      </>
    )
  } else {
    return (
      <>
        {titles[0].empty ? (
          <React.Fragment>
            <div className="file-list-look">
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
