import { Link } from 'react-router-dom'

function NoEncontrado() {
  return (
    <section className="section container not-found">
      <span className="not-found-code">404</span>
      <h1>Esta página no está en casa.</h1>
      <p>El enlace puede estar vencido o la página ya no existe.</p>
      <Link className="button button-dark" to="/">Volver al inicio</Link>
    </section>
  )
}

export default NoEncontrado
