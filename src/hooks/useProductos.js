import { useEffect, useState } from 'react'

const URL_PRODUCTOS =
  'https://raw.githubusercontent.com/Jaim3Ramirez/ElectroJauregui-api/refs/heads/main/api/productos.json'

function esProductoValido(producto) {
  return (
    producto !== null &&
    typeof producto === 'object' &&
    (typeof producto.id === 'number' || typeof producto.id === 'string') &&
    String(producto.id).length > 0 &&
    ['nombre', 'descripcion', 'imagen', 'marca', 'categoria', 'capacidad', 'eficiencia']
      .every((campo) => typeof producto[campo] === 'string' && producto[campo].trim().length > 0) &&
    producto.nombre.trim().length > 0 &&
    producto.marca.trim().length > 0 &&
    producto.categoria.trim().length > 0 &&
    /^https?:\/\//i.test(producto.imagen) &&
    typeof producto.precio === 'number' &&
    Number.isFinite(producto.precio) &&
    producto.precio >= 0 &&
    typeof producto.disponibilidad === 'boolean'
  )
}

function validarProductos(data) {
  if (!data || !Array.isArray(data.productos)) {
    throw new Error('La respuesta de la API no contiene una lista de productos válida.')
  }

  const identificadores = new Set(data.productos.map((producto) => String(producto?.id)))
  if (!data.productos.every(esProductoValido) || identificadores.size !== data.productos.length) {
    throw new Error('Algunos productos recibidos tienen datos incompletos o inválidos.')
  }

  return data.productos
}

export default function useProductos() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function cargarProductos() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(URL_PRODUCTOS, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`No se pudo consultar el catálogo (HTTP ${response.status}).`)
        }

        let data
        try {
          data = await response.json()
        } catch {
          throw new Error('La API respondió, pero su archivo JSON está incompleto o mal formado.')
        }
        setProductos(validarProductos(data))
      } catch (errorDeCarga) {
        if (!controller.signal.aborted) {
          setError(
            errorDeCarga instanceof Error
              ? errorDeCarga.message
              : 'Ocurrió un error inesperado al cargar el catálogo.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    cargarProductos()
    return () => controller.abort()
  }, [intento])

  function reintentar() {
    setIntento((actual) => actual + 1)
  }

  return { productos, loading, error, reintentar }
}
