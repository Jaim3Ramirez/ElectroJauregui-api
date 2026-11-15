import { Link } from 'react-router-dom'
import useProductosContext from '../hooks/useProductosContext.js'
import '../estilos/institucional.css'

function manejarErrorImagen(event) {
  event.currentTarget.onerror = null
  event.currentTarget.src = '/producto-placeholder.svg'
}

function AcercaDe() {
  const { productos } = useProductosContext()
  const productoVisual = productos.find((producto) => producto.imagen)

  return (
    <section className="section container about-section">
      <div className="page-intro">
        <span className="eyebrow">ACERCA DE</span>
        <h1>ElectroJauregui: <span>un catálogo para el hogar.</span></h1>
        <p>Una plataforma para explorar electrodomésticos y consultar la información disponible de cada producto.</p>
      </div>
      <div className="about-panel">
        <div className="about-art">
          <img
            src={productoVisual?.imagen || '/producto-placeholder.svg'}
            alt={productoVisual?.nombre || 'Electrodoméstico del catálogo'}
            onError={manejarErrorImagen}
          />
          <div className="about-art-caption">
            <span>{productoVisual?.categoria || 'CATÁLOGO DIGITAL'}</span>
            <strong>{productoVisual?.nombre || 'ElectroJauregui'}</strong>
          </div>
        </div>
        <div>
          <span className="eyebrow">OBJETIVO</span>
          <h2>Información de productos, organizada en un solo lugar.</h2>
          <p>ElectroJauregui presenta un catálogo digital con datos como marca, categoría, precio, capacidad, eficiencia y disponibilidad, obtenidos desde la API pública del proyecto.</p>
          <Link className="text-link" to="/catalogo">Explorar el catálogo <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div className="about-values">
        <div><strong>01</strong><h3>Consulta clara</h3><p>Los datos del producto se muestran como aparecen en el catálogo.</p></div>
        <div><strong>02</strong><h3>Exploración sencilla</h3><p>Busca, filtra y ordena los productos disponibles.</p></div>
        <div><strong>03</strong><h3>Datos centralizados</h3><p>El catálogo se carga desde la fuente de datos del proyecto.</p></div>
      </div>
    </section>
  )
}

export default AcercaDe
