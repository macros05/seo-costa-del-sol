import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import CityPage from './pages/CityPage'
import ServicePage from './pages/ServicePage'
import FAQPage from './pages/FAQPage'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/preguntas-frecuentes" element={<FAQPage />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/precios" element={<Pricing />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/servicios/:slug" element={<ServicePage />} />
        <Route path="/seo-:slug" element={<CityPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
