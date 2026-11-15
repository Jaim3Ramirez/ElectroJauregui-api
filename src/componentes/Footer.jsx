import { Link } from 'react-router-dom'
import useProductosContext from '../hooks/useProductosContext.js'

function Footer() {
  const { productos } = useProductosContext()
  const categorias = [...new Set(productos.map((producto) => producto.categoria))]

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-main">
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark" aria-hidden="true">EJ</span>
            <span>Electro<span className="brand-highlight">Jauregui</span></span>
          </Link>
          <p>Catálogo digital de electrodomésticos para el hogar.</p>
        </div>
        <div className="footer-nav">
          <strong>Navegación</strong>
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/acerca-de">Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
        <div className="footer-nav">
          <strong>Categorías</strong>
          {categorias.map((categoria) => (
            <Link key={categoria} to={`/catalogo?categoria=${encodeURIComponent(categoria)}`}>{categoria}</Link>
          ))}
        </div>
        <div className="footer-bottom">
          <span>Proyecto académico; catálogo de consulta sin compra en línea.</span>
          <span>© {new Date().getFullYear()} ElectroJauregui</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
