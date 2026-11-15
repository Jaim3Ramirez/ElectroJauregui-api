import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../estilos/navbar.css'

const enlaces = [
  { to: '/', texto: 'Inicio' },
  { to: '/catalogo', texto: 'Catálogo' },
  { to: '/acerca-de', texto: 'Nosotros' },
  { to: '/contacto', texto: 'Contacto' },
]

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate()

  function buscarProductos(event) {
    event.preventDefault()
    const termino = busqueda.trim()
    navigate(termino ? `/catalogo?q=${encodeURIComponent(termino)}` : '/catalogo')
    setBusqueda('')
    setMenuAbierto(false)
  }

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Navegación principal">
        <Link className="brand" to="/" aria-label="ElectroJauregui, inicio">
          <span className="brand-mark" aria-hidden="true">EJ</span>
          <span>Electro<span className="brand-highlight">Jauregui</span></span>
        </Link>
        <form className="nav-search" role="search" onSubmit={buscarProductos}>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar productos"
            aria-label="Buscar productos en el catálogo"
          />
          <button type="submit" aria-label="Buscar">↵</button>
        </form>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
          aria-controls="primary-navigation"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`nav-links${menuAbierto ? ' menu-open' : ''}`} id="primary-navigation">
          {enlaces.map(({ to, texto }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setMenuAbierto(false)}
            >
              {texto}
            </NavLink>
          ))}
        </div>
        <Link className="nav-cta" to="/catalogo" onClick={() => setMenuAbierto(false)}>
          Catálogo <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
