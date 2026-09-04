import { Routes, Route, Link } from 'react-router-dom'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function Home() {
  return (
    <section id="center">
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="" />
        <img src={reactLogo} className="framework" alt="React logo" />
        <img src={viteLogo} className="vite" alt="Vite logo" />
      </div>
      <div>
        <h1>Monitor Quintillizas</h1>
        <p>Proyecto inicializado con React + Vite + React Router DOM</p>
      </div>
    </section>
  )
}

function NotFound() {
  return (
    <section id="center">
      <h1>404 - Página no encontrada</h1>
      <p>La ruta que buscas no existe.</p>
      <Link to="/" style={{ color: '#646cff', textDecoration: 'underline' }}>Volver al Inicio</Link>
    </section>
  )
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App

