import App from '@renderer/App'
import { createHashRouter } from 'react-router-dom'

export default createHashRouter([{ path: '/', element: <App /> }])
