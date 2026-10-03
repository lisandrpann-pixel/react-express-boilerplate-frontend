import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { store } from './store'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />

    <ToastContainer />
  </Provider>
)
