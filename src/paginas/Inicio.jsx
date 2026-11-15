import { Link } from 'react-router-dom'
import Loader from '../componentes/Loader.jsx'
import MensajeError from '../componentes/MensajeError.jsx'
import ProductoDestacado from '../componentes/ProductoDestacado.jsx'
import useProductosContext from '../hooks/useProductosContext.js'
import '../estilos/inicio.css'

const formatoPrecio = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
})

function manejarErrorImagen(event) {
  event.currentTarget.onerror = null
  event.currentTarget.src = '/producto-placeholder.svg'
}

function Inicio() {
  const { productos, loading, error, reintentar } = useProductosContext()
  const categorias = [...new Set(productos.map((producto) => producto.categoria))]
  const destacados = categorias
    .map((categoria) => productos.find((producto) => producto.categoria === categoria && producto.disponibilidad))
    .filter(Boolean)
    .slice(0, 4)
  const productoHero = productos.find((producto) => producto.disponibilidad) || productos[0]
  const imagenHero = productoHero?.imagen

  return (
    <>
      <section className="hero-section">
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> ELECTRODOMÉSTICOS PARA TU HOGAR</span>
            <h1>Encuentra lo que tu hogar <span>necesita.</span></h1>
            <p>Explora electrodomésticos con información clara para comparar opciones y elegir con confianza.</p>
            <div className="hero-actions">
              <Link className="button button-dark" to="/catalogo">Explorar catálogo <span aria-hidden="true">↗</span></Link>
              <Link className="text-link" to="/acerca-de">Conoce ElectroJauregui <span aria-hidden="true">→</span></Link>
            </div>
            {!loading && !error && (
              <div className="hero-metrics">
                <span><strong>{productos.length}</strong> productos en catálogo</span>
                <span><strong>{categorias.length}</strong> categorías para explorar</span>
              </div>
            )}
          </div>
          <div className="hero-art">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <img
              className="hero-product-image"
              src={imagenHero || '/producto-placeholder.svg'}
              alt={productoHero?.nombre || 'Electrodoméstico del catálogo'}
              onError={manejarErrorImagen}
            />
            {productoHero && (
              <Link className="hero-feature-card" to={`/producto/${productoHero.id}`}>
                <span className={productoHero.disponibilidad ? 'hero-feature-status available' : 'hero-feature-status unavailable'}>
                  {productoHero.disponibilidad ? 'Disponible' : 'Agotado'}
                </span>
                <span className="hero-feature-name">{productoHero.nombre}</span>
                <span className="hero-feature-meta">{productoHero.marca} <strong>{formatoPrecio.format(productoHero.precio)}</strong></span>
                <span className="hero-feature-arrow" aria-hidden="true">↗</span>
              </Link>
            )}
            <span className="hero-sparkle sparkle-one" aria-hidden="true">✳</span>
            <span className="hero-sparkle sparkle-two" aria-hidden="true">✳</span>
          </div>
        </div>
      </section>

      <section className="benefit-strip">
        <div className="container benefit-items">
          <div><span className="benefit-icon" aria-hidden="true">⌕</span><span><strong>Busca y filtra</strong><small>Encuentra productos por sus datos</small></span></div>
          <div><span className="benefit-icon" aria-hidden="true">▤</span><span><strong>Información detallada</strong><small>Conoce las características disponibles</small></span></div>
          <div><span className="benefit-icon" aria-hidden="true">↗</span><span><strong>Navegación sencilla</strong><small>Explora categorías y productos</small></span></div>
        </div>
      </section>

      <section className="section container category-section">
        <div className="section-heading">
          <div><span className="eyebrow">EXPLORA POR CATEGORÍA</span><h2>Categorías del catálogo</h2></div>
          <Link className="text-link" to="/catalogo">Ver catálogo <span aria-hidden="true">→</span></Link>
        </div>
        {!loading && !error && productos.length === 0 && (
          <p className="empty-state">Todavía no hay productos publicados en el catálogo.</p>
        )}
        {!loading && !error && productos.length > 0 && (
          <div className="category-grid">
            {categorias.map((categoria) => {
              const producto = productos.find((item) => item.categoria === categoria)
              const cantidad = productos.filter((item) => item.categoria === categoria).length
              return (
                <Link
                  className="category-card"
                  key={categoria}
                  to={`/catalogo?categoria=${encodeURIComponent(categoria)}`}
                >
                  <img src={producto.imagen} alt="" loading="lazy" onError={manejarErrorImagen} />
                  <span className="category-card-copy">
                    <strong>{categoria}</strong>
                    <small>{cantidad} {cantidad === 1 ? 'producto' : 'productos'}</small>
                  </span>
                  <span className="category-arrow" aria-hidden="true">↗</span>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <section className="section featured-section">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">CATÁLOGO</span><h2>Productos disponibles</h2></div>
            <Link className="text-link" to="/catalogo">Ver todos <span aria-hidden="true">→</span></Link>
          </div>
          {loading && <Loader />}
          {error && <MensajeError mensaje={error} onReintentar={reintentar} />}
          {!loading && !error && productos.length === 0 && (
            <p className="empty-state">Todavía no hay productos publicados en el catálogo.</p>
          )}
          {!loading && !error && productos.length > 0 && destacados.length === 0 && (
            <p className="empty-state">No hay productos disponibles en este momento.</p>
          )}
          {!loading && !error && destacados.length > 0 && (
            <div className="product-grid">
              {destacados.map((producto) => (
                <ProductoDestacado key={producto.id} producto={producto} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container catalog-banner">
        <div>
          <span className="eyebrow">ELECTROJAUREGUI</span>
          <h2>Todo el catálogo, a un clic.</h2>
          <p>Busca, compara y consulta la información disponible de cada producto.</p>
        </div>
        <Link className="button button-light" to="/catalogo">Descubrir catálogo <span aria-hidden="true">↗</span></Link>
      </section>
    </>
  )
}

export default Inicio
