function MensajeError({ mensaje, onReintentar }) {
  return (
    <div className="error-state" role="alert">
      <span className="error-state-icon" aria-hidden="true">!</span>
      <div>
        <h2>No pudimos cargar el catálogo</h2>
        <p>{mensaje}</p>
        <button className="button button-dark" type="button" onClick={onReintentar}>
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}

export default MensajeError
