import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ChatContextProvider } from './context/ChatContext.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <AuthContextProvider>
          <ChatContextProvider>
              <React.StrictMode>
                  <BrowserRouter>
                      <App />
                  </BrowserRouter>
              </React.StrictMode>
          </ChatContextProvider>
      </AuthContextProvider>
  </Provider>
);