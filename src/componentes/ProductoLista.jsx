import ProductoCard from './ProductoCard.jsx'

function ProductoLista({ productos, mensajeVacio = 'No encontramos productos con esos criterios.' }) {
  if (productos.length === 0) {
    return <p className="empty-state">{mensajeVacio}</p>
  }

  return (
    <div className="product-grid">
      {productos.map((producto) => (
        <ProductoCard key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

export default ProductoLista
