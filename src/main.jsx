import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ProductosProvider from './context/ProductosProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductosProvider>
      <App />
    </ProductosProvider>
  </StrictMode>,
)
