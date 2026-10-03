import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { store } from './store'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />

    <ToastContainer />
  </Provider>
)
