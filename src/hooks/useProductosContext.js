import { useContext } from 'react'
import ProductosContext from '../context/ProductosContext.js'

export default function useProductosContext() {
  const context = useContext(ProductosContext)

  if (context === null) {
    throw new Error('useProductosContext debe usarse dentro de ProductosProvider.')
  }

  return context
}
