import 'reset-css'
import '../index.css'

import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from '@renderer/router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
)
