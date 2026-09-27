import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  document.body.innerHTML = '<div style="padding: 20px; font-family: sans-serif; color: red;">ERROR: Root element not found</div>'
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  } catch (error) {
    console.error('React initialization error:', error)
    document.body.innerHTML = `<div style="padding: 20px; font-family: sans-serif; color: red;">ERROR: ${error instanceof Error ? error.message : String(error)}</div>`
  }
}

// Log when app loads
console.log('TradeLink app loading...')
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
})
