import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App.jsx'
import store from './store/store.js'
import { DoctorProvider } from './context/DoctorContext.jsx'

import './styles/global.css'

// Entry point of the Doctor portal
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <DoctorProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DoctorProvider>
    </Provider>
  </React.StrictMode>,
)