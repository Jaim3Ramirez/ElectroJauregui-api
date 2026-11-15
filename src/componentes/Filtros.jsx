function GrupoOpciones({ titulo, opciones, seleccionadas, onToggle, nombre }) {
  return (
    <fieldset className="filter-group">
      <legend>{titulo}</legend>
      <div className="filter-options">
        {opciones.map(({ valor, etiqueta, cantidad }) => (
          <label className="filter-option" key={valor}>
            <input
              type="checkbox"
              name={nombre}
              checked={seleccionadas.includes(valor)}
              onChange={() => onToggle(valor)}
            />
            <span className="custom-checkbox" aria-hidden="true" />
            <span className="filter-option-label">{etiqueta}</span>
            <span className="filter-option-count">{cantidad}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function contarPor(productos, campo) {
  const conteos = new Map()
  productos.forEach((producto) => {
    conteos.set(producto[campo], (conteos.get(producto[campo]) || 0) + 1)
  })

  return [...conteos.entries()]
    .sort(([a], [b]) => a.localeCompare(b, 'es-MX'))
    .map(([valor, cantidad]) => ({ valor, etiqueta: valor, cantidad }))
}

function Filtros({ productos, categoria, filtros, onChange, onCategoriaChange, onLimpiar }) {
  const categorias = contarPor(productos, 'categoria')
  const marcas = contarPor(productos, 'marca')
  const opcionesDisponibilidad = [
    { valor: 'disponible', etiqueta: 'Disponible', cantidad: productos.filter((p) => p.disponibilidad).length },
    { valor: 'agotado', etiqueta: 'Agotado', cantidad: productos.filter((p) => !p.disponibilidad).length },
  ]

  function alternarOpcion(campo, valor) {
    onChange((actuales) => {
      const seleccionadas = actuales[campo]
      return {
        ...actuales,
        [campo]: seleccionadas.includes(valor)
          ? seleccionadas.filter((seleccionado) => seleccionado !== valor)
          : [...seleccionadas, valor],
      }
    })
  }

  return (
    <div className="filter-panel">
      <div className="filter-panel-heading">
        <h2>Filtrar por</h2>
        <button type="button" onClick={onLimpiar}>Limpiar</button>
      </div>
      <GrupoOpciones
        titulo="Categoría"
        nombre="categoria"
        opciones={categorias}
        seleccionadas={categoria ? [categoria] : []}
        onToggle={(valor) => onCategoriaChange(categoria === valor ? '' : valor)}
      />
      <GrupoOpciones
        titulo="Marca"
        nombre="marca"
        opciones={marcas}
        seleccionadas={filtros.marcas}
        onToggle={(valor) => alternarOpcion('marcas', valor)}
      />
      <GrupoOpciones
        titulo="Disponibilidad"
        nombre="disponibilidad"
        opciones={opcionesDisponibilidad}
        seleccionadas={filtros.disponibilidad}
        onToggle={(valor) => alternarOpcion('disponibilidad', valor)}
      />
      <fieldset className="filter-group price-filter">
        <legend>Rango de precio <span>(MXN)</span></legend>
        <div className="price-inputs">
          <label>
            <span className="visually-hidden">Precio mínimo</span>
            <span>$</span>
            <input
              type="number"
              min="0"
              value={filtros.precioMin}
              onChange={(event) => onChange((actuales) => ({ ...actuales, precioMin: event.target.value }))}
              placeholder="Mín."
            />
          </label>
          <span className="price-separator">—</span>
          <label>
            <span className="visually-hidden">Precio máximo</span>
            <span>$</span>
            <input
              type="number"
              min="0"
              value={filtros.precioMax}
              onChange={(event) => onChange((actuales) => ({ ...actuales, precioMax: event.target.value }))}
              placeholder="Máx."
            />
          </label>
        </div>
      </fieldset>
      <button className="clear-filters-mobile" type="button" onClick={onLimpiar}>Limpiar todos los filtros</button>
    </div>
  )
}

export default Filtros
