import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './componentes/Footer.jsx'
import Navbar from './componentes/Navbar.jsx'
import AcercaDe from './paginas/AcercaDe.jsx'
import Catalogo from './paginas/Catalogo.jsx'
import Contacto from './paginas/Contacto.jsx'
import DetalleProducto from './paginas/DetalleProducto.jsx'
import Inicio from './paginas/Inicio.jsx'
import NoEncontrado from './paginas/NoEncontrado.jsx'
import './estilos/global.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
