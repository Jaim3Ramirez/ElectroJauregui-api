import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Buscador from '../componentes/Buscador.jsx'
import Filtros from '../componentes/Filtros.jsx'
import Loader from '../componentes/Loader.jsx'
import MensajeError from '../componentes/MensajeError.jsx'
import ProductoLista from '../componentes/ProductoLista.jsx'
import useProductosContext from '../hooks/useProductosContext.js'
import '../estilos/catalogo.css'

const filtrosIniciales = {
  marcas: [],
  disponibilidad: [],
  precioMin: '',
  precioMax: '',
}

function Catalogo() {
  const { productos, loading, error, reintentar } = useProductosContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtros, setFiltros] = useState(filtrosIniciales)
  const [orden, setOrden] = useState('nombre-asc')
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)
  const categoria = searchParams.get('categoria') || ''
  const busqueda = searchParams.get('q') || ''
  const categorias = [...new Set(productos.map((producto) => producto.categoria))]

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase('es-MX')
    const minimo = filtros.precioMin === '' ? null : Number(filtros.precioMin)
    const maximo = filtros.precioMax === '' ? null : Number(filtros.precioMax)

    const resultado = productos.filter((producto) => {
      const coincideTexto = [
        producto.nombre,
        producto.marca,
        producto.categoria,
        producto.descripcion,
      ].some((campo) => campo.toLocaleLowerCase('es-MX').includes(texto))
      const coincideCategoria = !categoria || producto.categoria === categoria
      const coincideMarca = filtros.marcas.length === 0 || filtros.marcas.includes(producto.marca)
      const coincideDisponibilidad =
        filtros.disponibilidad.length === 0 ||
        (filtros.disponibilidad.includes('disponible') && producto.disponibilidad) ||
        (filtros.disponibilidad.includes('agotado') && !producto.disponibilidad)
      const coincideMinimo = minimo === null || producto.precio >= minimo
      const coincideMaximo = maximo === null || producto.precio <= maximo

      return coincideTexto && coincideCategoria && coincideMarca &&
        coincideDisponibilidad && coincideMinimo && coincideMaximo
    })

    return resultado.sort((a, b) => {
      switch (orden) {
        case 'nombre-desc':
          return b.nombre.localeCompare(a.nombre, 'es-MX')
        case 'precio-asc':
          return a.precio - b.precio
        case 'precio-desc':
          return b.precio - a.precio
        default:
          return a.nombre.localeCompare(b.nombre, 'es-MX')
      }
    })
  }, [busqueda, categoria, filtros, orden, productos])

  const filtrosActivos = [
    ...(busqueda ? [{ id: 'busqueda', texto: `Búsqueda: ${busqueda}` }] : []),
    ...(categoria ? [{ id: 'categoria', texto: categoria }] : []),
    ...filtros.marcas.map((marca) => ({ id: `marca-${marca}`, texto: marca })),
    ...filtros.disponibilidad.map((estado) => ({
      id: `disponibilidad-${estado}`,
      texto: estado === 'disponible' ? 'Disponible' : 'Agotado',
    })),
    ...(filtros.precioMin ? [{ id: 'precioMin', texto: `Desde $${filtros.precioMin}` }] : []),
    ...(filtros.precioMax ? [{ id: 'precioMax', texto: `Hasta $${filtros.precioMax}` }] : []),
  ]

  function limpiarFiltros() {
    setFiltros(filtrosIniciales)
    setSearchParams({}, { replace: true })
  }

  function cambiarBusqueda(termino) {
    const parametros = new URLSearchParams(searchParams)
    if (termino) {
      parametros.set('q', termino)
    } else {
      parametros.delete('q')
    }
    setSearchParams(parametros, { replace: true })
  }

  function cambiarCategoria(nuevaCategoria) {
    const parametros = new URLSearchParams(searchParams)
    if (nuevaCategoria) {
      parametros.set('categoria', nuevaCategoria)
    } else {
      parametros.delete('categoria')
    }
    setSearchParams(parametros, { replace: true })
  }

  function quitarFiltro(id) {
    if (id === 'busqueda') cambiarBusqueda('')
    else if (id === 'categoria') cambiarCategoria('')
    else if (id.startsWith('marca-')) {
      const marca = id.slice('marca-'.length)
      setFiltros((actuales) => ({ ...actuales, marcas: actuales.marcas.filter((item) => item !== marca) }))
    } else if (id.startsWith('disponibilidad-')) {
      const estado = id.slice('disponibilidad-'.length)
      setFiltros((actuales) => ({
        ...actuales,
        disponibilidad: actuales.disponibilidad.filter((item) => item !== estado),
      }))
    } else {
      setFiltros((actuales) => ({ ...actuales, [id]: '' }))
    }
  }

  return (
    <section className="catalog-page">
      <div className="catalog-heading-band">
        <div className="container">
          <div className="catalog-breadcrumb">
            <Link to="/">Inicio</Link><span aria-hidden="true">/</span><span>Catálogo</span>
          </div>
          <div className="catalog-title-row">
            <div>
              <span className="eyebrow">ELECTROJAUREGUI</span>
              <h1>Nuestro catálogo</h1>
              <p>Electrodomésticos y detalles para elegir con información clara.</p>
            </div>
            {!loading && !error && (
              <div className="catalog-total">
                <strong>{productos.length}</strong>
                <span>productos en catálogo</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && <div className="container"><Loader mensaje="Cargando productos desde GitHub..." /></div>}
      {error && <div className="container"><MensajeError mensaje={error} onReintentar={reintentar} /></div>}
      {!loading && !error && productos.length === 0 && (
        <div className="container"><p className="empty-state">La API no tiene productos publicados por el momento.</p></div>
      )}
      {!loading && !error && productos.length > 0 && (
        <div className="container catalog-layout">
          <button
            className="mobile-filter-toggle"
            type="button"
            aria-expanded={filtrosAbiertos}
            onClick={() => setFiltrosAbiertos((abiertos) => !abiertos)}
          >
            <span aria-hidden="true">☷</span>
            {filtrosAbiertos ? 'Ocultar filtros' : 'Filtros'}
            {filtrosActivos.length > 0 && <span className="filter-count">{filtrosActivos.length}</span>}
          </button>
          <aside className={`catalog-sidebar${filtrosAbiertos ? ' filters-open' : ''}`}>
            <Filtros
              productos={productos}
              categoria={categoria}
              filtros={filtros}
              onChange={setFiltros}
              onCategoriaChange={cambiarCategoria}
              onLimpiar={limpiarFiltros}
            />
          </aside>
          <div className="catalog-results">
            <div className="results-toolbar">
              <div>
                <h2>Electrodomésticos</h2>
                <p><strong>{productosFiltrados.length}</strong> de {productos.length} productos</p>
              </div>
              <label className="sort-control">
                <span>Ordenar:</span>
                <select value={orden} onChange={(event) => setOrden(event.target.value)}>
                  <option value="nombre-asc">Nombre: A–Z</option>
                  <option value="nombre-desc">Nombre: Z–A</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                </select>
              </label>
            </div>
            <div className="category-switcher" aria-label="Explorar categorías">
              <button
                className={!categoria ? 'category-tab selected' : 'category-tab'}
                type="button"
                aria-pressed={!categoria}
                onClick={() => cambiarCategoria('')}
              >
                Todos <span>{productos.length}</span>
              </button>
              {categorias.map((nombreCategoria) => (
                <button
                  className={categoria === nombreCategoria ? 'category-tab selected' : 'category-tab'}
                  key={nombreCategoria}
                  type="button"
                  aria-pressed={categoria === nombreCategoria}
                  onClick={() => cambiarCategoria(nombreCategoria)}
                >
                  {nombreCategoria}
                  <span>{productos.filter((producto) => producto.categoria === nombreCategoria).length}</span>
                </button>
              ))}
            </div>
            <Buscador valor={busqueda} onChange={cambiarBusqueda} />
            {filtrosActivos.length > 0 && (
              <div className="active-filters" aria-label="Filtros activos">
                {filtrosActivos.map((filtro) => (
                  <button type="button" key={filtro.id} onClick={() => quitarFiltro(filtro.id)}>
                    {filtro.texto}<span aria-hidden="true">×</span>
                  </button>
                ))}
                <button className="remove-all-filters" type="button" onClick={limpiarFiltros}>
                  Limpiar todo
                </button>
              </div>
            )}
            <ProductoLista
              productos={productosFiltrados}
              mensajeVacio="No hay productos que coincidan. Prueba cambiando la búsqueda o los filtros."
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Catalogo
