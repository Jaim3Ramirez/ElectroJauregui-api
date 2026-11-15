import { Link, useParams } from 'react-router-dom'
import Loader from '../componentes/Loader.jsx'
import MensajeError from '../componentes/MensajeError.jsx'
import ProductoLista from '../componentes/ProductoLista.jsx'
import useProductosContext from '../hooks/useProductosContext.js'
import '../estilos/detalle.css'

const formatoPrecio = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
})

function manejarErrorImagen(event) {
  event.currentTarget.onerror = null
  event.currentTarget.src = '/producto-placeholder.svg'
}

function DetalleProducto() {
  const { id } = useParams()
  const { productos, loading, error, reintentar } = useProductosContext()

  if (loading) {
    return <section className="section container"><Loader mensaje="Cargando producto..." /></section>
  }

  if (error) {
    return <section className="section container"><MensajeError mensaje={error} onReintentar={reintentar} /></section>
  }

  const producto = productos.find((item) => String(item.id) === id)

  if (!producto) {
    return (
      <section className="section container not-found">
        <span className="not-found-icon" aria-hidden="true">?</span>
        <h1>Producto no encontrado</h1>
        <p>El identificador no corresponde a un producto del catálogo.</p>
        <Link className="button button-dark" to="/catalogo">Volver al catálogo</Link>
      </section>
    )
  }

  const relacionados = productos
    .filter((item) => item.categoria === producto.categoria && String(item.id) !== id)
    .slice(0, 3)

  return (
    <>
      <section className="section container detail-section">
        <Link className="breadcrumb" to="/catalogo">← Volver al catálogo</Link>
        <div className="detail-layout">
          <div className="detail-visual">
            <span className={producto.disponibilidad ? 'detail-stock in-stock' : 'detail-stock out-of-stock'}>
              {producto.disponibilidad ? 'Disponible' : 'Agotado'}
            </span>
            <img src={producto.imagen} alt={producto.nombre} onError={manejarErrorImagen} />
          </div>
          <div className="detail-copy">
            <span className="eyebrow">{producto.categoria}</span>
            <h1>{producto.nombre}</h1>
            <p className="detail-brand">{producto.marca}</p>
            <p>{producto.descripcion}</p>
            <div className="detail-price">
              <strong>{formatoPrecio.format(producto.precio)}</strong>
            </div>
            <dl className="product-specs">
              <div><dt>Capacidad</dt><dd>{producto.capacidad}</dd></div>
              <div><dt>Eficiencia energética</dt><dd>{producto.eficiencia}</dd></div>
              <div>
                <dt>Disponibilidad</dt>
                <dd className={producto.disponibilidad ? 'spec-available' : 'spec-unavailable'}>
                  {producto.disponibilidad ? 'Disponible' : 'Agotado'}
                </dd>
              </div>
            </dl>
            <Link className="button button-dark" to="/catalogo">Regresar al catálogo</Link>
          </div>
        </div>
      </section>
      {relacionados.length > 0 && (
        <section className="section container related-section">
          <div className="section-heading">
            <div><span className="eyebrow">MISMA CATEGORÍA</span><h2>Productos relacionados</h2></div>
          </div>
          <ProductoLista productos={relacionados} />
        </section>
      )}
    </>
  )
}

export default DetalleProducto
