import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import SearchPage from './SearchPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchPage />
  </StrictMode>,
)
