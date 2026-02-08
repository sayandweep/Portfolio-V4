import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')!
const appContainer = document.createElement('div')
rootEl.parentNode?.insertBefore(appContainer, rootEl)

createRoot(appContainer).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
