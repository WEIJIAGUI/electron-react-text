import { MdEditor } from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import { useState } from 'react'

const Md = () => {
  const [text, setText] = useState('# Hello Editor')
  return <MdEditor modelValue={text} onChange={setText} />
}
export default Md
