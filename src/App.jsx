import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Problem from './components/Problem'
import Services from './components/Services'
import Process from './components/Process'
import Sectors from './components/Sectors'
import LeadForm from './components/LeadForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Problem />
        <Services />
        <Process />
        <Sectors />
        <LeadForm />
      </main>
      <Footer />
    </>
  )
}
