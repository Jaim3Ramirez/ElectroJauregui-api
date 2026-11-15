function Loader({ mensaje = 'Cargando catálogo...' }) {
  return (
    <div className="loader-state" role="status" aria-live="polite">
      <span className="loader-spinner" aria-hidden="true" />
      <span>{mensaje}</span>
    </div>
  )
}

export default Loader
