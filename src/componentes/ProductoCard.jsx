import { Link } from 'react-router-dom'
import '../estilos/productos.css'

const formatoPrecio = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
})

function ProductoCard({ producto }) {
  return (
    <article className="product-card">
      <Link className="product-visual" to={`/producto/${producto.id}`} aria-label={`Ver ${producto.nombre}`}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = '/producto-placeholder.svg'
          }}
        />
        <span className={producto.disponibilidad ? 'product-stock-tag in-stock' : 'product-stock-tag out-of-stock'}>
          {producto.disponibilidad ? 'Disponible' : 'Agotado'}
        </span>
      </Link>
      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">{producto.categoria}</span>
          <span className="product-brand">{producto.marca}</span>
        </div>
        <h3><Link to={`/producto/${producto.id}`}>{producto.nombre}</Link></h3>
        <p className="product-price">{formatoPrecio.format(producto.precio)}</p>
        <dl className="product-card-specs">
          {producto.capacidad && <div><dt>Capacidad</dt><dd>{producto.capacidad}</dd></div>}
          {producto.eficiencia && <div><dt>Eficiencia</dt><dd>{producto.eficiencia}</dd></div>}
        </dl>
        <Link className="product-card-button" to={`/producto/${producto.id}`}>
          Ver detalles <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

export default ProductoCard
