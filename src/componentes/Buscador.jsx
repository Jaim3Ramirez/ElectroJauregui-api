function Buscador({ valor, onChange }) {
  return (
    <label className="search-field">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <span className="visually-hidden">Buscar por nombre, marca, categoría o descripción</span>
      <input
        type="search"
        value={valor}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar electrodomésticos..."
      />
      {valor && (
        <button type="button" onClick={() => onChange('')} aria-label="Borrar búsqueda">
          ×
        </button>
      )}
    </label>
  )
}

export default Buscador
