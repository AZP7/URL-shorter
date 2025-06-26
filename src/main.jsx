// Import React and ReactDOM for rendering
import React from 'react'
import ReactDOM from 'react-dom/client'
// Import main App component and global styles
import App from './App.jsx'
import './index.css'

// Create root element and render the React application
// This is the entry point of the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
