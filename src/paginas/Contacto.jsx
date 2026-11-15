import { useState } from 'react'
import '../estilos/institucional.css'

function Contacto() {
  const [mostrarAviso, setMostrarAviso] = useState(false)

  function manejarEnvio(event) {
    event.preventDefault()
    setMostrarAviso(true)
  }

  return (
    <section className="section container contact-section">
      <div className="page-intro">
        <span className="eyebrow">CONTACTO</span>
        <h1>¿Tienes una <span>consulta?</span></h1>
        <p>Completa el formulario de demostración.</p>
      </div>
      <div className="contact-layout">
        <div className="contact-aside">
          <span className="contact-aside-icon" aria-hidden="true">i</span>
          <h2>Formulario académico</h2>
          <p>Este sitio no tiene un servicio de envío conectado. Al enviar, tus datos no se transmiten ni se almacenan.</p>
        </div>
        <form className="contact-form" onSubmit={manejarEnvio}>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" type="text" autoComplete="name" placeholder="Tu nombre" required />
          <label htmlFor="email">Correo electrónico</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="nombre@correo.com" required />
          <label htmlFor="asunto">Asunto</label>
          <input id="asunto" name="asunto" type="text" placeholder="Motivo de tu consulta" required />
          <label htmlFor="mensaje">Mensaje</label>
          <textarea id="mensaje" name="mensaje" rows="4" placeholder="Escribí tu mensaje..." required />
          <button className="button button-dark" type="submit">Ver confirmación <span aria-hidden="true">→</span></button>
          {mostrarAviso && (
            <p className="form-feedback" role="status">
              Demostración: el formulario no envió tus datos porque no hay un servicio conectado.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contacto
