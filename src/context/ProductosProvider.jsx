import ProductosContext from './ProductosContext.js'
import useProductos from '../hooks/useProductos.js'

function ProductosProvider({ children }) {
  const productosState = useProductos()

  return (
    <ProductosContext.Provider value={productosState}>
      {children}
    </ProductosContext.Provider>
  )
}

export default ProductosProvider
